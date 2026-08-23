import React from 'react';
import { Play, Loader2, Compass, MapPin } from 'lucide-react';
import { CATEGORIES } from '../../constants/presets';

export default function AuditForm({
  lat,
  lng,
  footprint,
  buffer,
  category,
  isAuditing,
  onLatChange,
  onLngChange,
  onFootprintChange,
  onBufferChange,
  onCategoryChange,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {/* Coordinate Inputs */}
      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <label
            htmlFor="input-lat"
            className="flex items-center gap-1 text-[11px] font-mono font-semibold mb-1 text-stone-600"
          >
            <MapPin className="w-3 h-3 text-emerald-800" />
            <span>Latitude</span>
          </label>
          <input
            id="input-lat"
            type="number"
            step="0.000001"
            value={lat}
            onChange={(e) => onLatChange(parseFloat(e.target.value) || 0)}
            required
            className="w-full border rounded px-2.5 py-1.5 text-xs sm:text-sm font-mono focus:outline-none focus:ring-1 focus:ring-emerald-700 shadow-2xs transition-all bg-white/90"
            style={{
              borderColor: 'var(--border-subtle, #d5cfc2)',
              color: 'var(--text-main, #1a1d1a)',
            }}
          />
        </div>
        <div>
          <label
            htmlFor="input-lng"
            className="flex items-center gap-1 text-[11px] font-mono font-semibold mb-1 text-stone-600"
          >
            <Compass className="w-3 h-3 text-emerald-800" />
            <span>Longitude</span>
          </label>
          <input
            id="input-lng"
            type="number"
            step="0.000001"
            value={lng}
            onChange={(e) => onLngChange(parseFloat(e.target.value) || 0)}
            required
            className="w-full border rounded px-2.5 py-1.5 text-xs sm:text-sm font-mono focus:outline-none focus:ring-1 focus:ring-emerald-700 shadow-2xs transition-all bg-white/90"
            style={{
              borderColor: 'var(--border-subtle, #d5cfc2)',
              color: 'var(--text-main, #1a1d1a)',
            }}
          />
        </div>
      </div>

      {/* Sliders in mini-cards */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-2 rounded border bg-amber-50/40 border-amber-200/80 space-y-1">
          <div className="flex justify-between items-center text-[11px] font-mono">
            <span className="font-semibold text-stone-600">Land Area:</span>
            <span className="font-bold text-[#9c6519]">{footprint} Ha</span>
          </div>
          <input
            type="range"
            min="2"
            max="250"
            value={footprint}
            onChange={(e) => onFootprintChange(parseInt(e.target.value, 10))}
            className="w-full h-1.5 rounded appearance-none cursor-pointer accent-[#9c6519] bg-stone-300"
          />
        </div>

        <div className="p-2 rounded border bg-emerald-50/40 border-emerald-200/80 space-y-1">
          <div className="flex justify-between items-center text-[11px] font-mono">
            <span className="font-semibold text-stone-600">Search Dist:</span>
            <span className="font-bold text-emerald-800">{buffer} km</span>
          </div>
          <input
            type="range"
            min="1"
            max="25"
            value={buffer}
            onChange={(e) => onBufferChange(parseInt(e.target.value, 10))}
            className="w-full h-1.5 rounded appearance-none cursor-pointer accent-emerald-800 bg-stone-300"
          />
        </div>
      </div>

      {/* Industry Sector */}
      <div>
        <label
          htmlFor="input-category"
          className="block text-[11px] font-mono font-semibold mb-1 text-stone-600"
        >
          Industry Sector
        </label>
        <select
          id="input-category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full border rounded px-2.5 py-1.5 text-xs sm:text-sm font-mono focus:outline-none focus:ring-1 focus:ring-emerald-700 shadow-2xs cursor-pointer bg-white/90"
          style={{
            borderColor: 'var(--border-subtle, #d5cfc2)',
            color: 'var(--text-main, #1a1d1a)',
          }}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value} style={{ backgroundColor: '#faf9f5', color: '#1a1d1a' }}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Action Button */}
      <button
        type="submit"
        disabled={isAuditing}
        className="w-full py-2.5 rounded text-white font-mono uppercase font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-xs active:scale-[0.99] cursor-pointer disabled:opacity-80 hover:bg-[#1f3d2e] tracking-wider"
        style={{ backgroundColor: 'var(--color-primary, #284e3a)' }}
      >
        {isAuditing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white" />
            <span>Checking Spatial Layers...</span>
          </>
        ) : (
          <>
            <Play className="w-4 h-4 fill-current text-white" />
            <span>Check Environmental Clearance</span>
          </>
        )}
      </button>
    </form>
  );
}




