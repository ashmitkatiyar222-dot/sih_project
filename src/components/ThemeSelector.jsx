import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check, Sparkles, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

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
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border shadow-xs text-xs font-sans font-medium transition-all cursor-pointer hover:bg-[#edeae1] active:scale-98"
        style={{
          backgroundColor: 'var(--bg-card, #fbfaf6)',
          borderColor: 'var(--border-subtle, #d8d4ca)',
          color: 'var(--text-main, #20231f)',
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
          className="absolute right-0 mt-1.5 w-72 sm:w-80 rounded-xl border shadow-md p-1.5 z-[999]"
          style={{
            backgroundColor: 'var(--bg-card, #fbfaf6)',
            borderColor: 'var(--border-subtle, #d8d4ca)',
          }}
        >
          <div className="px-2.5 py-1.5 border-b mb-1 flex items-center justify-between" style={{ borderColor: 'var(--border-subtle, #d8d4ca)' }}>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted, #73766f)' }}>
              Color Palettes
            </span>
            <span
              className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border"
              style={{
                backgroundColor: 'var(--color-primary-light, #e2ebe5)',
                color: 'var(--color-primary-text, #244737)',
                borderColor: 'var(--border-subtle, #d8d4ca)',
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
                  className="w-full text-left p-2 rounded-lg transition-all flex items-center justify-between group cursor-pointer border"
                  style={{
                    backgroundColor: isSelected ? 'var(--bg-card-subtle, #edeae1)' : 'transparent',
                    borderColor: isSelected ? 'var(--color-primary, #315c48)' : 'transparent',
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center -space-x-1">
                      {t.previewColors.map((color, i) => (
                        <span
                          key={i}
                          className="w-3.5 h-3.5 rounded-full border border-white shadow-2xs transition-transform group-hover:scale-110"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <div>
                      <div className="text-xs font-semibold" style={{ color: 'var(--text-main, #20231f)' }}>
                        {t.name}
                      </div>
                      <div className="text-[10px] line-clamp-1" style={{ color: 'var(--text-muted, #73766f)' }}>
                        {t.description}
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--color-primary, #315c48)' }} />
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
