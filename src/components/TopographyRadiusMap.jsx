import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Mountain, Compass } from 'lucide-react';

export default function TopographyRadiusMap({
  presetKey,
  geoData,
  bufferRadius,
  activeLayers,
  hoveredBlip,
  onHoverBlip,
  onCoordinatesChange,
  conflicts = [],
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const centerMarkerRef = useRef(null);
  const bufferCircleRef = useRef(null);
  const blipMarkersRef = useRef([]);
  const [mapStyle, setMapStyle] = useState('terrain'); // 'terrain' | 'satellite' | 'streets'

  const tileUrls = {
    terrain: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    streets: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [geoData.lat, geoData.lng],
        zoom: geoData.zoom || 11,
        zoomControl: false,
        attributionControl: false,
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Base tile layer
      const tileLayer = L.tileLayer(tileUrls[mapStyle], {
        maxZoom: 18,
        subdomains: mapStyle === 'terrain' ? 'abc' : 'abcd',
      }).addTo(map);
      map._currentTileLayer = tileLayer;

      // Draggable Center Pin
      const centerIcon = L.divIcon({
        className: 'custom-center-pin',
        html: `
          <div class="relative flex items-center justify-center">
            <div style="background:#284e3a; border:1.5px solid #faf9f5; border-radius:2px; width:16px; height:16px; box-shadow:0 1px 3px rgba(28,35,31,0.3); display:flex; align-items:center; justify-content:center; color:#fff; font-size:8px; font-weight:bold;">
              📍
            </div>
          </div>
        `,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      const marker = L.marker([geoData.lat, geoData.lng], {
        icon: centerIcon,
        draggable: true,
      }).addTo(map);

      // Radial Scan Buffer Circle
      const bufferCircle = L.circle([geoData.lat, geoData.lng], {
        radius: bufferRadius * 1000,
        color: '#284e3a',
        weight: 1.5,
        fillColor: '#284e3a',
        fillOpacity: 0.1,
        dashArray: '4, 6',
      }).addTo(map);

      marker.on('dragend', () => {
        const pos = marker.getLatLng();
        if (onCoordinatesChange) {
          onCoordinatesChange(Number(pos.lat.toFixed(6)), Number(pos.lng.toFixed(6)));
        }
      });

      map.on('click', (e) => {
        marker.setLatLng(e.latlng);
        bufferCircle.setLatLng(e.latlng);
        if (onCoordinatesChange) {
          onCoordinatesChange(Number(e.latlng.lat.toFixed(6)), Number(e.latlng.lng.toFixed(6)));
        }
      });

      mapInstanceRef.current = map;
      centerMarkerRef.current = marker;
      bufferCircleRef.current = bufferCircle;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map center & style when preset changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    map.flyTo([geoData.lat, geoData.lng], geoData.zoom || 11, {
      duration: 1.2,
      easeLinearity: 0.25,
    });

    if (centerMarkerRef.current) {
      centerMarkerRef.current.setLatLng([geoData.lat, geoData.lng]);
    }

    if (bufferCircleRef.current) {
      bufferCircleRef.current.setLatLng([geoData.lat, geoData.lng]);
      bufferCircleRef.current.setRadius(bufferRadius * 1000);
    }
  }, [geoData.lat, geoData.lng, geoData.zoom, bufferRadius]);

  // Update Tile Layer Style
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (map._currentTileLayer) {
      map.removeLayer(map._currentTileLayer);
    }

    const tileLayer = L.tileLayer(tileUrls[mapStyle], {
      maxZoom: 18,
      subdomains: mapStyle === 'terrain' ? 'abc' : 'abcd',
    }).addTo(map);
    map._currentTileLayer = tileLayer;
  }, [mapStyle]);

  // Render POI Blip Markers
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    blipMarkersRef.current.forEach((m) => map.removeLayer(m));
    blipMarkersRef.current = [];

    (geoData.blips || []).forEach((blip) => {
      if (!activeLayers[blip.type]) return;

      const blipColor =
        blip.severity === 'red'
          ? '#943b32'
          : blip.severity === 'amber' || blip.severity === 'orange'
          ? '#9c6519'
          : '#284e3a';

      const blipIcon = L.divIcon({
        className: 'custom-blip-pin',
        html: `
          <div style="background:${blipColor}; border:1px solid #faf9f5; border-radius:2px; width:12px; height:12px; box-shadow:0 1px 2px rgba(28,35,31,0.3); display:flex; align-items:center; justify-content:center; cursor:pointer;">
            <div style="background:#faf9f5; border-radius:1px; width:3px; height:3px;"></div>
          </div>
        `,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      });

      const marker = L.marker([blip.lat, blip.lng], { icon: blipIcon }).addTo(map);

      marker.bindTooltip(
        `
        <div style="font-family:'Plus Jakarta Sans', sans-serif; font-size:11px; padding:2px 4px; background:#faf9f5; color:#1a1d1a; border-radius:2px; border:1px solid #d5cfc2;">
          <div style="font-weight:bold; color:#1a1d1a;">${blip.name}</div>
          <div style="color:#5e625a; font-size:10px;">${blip.status}</div>
          <div style="font-size:10px; color:#284e3a; font-weight:bold; margin-top:2px;">${blip.dist} km from site</div>
        </div>
      `,
        { direction: 'top', offset: [0, -6] }
      );

      marker.on('mouseover', () => onHoverBlip && onHoverBlip(blip));
      marker.on('mouseout', () => onHoverBlip && onHoverBlip(null));

      blipMarkersRef.current.push(marker);
    });
  }, [geoData.blips, activeLayers]);

  return (
    <div
      className="relative w-full rounded overflow-hidden border"
      style={{
        borderColor: 'var(--border-subtle, #d5cfc2)',
        backgroundColor: 'var(--bg-card-subtle, #eae6dc)',
      }}
    >
      {/* Top Map Controls Overlay */}
      <div
        className="absolute top-2 left-2 z-[400] flex items-center gap-1 p-0.5 px-1 rounded border text-xs shadow-xs"
        style={{
          backgroundColor: 'var(--bg-card, #faf9f5)',
          borderColor: 'var(--border-subtle, #d5cfc2)',
        }}
      >
        <div className="flex items-center gap-1 px-1 font-medium" style={{ color: 'var(--text-main, #1a1d1a)' }}>
          <Mountain className="w-3.5 h-3.5" style={{ color: 'var(--color-primary, #284e3a)' }} />
          <span className="hidden sm:inline text-[10px] font-mono uppercase">{geoData.terrainTitle || 'GIS Scanner'}</span>
        </div>
        <div className="w-px h-3" style={{ backgroundColor: 'var(--border-subtle, #d5cfc2)' }} />
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => setMapStyle('terrain')}
            className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold transition-all cursor-pointer uppercase"
            style={{
              backgroundColor: mapStyle === 'terrain' ? 'var(--color-primary, #284e3a)' : 'transparent',
              color: mapStyle === 'terrain' ? '#FFFFFF' : 'var(--text-muted, #5e625a)',
            }}
          >
            Topo
          </button>
          <button
            onClick={() => setMapStyle('satellite')}
            className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold transition-all cursor-pointer uppercase"
            style={{
              backgroundColor: mapStyle === 'satellite' ? 'var(--color-primary, #284e3a)' : 'transparent',
              color: mapStyle === 'satellite' ? '#FFFFFF' : 'var(--text-muted, #5e625a)',
            }}
          >
            Satellite
          </button>
          <button
            onClick={() => setMapStyle('streets')}
            className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold transition-all cursor-pointer uppercase"
            style={{
              backgroundColor: mapStyle === 'streets' ? 'var(--color-primary, #284e3a)' : 'transparent',
              color: mapStyle === 'streets' ? '#FFFFFF' : 'var(--text-muted, #5e625a)',
            }}
          >
            Vector
          </button>
        </div>
      </div>

      {/* Elevation Badge Bottom Left */}
      <div
        className="absolute bottom-2 left-2 z-[400] text-white text-[10px] font-mono px-1.5 py-0.5 rounded border flex items-center gap-1 shadow-xs"
        style={{
          backgroundColor: 'var(--dark-surface, #1c231f)',
          borderColor: 'var(--border-subtle, #d5cfc2)',
        }}
      >
        <Compass className="w-3 h-3" style={{ color: 'var(--color-secondary, #9c6519)' }} />
        <span>{geoData.elevation || 'Elevation: Dynamic Topo Index'}</span>
      </div>

      {/* Map Canvas Container */}
      <div ref={mapContainerRef} className="w-full h-64 sm:h-72" />
    </div>
  );
}
