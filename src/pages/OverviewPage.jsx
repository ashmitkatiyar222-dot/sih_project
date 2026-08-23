import React from 'react';
import Hero from '../components/Hero';
import ManualLedgerSection from '../components/ManualLedgerSection';
import WorkflowSection from '../components/WorkflowSection';
import TerrainShowcaseSection from '../components/TerrainShowcaseSection';
import SectorsSection from '../components/SectorsSection';
import ArchitectureSection from '../components/ArchitectureSection';
import CalculatorSection from '../components/CalculatorSection';

export default function OverviewPage({
  onLoadPreset,
  onLaunchConsole,
}) {
  return (
    <div>
      <Hero
        onLaunchConsole={onLaunchConsole}
        onLoadPreset={onLoadPreset}
      />

      {/* Standalone Manual Paperwork Ledger Section */}
      <ManualLedgerSection />

      {/* From Project Coordinates to Official Clearance (Game Level Questline with Scroll-Rotator) */}
      <WorkflowSection />

      {/* 3D Terrain Showcase Section (3D Digital Elevation & Terrain Modeling) */}
      <TerrainShowcaseSection />

      <SectorsSection />
      <ArchitectureSection />
      <CalculatorSection />
    </div>
  );
}
