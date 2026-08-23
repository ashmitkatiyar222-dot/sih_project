import React, { forwardRef } from 'react';
import RotarySwitch from './RotarySwitch';
import BeforeEcoryxView from './BeforeEcoryxView';
import ConsoleSection from './ConsoleView/ConsoleSection';

const WorkbenchSection = forwardRef(function WorkbenchSection(
  {
    switchState,
    onToggleSwitch,
    onSelectState,
    lat,
    lng,
    footprint,
    buffer,
    category,
    results,
    isAuditing,
    onLatChange,
    onLngChange,
    onFootprintChange,
    onBufferChange,
    onCategoryChange,
    onLoadPreset,
    onRunAudit,
  },
  ref
) {
  return (
    <section id="workbench-section" ref={ref} className="py-8 sm:py-12 relative overflow-hidden border-b bg-gradient-to-b from-[#fbf0dc]/70 via-[#fdf8f0] to-[#f4f1ea]" style={{ borderColor: 'var(--border-subtle, #d5cfc2)' }}>
      {/* Radiant Amber Flare */}
      <div className="absolute top-10 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-6 scroll-reveal-header">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-1.5"
            style={{ color: 'var(--text-main, #1a1d1a)' }}
          >
            Manual Paper Delays vs. Instant AI Clearance
          </h2>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-muted, #5e625a)' }}>
            Turn the dial to compare traditional 6-month paper review friction against sub-second automated compliance.
          </p>
        </div>

        {/* Rotary Switch Container */}
        <div className="flex justify-start sm:justify-center mb-6 scroll-reveal">
          <RotarySwitch
            switchState={switchState}
            onToggle={onToggleSwitch}
            onSelectState={onSelectState}
          />
        </div>

        {/* Views Container */}
        <div className="views-container scroll-reveal">
          {/* Before View */}
          <BeforeEcoryxView
            isActive={switchState === 'before'}
            onSwitchToAfter={() => onSelectState('after')}
          />

          {/* After View / Console */}
          <ConsoleSection
            isActive={switchState === 'after'}
            lat={lat}
            lng={lng}
            footprint={footprint}
            buffer={buffer}
            category={category}
            results={results}
            isAuditing={isAuditing}
            onLatChange={onLatChange}
            onLngChange={onLngChange}
            onFootprintChange={onFootprintChange}
            onBufferChange={onBufferChange}
            onCategoryChange={onCategoryChange}
            onLoadPreset={onLoadPreset}
            onRunAudit={onRunAudit}
          />
        </div>
      </div>
    </section>
  );
});

export default WorkbenchSection;
