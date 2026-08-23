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
    <section id="workbench-section" ref={ref} className="py-20 sm:py-28 relative overflow-hidden">
      {/* Ambient Radial Mesh Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 shadow-sm text-xs font-sans text-emerald-300 font-semibold mb-4 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Interactive Clearance Simulator
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-extrabold text-stone-900 tracking-tight mb-4">
            See the Difference: Old Way vs. Ecoryx AI
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Turn the rotary dial below to compare 6 months of manual paper reviews with instant 0.38-second GIS clearance.
          </p>
        </div>

        {/* Rotary Switch */}
        <RotarySwitch
          switchState={switchState}
          onToggle={onToggleSwitch}
          onSelectState={onSelectState}
        />

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



