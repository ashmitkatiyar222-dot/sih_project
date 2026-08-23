import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check, Sparkles, ChevronDown } from 'lucide-react';
import { useTheme } from '../utils/context/ThemeContext';

export default function ThemeSelector() {
  const { currentTheme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const activeTheme = themes[currentTheme] || themes.warm_forest;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border shadow-xs text-xs font-sans font-medium transition-all cursor-pointer hover:bg-[#eae6dc] active:scale-98"
        style={{
          backgroundColor: 'var(--bg-card, #faf9f5)',
          borderColor: 'var(--border-subtle, #d5cfc2)',
          color: 'var(--text-main, #1a1d1a)',
        }}
        title="Switch Color Palette"
      >
        <div className="flex items-center -space-x-1">
          {activeTheme.previewColors.slice(0, 3).map((c, i) => (
            <span
              key={i}
              className="w-2.5 h-2.5 rounded-full border border-white"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
        <span className="hidden sm:inline text-[11px]">{activeTheme.name.split('(')[0]}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-1.5 w-72 sm:w-80 rounded-md border shadow-xs p-1.5 z-[999]"
          style={{
            backgroundColor: 'var(--bg-card, #faf9f5)',
            borderColor: 'var(--border-subtle, #d5cfc2)',
          }}
        >
          <div className="px-2.5 py-1.5 border-b mb-1 flex items-center justify-between" style={{ borderColor: 'var(--border-subtle, #d5cfc2)' }}>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted, #5e625a)' }}>
              Cartographic Palettes
            </span>
            <span
              className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border"
              style={{
                backgroundColor: 'var(--color-primary-light, #e3ebe5)',
                color: 'var(--color-primary-text, #1a3527)',
                borderColor: 'var(--border-subtle, #d5cfc2)',
              }}
            >
              Live Switch
            </span>
          </div>

          <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
            {Object.entries(themes).map(([key, t]) => {
              const isSelected = currentTheme === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setTheme(key);
                    setIsOpen(false);
                  }}
                  className="w-full text-left p-2 rounded transition-all flex items-center justify-between group cursor-pointer border"
                  style={{
                    backgroundColor: isSelected ? 'var(--bg-card-subtle, #eae6dc)' : 'transparent',
                    borderColor: isSelected ? 'var(--color-primary, #284e3a)' : 'transparent',
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center -space-x-1">
                      {t.previewColors.map((color, i) => (
                        <span
                          key={i}
                          className="w-3.5 h-3.5 rounded-full border border-white shadow-xs transition-transform group-hover:scale-105"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <div>
                      <div className="text-xs font-semibold" style={{ color: 'var(--text-main, #1a1d1a)' }}>
                        {t.name}
                      </div>
                      <div className="text-[10px] line-clamp-1" style={{ color: 'var(--text-muted, #5e625a)' }}>
                        {t.description}
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--color-primary, #284e3a)' }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
