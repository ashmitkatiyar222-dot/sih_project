import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

export default function GisMap({ lat, lng, buffer, footprint, onCoordinatesChange, isVisible }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const bufferCircleRef = useRef(null);
  const footprintPolygonRef = useRef(null);

  // Initialize Map with non-blocking deferred mount
  useEffect(() => {
    if (!isVisible || !mapContainerRef.current) return;

    let timer = null;

    if (!mapInstanceRef.current) {
      // Allow the rotary knob and slide transition to complete smoothly first
      timer = setTimeout(() => {
        if (!mapContainerRef.current || mapInstanceRef.current) return;

        const map = L.map(mapContainerRef.current, {
          center: [lat, lng],
          zoom: 11,
          zoomControl: false,
          preferCanvas: true, // Uses Canvas renderer for high-performance rendering of circles
        });

        L.control.zoom({ position: 'bottomright' }).addTo(map);

        // Carto Voyager clean tiles
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; CARTO',
          maxZoom: 19,
          subdomains: 'abcd',
        }).addTo(map);

        const customIcon = L.divIcon({
          className: 'custom-pin',
          html: `<div style="background:#284e3a; border:2px solid #faf9f5; border-radius:2px; width:16px; height:16px; box-shadow:0 1px 3px rgba(28,35,31,0.3); display:flex; align-items:center; justify-content:center; color:#fff; font-size:8px; font-weight:bold;">📍</div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        });

        const marker = L.marker([lat, lng], { icon: customIcon, draggable: true }).addTo(map);
        const bufferCircle = L.circle([lat, lng], {
          radius: buffer * 1000,
          color: '#284e3a',
          weight: 1.5,
          fillColor: '#284e3a',
          fillOpacity: 0.1,
          dashArray: '4, 6',
        }).addTo(map);

        const footprintPolygon = L.circle([lat, lng], {
          radius: Math.sqrt((footprint * 10000) / Math.PI),
          color: '#9c6519',
          weight: 1.5,
          fillColor: '#9c6519',
          fillOpacity: 0.22,
        }).addTo(map);

        marker.on('dragend', () => {
          const pos = marker.getLatLng();
          onCoordinatesChange(Number(pos.lat.toFixed(6)), Number(pos.lng.toFixed(6)));
        });

        map.on('click', (e) => {
          marker.setLatLng(e.latlng);
          onCoordinatesChange(Number(e.latlng.lat.toFixed(6)), Number(e.latlng.lng.toFixed(6)));
        });

        mapInstanceRef.current = map;
        markerRef.current = marker;
        bufferCircleRef.current = bufferCircle;
        footprintPolygonRef.current = footprintPolygon;
      }, 100);
    } else {
      timer = setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 120);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible]);

  // Sync markers and shapes with prop updates
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (markerRef.current) {
      markerRef.current.setLatLng([lat, lng]);
    }
    if (bufferCircleRef.current) {
      bufferCircleRef.current.setLatLng([lat, lng]);
      bufferCircleRef.current.setRadius(buffer * 1000);
    }
    if (footprintPolygonRef.current) {
      footprintPolygonRef.current.setLatLng([lat, lng]);
      footprintPolygonRef.current.setRadius(Math.sqrt((footprint * 10000) / Math.PI));
    }
    mapInstanceRef.current.panTo([lat, lng]);
  }, [lat, lng, buffer, footprint]);

  return (
    <div
      className="relative w-full h-56 sm:h-60 rounded overflow-hidden border shadow-xs"
      style={{
        borderColor: 'var(--border-subtle, #d5cfc2)',
        backgroundColor: 'var(--bg-card-subtle, #eae6dc)',
      }}
    >
      <div ref={mapContainerRef} className="w-full h-full z-10" />
      <div
        className="absolute top-2 left-2 z-20 px-2 py-0.5 rounded text-[10px] font-mono border pointer-events-none shadow-xs flex items-center gap-1.5"
        style={{
          backgroundColor: 'var(--bg-card, #faf9f5)',
          borderColor: 'var(--border-subtle, #d5cfc2)',
          color: 'var(--text-main, #1a1d1a)',
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: 'var(--color-primary, #284e3a)' }} />
        <span>Location: {lat.toFixed(4)}, {lng.toFixed(4)}</span>
      </div>
    </div>
  );
}




