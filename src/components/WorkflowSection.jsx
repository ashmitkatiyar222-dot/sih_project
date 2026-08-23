import React from 'react';
import { Check } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    title: 'Pick Project Location',
    desc: 'Enter your project GPS coordinates or choose one of our sample industrial, highway, or solar sites.',
    badge: 'Coordinates',
    color: 'from-emerald-500/20 to-teal-500/20 text-emerald-700 border-emerald-500/30'
  },
  {
    num: '02',
    title: 'Scan Surroundings',
    desc: 'Our high-speed PostGIS engine instantly inspects nearby protected forests, rivers, and wildlife habitats.',
    badge: 'Spatial Query',
    color: 'from-blue-500/20 to-indigo-500/20 text-blue-700 border-blue-500/30'
  },
  {
    num: '03',
    title: 'Check Government Rules',
    desc: 'Smart AI compares your project against 2,400+ national environmental laws, clean air rules, and tree acts.',
    badge: 'Compliance AI',
    color: 'from-teal-500/20 to-emerald-500/20 text-teal-700 border-teal-500/30'
  },
  {
    num: '04',
    title: 'Get Official PDF Report',
    desc: 'Download a complete, certified environmental clearance report with verified safety measures ready for submission.',
    badge: 'Clearance PDF',
    color: 'from-emerald-500/30 to-emerald-400/20 text-emerald-700 border-emerald-500/40'
  }
];

export default function WorkflowSection() {
  return (
    <section id="workflow" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 shadow-sm text-xs font-sans text-emerald-700 font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Simple 4-Step Process
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-extrabold text-stone-900 tracking-tight">
            From Location to Instant Clearance
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-4">
            How Ecoryx eliminates 6 months of manual paper reviews with verified 3-second automation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="bg-white border border-stone-200 rounded-3xl p-6 relative flex flex-col justify-between group shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${step.color} border font-mono text-sm font-bold flex items-center justify-center shadow-xs`}
                  >
                    {step.num}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full border border-stone-200">
                    {step.badge}
                  </span>
                </div>
                <h3 className="font-sans font-bold text-lg text-stone-900 mb-2 group-hover:text-emerald-700 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200 flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 font-semibold">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Step Automated</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}




