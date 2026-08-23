import React from 'react';
import { Sun, Route, Waves, ShieldCheck, Check } from 'lucide-react';

export default function SectorsSection() {
  return (
    <section id="sectors" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 shadow-sm text-xs font-sans text-emerald-700 font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Project Sectors &amp; AI Intelligence
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-extrabold text-stone-900 tracking-tight">
            Built for National Infrastructure &amp; Energy
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-4">
            Custom-tailored geospatial algorithms for every major civil, energy, and transport sector.
          </p>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bento Card 1 (2 Cols): Clean Energy */}
          <div className="md:col-span-2 bg-white border border-stone-200 rounded-3xl p-8 flex flex-col justify-between group shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-xs">
                  <Sun className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  Solar &amp; Wind Energy
                </span>
              </div>
              <h3 className="font-sans font-extrabold text-2xl text-stone-900 mb-3 group-hover:text-emerald-700 transition-colors">
                Renewable Solar Farms &amp; Wind Power Parks
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed max-w-xl font-normal">
                Sub-second screening for bird migration flight corridors, grassland conservation zones, high-voltage transmission lines, and forest boundary buffers.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-stone-200 flex items-center justify-between flex-wrap gap-2 text-xs font-mono text-emerald-600">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Flight Path Protection</span>
              </span>
              <span className="text-stone-500">Avg Scan Time: 0.32s</span>
            </div>
          </div>

          {/* Bento Card 2 (1 Col): Highways */}
          <div className="bg-white border border-stone-200 rounded-3xl p-8 flex flex-col justify-between group shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 shadow-xs">
                  <Route className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-orange-700 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                  Transport
                </span>
              </div>
              <h3 className="font-sans font-extrabold text-xl text-stone-900 mb-3 group-hover:text-emerald-700 transition-colors">
                Highways &amp; Rail Corridors
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                Long-route spatial corridor evaluation for eco-sensitive wildlife crossings, forest cutting limits, and rainwater culvert protection.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-stone-200 text-xs font-mono text-orange-600">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Wildlife Crossing Safe</span>
              </span>
            </div>
          </div>

          {/* Bento Card 3 (1 Col): Water & River Basins */}
          <div className="bg-white border border-stone-200 rounded-3xl p-8 flex flex-col justify-between group shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shadow-xs">
                  <Waves className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                  Hydrology
                </span>
              </div>
              <h3 className="font-sans font-extrabold text-xl text-stone-900 mb-3 group-hover:text-emerald-700 transition-colors">
                River Basins &amp; Reservoirs
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                Automated watershed drainage modeling, aquatic flora habitat protection, and downstream clean water assurance.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-stone-200 text-xs font-mono text-sky-600">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Water Flow Protected</span>
              </span>
            </div>
          </div>

          {/* Bento Card 4 (2 Cols): AI Statutory Engine */}
          <div className="md:col-span-2 bg-white border border-stone-200 rounded-3xl p-8 flex flex-col justify-between group shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-xs">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Automated Statutory Intelligence
                </span>
              </div>
              <h3 className="font-sans font-extrabold text-2xl text-stone-900 mb-3 group-hover:text-emerald-700 transition-colors">
                2,400+ EIA Gazette Laws &amp; Acts Digitized
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed max-w-xl font-normal">
                Built-in legal engine cross-examines the Wildlife Protection Act (1972), Forest Conservation Act (1980), and Water Prevention Act (1974) with sub-second accuracy.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-stone-200 flex items-center justify-between flex-wrap gap-2 text-xs font-mono text-emerald-600">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>100% Legal Grounding</span>
              </span>
              <span className="text-stone-500">Zero Hallucination Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




