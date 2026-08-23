import React, { useState } from 'react';
import { Calculator, TrendingUp, Clock, ShieldCheck } from 'lucide-react';

export default function CalculatorSection() {
  const [projects, setProjects] = useState(150);
  const [months, setMonths] = useState(4.5);

  const monthsSaved = Math.round(projects * months);
  const capitalPreserved = ((projects * 25000 * 0.98) / 1000000).toFixed(2);

  return (
    <section id="calculator" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white border border-stone-200 shadow-sm rounded-3xl p-8 sm:p-12 relative shadow-2xl">
          <div className="max-w-2xl mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-sans text-emerald-300 font-bold uppercase mb-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <Calculator className="w-4 h-4 text-emerald-400" />
              National Savings &amp; Efficiency ROI
            </div>
            <h2 className="text-3xl sm:text-4xl font-sans font-extrabold text-stone-900 tracking-tight">
              Calculate Time and Budget Saved
            </h2>
            <p className="text-sm text-stone-600 mt-2 font-normal">
              Estimate annual time and consultant budget saved by deploying automated sub-second EIA screening across your pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Sliders (6 Cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200">
                <div className="flex justify-between items-center mb-2 text-xs font-sans font-bold text-stone-900">
                  <span>Number of Annual Infrastructure Projects</span>
                  <span className="text-emerald-700 font-mono font-extrabold text-sm">{projects} Projects</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={projects}
                  onChange={(e) => setProjects(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

              <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200">
                <div className="flex justify-between items-center mb-2 text-xs font-sans font-bold text-stone-900">
                  <span>Typical Manual Committee Review Delay</span>
                  <span className="text-orange-600 font-mono font-extrabold text-sm">{months.toFixed(1)} Months</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="0.5"
                  value={months}
                  onChange={(e) => setMonths(parseFloat(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>
            </div>

            {/* Results (6 Cols) */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-mono uppercase text-stone-500 font-bold">
                  <span>Review Months Saved</span>
                  <Clock className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-3xl sm:text-5xl font-sans font-extrabold text-stone-900 my-3 tracking-tight">
                  {monthsSaved} <span className="text-lg text-emerald-700 font-mono">Mo</span>
                </div>
                <div className="text-[11px] text-stone-500">Zero waiting on paper files</div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-mono uppercase text-stone-500 font-bold">
                  <span>Capital Preserved</span>
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-3xl sm:text-5xl font-sans font-extrabold text-emerald-700 my-3 tracking-tight">
                  ₹{capitalPreserved} <span className="text-lg text-stone-900 font-mono">Cr</span>
                </div>
                <div className="text-[11px] text-stone-500">Direct survey consultant savings</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}





