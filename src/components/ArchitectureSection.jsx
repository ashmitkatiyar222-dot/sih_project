import React from 'react';
import { Cpu, Zap, Shield, FileCheck, Check, Scale } from 'lucide-react';

export default function ArchitectureSection() {
  return (
    <section id="architecture" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 shadow-sm text-xs font-sans text-emerald-700 font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Core Technology Stack
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-extrabold text-stone-900 tracking-tight">
            How the Smart Engine Works Under the Hood
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-4">
            Sub-second PostGIS queries, high-throughput FastAPI microservices, and statutory AI compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">
          {/* Box 1 (2 cols) */}
          <div className="md:col-span-2 bg-white border border-stone-200 rounded-3xl p-8 flex flex-col justify-between group shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider">
                  High-Speed Spatial Indexing
                </div>
                <Zap className="w-4 h-4 text-emerald-600" />
              </div>
              <h3 className="font-sans font-extrabold text-2xl text-stone-900 mb-2 group-hover:text-emerald-700 transition-colors">
                Sub-Second PostGIS Spatial Scanner
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-xl font-normal">
                Scans across 10+ million national animal sightings, reserve forest boundaries, and river drainage channels in &lt; 0.38 seconds with R-Tree spatial indexing.
              </p>
            </div>
            <div className="font-mono text-xs text-emerald-600 font-semibold flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Instant Radius &amp; Boundary Intersection</span>
            </div>
          </div>

          {/* Box 2 */}
          <div className="bg-white border border-stone-200 rounded-3xl p-8 flex flex-col justify-between group shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-mono font-bold text-orange-700 uppercase tracking-wider">
                  Fast Server Core
                </div>
                <Cpu className="w-4 h-4 text-orange-600" />
              </div>
              <h3 className="font-sans font-extrabold text-xl text-stone-900 mb-2 group-hover:text-emerald-700 transition-colors">
                FastAPI Asynchronous Engine
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                Handles thousands of simultaneous project clearances with zero latency bottlenecks.
              </p>
            </div>
            <div className="font-mono text-xs text-stone-600 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>&lt; 50ms Engine Response</span>
            </div>
          </div>

          {/* Box 3 */}
          <div className="bg-white border border-stone-200 rounded-3xl p-8 flex flex-col justify-between group shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider">
                  Statutory Rule Engine
                </div>
                <Shield className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="font-sans font-extrabold text-xl text-stone-900 mb-2 group-hover:text-emerald-700 transition-colors">
                Government Law Parser AI
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                Automatically verifies site compliance with state EIA notifications, MoEFCC rules, and environmental tribunal acts.
              </p>
            </div>
            <div className="font-mono text-xs text-blue-700 font-semibold flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-blue-600" />
              <span>Automated Legal Checks</span>
            </div>
          </div>

          {/* Box 4 (2 cols) */}
          <div className="md:col-span-2 bg-white border border-stone-200 rounded-3xl p-8 flex flex-col justify-between group shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider">
                  Official Deliverables
                </div>
                <FileCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <h3 className="font-sans font-extrabold text-2xl text-stone-900 mb-2 group-hover:text-emerald-700 transition-colors">
                Certified Environmental Management Plan (EMP)
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-xl font-normal">
                Automatically synthesizes verified mitigation measures, risk scoring matrices, and gazette references ready for 1-click PDF download and statutory submission.
              </p>
            </div>
            <div className="font-mono text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>1-Click Official PDF Export</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




