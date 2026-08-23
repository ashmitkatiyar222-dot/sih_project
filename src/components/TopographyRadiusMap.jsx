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
            <div style="background:#315c48; border:2px solid #fbfaf6; border-radius:50%; width:18px; height:18px; box-shadow:0 2px 4px rgba(32,35,31,0.3); display:flex; align-items:center; justify-content:center; color:#fff; font-size:9px; font-weight:bold;">
              📍
            </div>
          </div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      const marker = L.marker([geoData.lat, geoData.lng], {
        icon: centerIcon,
        draggable: true,
      }).addTo(map);

      // Radial Scan Buffer Circle
      const bufferCircle = L.circle([geoData.lat, geoData.lng], {
        radius: bufferRadius * 1000,
        color: '#315c48',
        weight: 1.5,
        fillColor: '#315c48',
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
          ? '#a54d42'
          : blip.severity === 'amber' || blip.severity === 'orange'
          ? '#b77927'
          : '#315c48';

      const blipIcon = L.divIcon({
        className: 'custom-blip-pin',
        html: `
          <div style="background:${blipColor}; border:1.5px solid #fbfaf6; border-radius:50%; width:14px; height:14px; box-shadow:0 1px 3px rgba(32,35,31,0.3); display:flex; align-items:center; justify-content:center; cursor:pointer;">
            <div style="background:#fbfaf6; border-radius:50%; width:4px; height:4px;"></div>
          </div>
        `,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      const marker = L.marker([blip.lat, blip.lng], { icon: blipIcon }).addTo(map);

      marker.bindTooltip(
        `
        <div style="font-family:'Plus Jakarta Sans', sans-serif; font-size:11px; padding:2px 4px; background:#fbfaf6; color:#20231f; border-radius:6px;">
          <div style="font-weight:bold; color:#20231f;">${blip.name}</div>
          <div style="color:#73766f; font-size:10px;">${blip.status}</div>
          <div style="font-size:10px; color:#315c48; font-weight:bold; margin-top:2px;">${blip.dist} km from site</div>
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
      className="relative w-full rounded-xl overflow-hidden border"
      style={{
        borderColor: 'var(--border-subtle, #d8d4ca)',
        backgroundColor: 'var(--bg-card-subtle, #edeae1)',
      }}
    >
      {/* Top Map Controls Overlay */}
      <div
        className="absolute top-2.5 left-2.5 z-[400] flex items-center gap-1.5 p-1 rounded-lg border text-xs shadow-xs"
        style={{
          backgroundColor: 'var(--bg-card, #fbfaf6)',
          borderColor: 'var(--border-subtle, #d8d4ca)',
        }}
      >
        <div className="flex items-center gap-1 px-1.5 font-medium" style={{ color: 'var(--text-main, #20231f)' }}>
          <Mountain className="w-3.5 h-3.5" style={{ color: 'var(--color-primary, #315c48)' }} />
          <span className="hidden sm:inline text-[11px]">{geoData.terrainTitle || 'GIS Scanner'}</span>
        </div>
        <div className="w-px h-3.5" style={{ backgroundColor: 'var(--border-subtle, #d8d4ca)' }} />
        <div className="flex items-center gap-1">
          <button
            onClick={() => setMapStyle('terrain')}
            className="px-2 py-0.5 rounded text-[10px] font-semibold transition-all cursor-pointer"
            style={{
              backgroundColor: mapStyle === 'terrain' ? 'var(--color-primary, #315c48)' : 'transparent',
              color: mapStyle === 'terrain' ? '#FFFFFF' : 'var(--text-muted, #73766f)',
            }}
          >
            Topo
          </button>
          <button
            onClick={() => setMapStyle('satellite')}
            className="px-2 py-0.5 rounded text-[10px] font-semibold transition-all cursor-pointer"
            style={{
              backgroundColor: mapStyle === 'satellite' ? 'var(--color-primary, #315c48)' : 'transparent',
              color: mapStyle === 'satellite' ? '#FFFFFF' : 'var(--text-muted, #73766f)',
            }}
          >
            Satellite
          </button>
          <button
            onClick={() => setMapStyle('streets')}
            className="px-2 py-0.5 rounded text-[10px] font-semibold transition-all cursor-pointer"
            style={{
              backgroundColor: mapStyle === 'streets' ? 'var(--color-primary, #315c48)' : 'transparent',
              color: mapStyle === 'streets' ? '#FFFFFF' : 'var(--text-muted, #73766f)',
            }}
          >
            Vector
          </button>
        </div>
      </div>

      {/* Elevation Badge Bottom Left */}
      <div
        className="absolute bottom-2.5 left-2.5 z-[400] text-white text-[10px] font-mono px-2 py-0.5 rounded border flex items-center gap-1 shadow-xs"
        style={{
          backgroundColor: 'var(--dark-surface, #222a25)',
          borderColor: 'var(--border-subtle, #d8d4ca)',
        }}
      >
        <Compass className="w-3 h-3" style={{ color: 'var(--color-secondary, #b77927)' }} />
        <span>{geoData.elevation || 'Elevation: Dynamic Topo Index'}</span>
      </div>

      {/* Map Canvas Container */}
      <div ref={mapContainerRef} className="w-full h-64 sm:h-72" />
    </div>
  );
}
