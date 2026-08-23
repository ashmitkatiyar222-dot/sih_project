import React, { useState, useRef, useEffect } from 'react';
import { PRESETS } from './constants/presets';
import { playDialClickSound } from './utils/audio';

import Header from './components/Header';
import OverviewPage from './pages/OverviewPage';
import DashboardPage from './pages/DashboardPage';
import Footer from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    return window.location.hash === '#dashboard' ? 'dashboard' : 'overview';
  });

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

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#dashboard') {
        setCurrentPage('dashboard');
      } else if (window.location.hash === '#overview' || window.location.hash === '') {
        setCurrentPage('overview');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.location.hash = page === 'dashboard' ? '#dashboard' : '#overview';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    handleNavigate('dashboard');
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
    if (e) e.preventDefault();
    setIsAuditing(true);

    try {
      const { default: confetti } = await import('canvas-confetti');
      setTimeout(() => {
        setIsAuditing(false);
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.7 },
          colors: ['#284e3a', '#9c6519', '#1c231f', '#943b32'],
        });
      }, 550);
    } catch {
      setTimeout(() => setIsAuditing(false), 550);
    }
  };

  return (
    <div className="fintech-bg text-stone-800 font-sans antialiased selection:bg-emerald-800 selection:text-white min-h-screen flex flex-col relative overflow-x-hidden">
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onLaunchConsole={handleLaunchConsole}
      />

      <main className="flex-1">
        {currentPage === 'overview' ? (
          <OverviewPage
            workbenchRef={workbenchRef}
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
            onLaunchConsole={handleLaunchConsole}
          />
        ) : (
          <DashboardPage
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
            onNavigateToOverview={() => handleNavigate('overview')}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

