import React from 'react';
import { AlertTriangle, Clock, Map, Wallet, ArrowRight, X } from 'lucide-react';

const CHALLENGES = [
  {
    title: "Scattered Information:",
    desc: "Nature maps and rules are trapped across separate PDF websites and paper files."
  },
  {
    title: "Confusing Regulations:",
    desc: "Hard to figure out which exact government environmental laws apply to your project."
  },
  {
    title: "4 to 6 Months of Waiting:",
    desc: "Manual paper drawing and slow department reviews delay important projects."
  },
  {
    title: "Costly Legal Risks:",
    desc: "Accidentally building too close to a protected forest can halt the entire project."
  }
];

const METRICS = [
  {
    val: "68%",
    title: "Time Lost to Slow Paperwork",
    desc: "Projects sit waiting for months for manual committee reviews.",
    Icon: Clock
  },
  {
    val: "55%",
    title: "Manual Map Reading Errors",
    desc: "Mistakes made from measuring distances by hand on outdated paper maps.",
    Icon: Map
  },
  {
    val: "₹45 Lakhs",
    title: "Money Wasted on Repetitive Surveys",
    desc: "Funds drained hiring consultants for basic distance and map checks.",
    Icon: Wallet
  }
];

export default function BeforeEcoryxView({ isActive, onSwitchToAfter }) {
  return (
    <div className={`view-panel view-panel-before ${isActive ? 'panel-active' : 'panel-hidden'}`}>
      <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Challenges List (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-sans font-bold">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              Old Manual Process (Before Ecoryx)
            </div>

            <h3 className="text-2xl sm:text-4xl font-sans font-extrabold text-stone-900 leading-tight tracking-tight">
              Why getting green approvals today is slow and painful
            </h3>

            <div className="space-y-4 pt-1">
              {CHALLENGES.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3 h-3" />
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed font-normal">
                    <strong className="text-stone-900 font-semibold">{item.title}</strong> {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Action prompt to switch */}
            <div className="pt-2">
              <button
                onClick={onSwitchToAfter}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm active:scale-95 group cursor-pointer"
              >
                <span>Turn Dial to See Ecoryx AI</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Metric Cards (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            {METRICS.map((metric, idx) => {
              const IconComp = metric.Icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-4 transition-all hover:border-rose-300 shadow-xs"
                >
                  <div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">{metric.val}</div>
                    <div className="text-xs font-bold text-stone-800 mt-1">{metric.title}</div>
                    <p className="text-[11px] text-stone-500 mt-0.5">{metric.desc}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0 shadow-xs">
                    <IconComp className="w-6 h-6" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
