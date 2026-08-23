import React from 'react';
import { Trees, Droplets, Wind } from 'lucide-react';
import RadarChart from './RadarChart';

export default function ScorecardTab({ results, isVisible }) {
  // Determine badge styling based on risk score
  let riskBadge = {
    text: 'Low Risk / Safe to Proceed',
    classes: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50',
  };

  if (results.riskScore > 75) {
    riskBadge = {
      text: 'High Nature Risk / Protected Area',
      classes: 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800/50',
    };
  } else if (results.riskScore > 40) {
    riskBadge = {
      text: 'Moderate Caution / Mitigation Needed',
      classes: 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/50',
    };
  }

  return (
    <div className="space-y-5">
      {/* Verdict Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-sans uppercase tracking-wider text-stone-500 font-bold mb-1">
            Official Environmental Clearance Status
          </div>
          <div className="text-xl font-sans font-extrabold text-stone-900">{results.verdict}</div>
          <p className="text-xs text-stone-600 mt-1 max-w-md">{results.verdictDesc}</p>
        </div>
        <div className="text-left sm:text-right shrink-0">
          <div className="text-[11px] font-sans text-stone-500 uppercase font-bold">Nature Risk Score</div>
          <div className="text-3xl font-mono font-extrabold text-emerald-600">{results.riskScore} / 100</div>
          <span className={`inline-block mt-1 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase border ${riskBadge.classes}`}>
            {riskBadge.text}
          </span>
        </div>
      </div>

      {/* 2-COL DETAILS & RADAR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2.5">
          {/* Sanctuary */}
          <div className="p-3.5 rounded-xl border border-stone-200 bg-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <Trees className="w-4 h-4 text-emerald-600" />
              <div>
                <div className="text-xs font-semibold text-stone-900">Nearest Wildlife Sanctuary</div>
                <div className="text-[11px] text-stone-500">{results.sanctuary}</div>
              </div>
            </div>
            <span className="text-[11px] font-sans font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">Caution</span>
          </div>

          {/* Hydrological */}
          <div className="p-3.5 rounded-xl border border-stone-200 bg-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <Droplets className="w-4 h-4 text-sky-600" />
              <div>
                <div className="text-xs font-semibold text-stone-900">Nearest River / Water Flow</div>
                <div className="text-[11px] text-stone-500">{results.hydro}</div>
              </div>
            </div>
            <span className="text-[11px] font-sans font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">Manageable</span>
          </div>

          {/* Air Quality */}
          <div className="p-3.5 rounded-xl border border-stone-200 bg-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <Wind className="w-4 h-4 text-orange-600" />
              <div>
                <div className="text-xs font-semibold text-stone-900">Local Air Cleanliness</div>
                <div className="text-[11px] text-stone-500">{results.aqi}</div>
              </div>
            </div>
            <span className="text-[11px] font-sans font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">Air Filters Req.</span>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="p-3.5 rounded-xl border border-stone-200 bg-white flex flex-col items-center justify-center shadow-xs">
          <div className="text-[11px] font-sans text-stone-500 uppercase font-bold self-start mb-1">
            Safety Score Chart (All Categories)
          </div>
          <RadarChart data={results.radarData} isVisible={isVisible} />
        </div>
      </div>
    </div>
  );
}





