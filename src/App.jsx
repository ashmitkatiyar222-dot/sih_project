import React, { useState, useRef, useEffect } from 'react';
import { PRESETS } from './constants/presets';
import { playDialClickSound } from './utils/audio';

import Header from './components/Header';
import Hero from './components/Hero';
import WorkbenchSection from './components/WorkbenchSection';
import WorkflowSection from './components/WorkflowSection';
import SectorsSection from './components/SectorsSection';
import ArchitectureSection from './components/ArchitectureSection';
import CalculatorSection from './components/CalculatorSection';
import Footer from './components/Footer';

export default function App() {
  const [switchState, setSwitchState] = useState('before');
  const [isAuditing, setIsAuditing] = useState(false);

  // Form parameters
  const [lat, setLat] = useState(27.0238);
  const [lng, setLng] = useState(76.3557);
  const [footprint, setFootprint] = useState(45);
  const [buffer, setBuffer] = useState(10);
  const [category, setCategory] = useState('cat_a_mining');

  // Screening results
  const [results, setResults] = useState(PRESETS.aravalli);

  const workbenchRef = useRef(null);

  const handleSetSwitchState = (state) => {
    if (switchState !== state) {
      setSwitchState(state);
      playDialClickSound();
    }
  };

  const handleToggleSwitch = () => {
    handleSetSwitchState(switchState === 'before' ? 'after' : 'before');
  };

  const handleLaunchConsole = () => {
    handleSetSwitchState('after');
    if (workbenchRef.current) {
      workbenchRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLoadPreset = (presetKey) => {
    const data = PRESETS[presetKey];
    if (!data) return;

    setLat(data.lat);
    setLng(data.lng);
    setFootprint(data.footprint);
    setBuffer(data.buffer);
    setCategory(data.category);
    setResults(data);
  };

  const handleRunAudit = async (e) => {
    e.preventDefault();
    setIsAuditing(true);

    try {
      const { default: confetti } = await import('canvas-confetti');
      setTimeout(() => {
        setIsAuditing(false);
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#2563EB', '#10B981', '#38BDF8', '#0F172A'],
        });
      }, 550);
    } catch {
      setTimeout(() => setIsAuditing(false), 550);
    }
  };

  return (
    <div className="fintech-bg text-stone-800 font-sans antialiased selection:bg-emerald-500 selection:text-white min-h-screen flex flex-col relative overflow-x-hidden">
      <Header onLaunchConsole={handleLaunchConsole} />

      <main className="flex-1">
        <Hero
          onLaunchConsole={handleLaunchConsole}
          onLoadPreset={handleLoadPreset}
        />

        <WorkbenchSection
          ref={workbenchRef}
          switchState={switchState}
          onToggleSwitch={handleToggleSwitch}
          onSelectState={handleSetSwitchState}
          lat={lat}
          lng={lng}
          footprint={footprint}
          buffer={buffer}
          category={category}
          results={results}
          isAuditing={isAuditing}
          onLatChange={setLat}
          onLngChange={setLng}
          onFootprintChange={setFootprint}
          onBufferChange={setBuffer}
          onCategoryChange={setCategory}
          onLoadPreset={handleLoadPreset}
          onRunAudit={handleRunAudit}
        />

        <WorkflowSection />
        <SectorsSection />
        <ArchitectureSection />
        <CalculatorSection />
      </main>

      <Footer />
    </div>
  );
}

