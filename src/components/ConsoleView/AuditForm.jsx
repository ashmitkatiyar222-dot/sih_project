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
          <label
            htmlFor="input-lat"
            className="block text-xs font-sans font-semibold mb-1"
            style={{ color: 'var(--text-muted, #73766f)' }}
          >
            Latitude (GPS)
          </label>
          <input
            id="input-lat"
            type="number"
            step="0.000001"
            value={lat}
            onChange={(e) => onLatChange(parseFloat(e.target.value) || 0)}
            required
            className="w-full border rounded-xl px-3 py-2 text-sm font-mono focus:outline-none shadow-xs transition-all"
            style={{
              backgroundColor: 'var(--bg-card, #fbfaf6)',
              borderColor: 'var(--border-subtle, #d8d4ca)',
              color: 'var(--text-main, #20231f)',
            }}
          />
        </div>
        <div>
          <label
            htmlFor="input-lng"
            className="block text-xs font-sans font-semibold mb-1"
            style={{ color: 'var(--text-muted, #73766f)' }}
          >
            Longitude (GPS)
          </label>
          <input
            id="input-lng"
            type="number"
            step="0.000001"
            value={lng}
            onChange={(e) => onLngChange(parseFloat(e.target.value) || 0)}
            required
            className="w-full border rounded-xl px-3 py-2 text-sm font-mono focus:outline-none shadow-xs transition-all"
            style={{
              backgroundColor: 'var(--bg-card, #fbfaf6)',
              borderColor: 'var(--border-subtle, #d8d4ca)',
              color: 'var(--text-main, #20231f)',
            }}
          />
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-sans font-semibold" style={{ color: 'var(--text-muted, #73766f)' }}>
              Project Area
            </label>
            <span className="text-xs font-mono font-bold" style={{ color: 'var(--color-secondary, #b77927)' }}>
              {footprint} Ha
            </span>
          </div>
          <input
            type="range"
            min="2"
            max="250"
            value={footprint}
            onChange={(e) => onFootprintChange(parseInt(e.target.value, 10))}
            className="w-full h-1.5 rounded appearance-none cursor-pointer"
            style={{ accentColor: 'var(--color-secondary, #b77927)', backgroundColor: 'var(--border-subtle, #d8d4ca)' }}
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-sans font-semibold" style={{ color: 'var(--text-muted, #73766f)' }}>
              Search Radius
            </label>
            <span className="text-xs font-mono font-bold" style={{ color: 'var(--color-primary, #315c48)' }}>
              {buffer} km
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="25"
            value={buffer}
            onChange={(e) => onBufferChange(parseInt(e.target.value, 10))}
            className="w-full h-1.5 rounded appearance-none cursor-pointer"
            style={{ accentColor: 'var(--color-primary, #315c48)', backgroundColor: 'var(--border-subtle, #d8d4ca)' }}
          />
        </div>
      </div>

      {/* Industry Sector */}
      <div>
        <label
          htmlFor="input-category"
          className="block text-xs font-sans font-semibold mb-1"
          style={{ color: 'var(--text-muted, #73766f)' }}
        >
          Project Industry / Type
        </label>
        <select
          id="input-category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full border rounded-xl px-3 py-2 text-xs font-medium focus:outline-none shadow-xs cursor-pointer"
          style={{
            backgroundColor: 'var(--bg-card, #fbfaf6)',
            borderColor: 'var(--border-subtle, #d8d4ca)',
            color: 'var(--text-main, #20231f)',
          }}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value} style={{ backgroundColor: 'var(--bg-card, #fbfaf6)', color: 'var(--text-main, #20231f)' }}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Action Button */}
      <button
        type="submit"
        disabled={isAuditing}
        className="w-full py-3.5 rounded-full text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-xs active:scale-98 cursor-pointer disabled:opacity-80 hover:opacity-90"
        style={{ backgroundColor: 'var(--color-primary, #315c48)' }}
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




