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
          html: `<div style="background:#10B981; border:3px solid #FFFFFF; border-radius:50%; width:18px; height:18px; box-shadow:0 2px 8px rgba(0,0,0,0.35);"></div>`,
          iconSize: [18, 18],
          iconAnchor: [9, 9],
        });

        const marker = L.marker([lat, lng], { icon: customIcon, draggable: true }).addTo(map);
        const bufferCircle = L.circle([lat, lng], {
          radius: buffer * 1000,
          color: '#10B981',
          weight: 2,
          fillColor: '#10B981',
          fillOpacity: 0.12,
          dashArray: '4, 6',
        }).addTo(map);

        const footprintPolygon = L.circle([lat, lng], {
          radius: Math.sqrt((footprint * 10000) / Math.PI),
          color: '#EA580C',
          weight: 2,
          fillColor: '#EA580C',
          fillOpacity: 0.28,
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
    <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-stone-200 shadow-inner">
      <div ref={mapContainerRef} className="w-full h-full z-10" />
      <div className="absolute top-2.5 left-2.5 z-20 bg-white/95 px-3 py-1.5 rounded-full text-[10px] font-mono text-stone-700 border border-stone-200 pointer-events-none shadow-sm flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
        <span>Location: {lat.toFixed(4)}, {lng.toFixed(4)}</span>
      </div>
    </div>
  );
}




