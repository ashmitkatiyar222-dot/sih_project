import React from 'react';
import { Play, Loader2 } from 'lucide-react';
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
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Coordinate Inputs */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="input-lat" className="block text-xs font-sans font-semibold text-stone-600 mb-1">
            Latitude (GPS)
          </label>
          <input
            id="input-lat"
            type="number"
            step="0.000001"
            value={lat}
            onChange={(e) => onLatChange(parseFloat(e.target.value) || 0)}
            required
            className="w-full bg-white border border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 rounded-xl px-3 py-2 text-sm font-mono text-stone-800 focus:outline-none shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="input-lng" className="block text-xs font-sans font-semibold text-stone-600 mb-1">
            Longitude (GPS)
          </label>
          <input
            id="input-lng"
            type="number"
            step="0.000001"
            value={lng}
            onChange={(e) => onLngChange(parseFloat(e.target.value) || 0)}
            required
            className="w-full bg-white border border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 rounded-xl px-3 py-2 text-sm font-mono text-stone-800 focus:outline-none shadow-sm"
          />
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-sans font-semibold text-stone-600">Project Area</label>
            <span className="text-xs font-mono font-bold text-orange-600">{footprint} Ha</span>
          </div>
          <input
            type="range"
            min="2"
            max="250"
            value={footprint}
            onChange={(e) => onFootprintChange(parseInt(e.target.value, 10))}
            className="w-full h-1.5 bg-stone-200 rounded appearance-none cursor-pointer accent-orange-500"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-sans font-semibold text-stone-600">Search Radius</label>
            <span className="text-xs font-mono font-bold text-emerald-600">{buffer} km</span>
          </div>
          <input
            type="range"
            min="1"
            max="25"
            value={buffer}
            onChange={(e) => onBufferChange(parseInt(e.target.value, 10))}
            className="w-full h-1.5 bg-stone-200 rounded appearance-none cursor-pointer accent-emerald-600"
          />
        </div>
      </div>

      {/* Industry Sector */}
      <div>
        <label htmlFor="input-category" className="block text-xs font-sans font-semibold text-stone-600 mb-1">
          Project Industry / Type
        </label>
        <select
          id="input-category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full bg-white border border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 rounded-xl px-3 py-2 text-xs font-medium text-stone-800 focus:outline-none shadow-sm cursor-pointer"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value} className="bg-white text-stone-800">
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Action Button */}
      <button
        type="submit"
        disabled={isAuditing}
        className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm active:scale-98 cursor-pointer disabled:opacity-80"
      >
        {isAuditing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white" />
            <span>Scanning Nearby Nature & Forests...</span>
          </>
        ) : (
          <>
            <Play className="w-4 h-4 fill-current text-white" />
            <span>Run Instant Safety Check</span>
          </>
        )}
      </button>
    </form>
  );
}




