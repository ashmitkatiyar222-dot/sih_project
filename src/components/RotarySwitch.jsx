import React from 'react';
import { History, Sparkles } from 'lucide-react';

export default function RotarySwitch({ switchState, onToggle, onSelectState }) {
  return (
    <div className="flex justify-center mb-10">
      <div className="rotary-switch-wrapper">
        {/* Left Pill: Old Way */}
        <button
          type="button"
          onClick={() => onSelectState('before')}
          className={`switch-label-btn ${switchState === 'before' ? 'active-before' : 'inactive'}`}
          aria-label="Show Old Manual Paperwork Process"
        >
          <History className="w-4 h-4" />
          <span>Old Way (Manual Paperwork)</span>
        </button>

        {/* Central Skeuomorphic Rotary Dial Socket */}
        <div
          className="rotary-socket"
          onClick={onToggle}
          title="Click to switch views"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onToggle();
            }
          }}
        >
          <div className={`rotary-knob state-${switchState}`}>
            {/* Top Needle Notch */}
            <div className="rotary-pointer" />
            {/* Center Metallic Cap */}
            <div className="rotary-center-cap" />
          </div>
        </div>

        {/* Right Pill: New Way */}
        <button
          type="button"
          onClick={() => onSelectState('after')}
          className={`switch-label-btn ${switchState === 'after' ? 'active-after' : 'inactive'}`}
          aria-label="Launch Instant Ecoryx Simulator"
        >
          <Sparkles className="w-4 h-4" />
          <span>New Way (Instant Ecoryx)</span>
        </button>
      </div>
    </div>
  );
}

