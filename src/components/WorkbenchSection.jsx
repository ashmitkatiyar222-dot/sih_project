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
    <section id="workbench-section" ref={ref} className="py-10 sm:py-14 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono mb-3 border"
            style={{
              backgroundColor: 'var(--bg-card, #fbfaf6)',
              borderColor: 'var(--border-subtle, #d8d4ca)',
              color: 'var(--text-main, #20231f)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: 'var(--color-primary, #315c48)' }}
            />
            <span>COMPARATIVE CLEARANCE WORKBENCH</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl font-serif font-bold tracking-tight mb-2"
            style={{ color: 'var(--text-main, #20231f)' }}
          >
            Manual Paper Delays vs. Instant AI Clearance
          </h2>
          <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-muted, #73766f)' }}>
            Turn the dial to compare traditional 6-month paper review friction against sub-second automated compliance.
          </p>
        </div>

        {/* Rotary Switch */}
        <div className="flex justify-center mb-6">
          <RotarySwitch
            switchState={switchState}
            onToggle={onToggleSwitch}
            onSelectState={onSelectState}
          />
        </div>

        {/* Views Container */}
        <div className="views-container">
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
