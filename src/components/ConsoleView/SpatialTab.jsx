import React from 'react';

const SPATIAL_LAYERS = [
  {
    layer: "Wildlife Sanctuary Zone",
    distance: "4.2 km Away",
    standard: "Wildlife Protection Act",
    mitigation: "Special Wildlife Safety Approval Required",
    distColor: "text-amber-700 dark:text-amber-400",
    mitColor: "text-emerald-700 dark:text-emerald-400 font-semibold"
  },
  {
    layer: "Protected Forest Border",
    distance: "1.8 km Northwest",
    standard: "Forest Conservation Act",
    mitigation: "Strict zero tree-cutting boundary",
    distColor: "text-stone-700 dark:text-stone-600",
    mitColor: "text-stone-700 dark:text-stone-600 font-semibold"
  },
  {
    layer: "Freshwater River & Stream",
    distance: "820 meters South",
    standard: "Clean Water Act",
    mitigation: "No wastewater discharge into stream",
    distColor: "text-sky-700 dark:text-sky-400",
    mitColor: "text-amber-700 dark:text-amber-400 font-semibold"
  }
];

export default function SpatialTab() {
  return (
    <div className="space-y-3">
      <div className="text-xs font-sans text-stone-500 flex justify-between">
        <span>Protected Nature Areas within 10 km Search Radius</span>
        <span className="text-emerald-600 font-bold">Map Verified ✓</span>
      </div>
      <div className="overflow-x-auto border border-stone-200 rounded-2xl shadow-xs">
        <table className="w-full text-left text-xs font-sans">
          <thead className="bg-stone-100 border-b border-stone-200 text-stone-700 font-semibold">
            <tr>
              <th className="p-3">Protected Nature Feature</th>
              <th className="p-3">Distance From Site</th>
              <th className="p-3">Safety Rule</th>
              <th className="p-3">Action Needed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 text-stone-700 bg-white">
            {SPATIAL_LAYERS.map((row, idx) => (
              <tr key={idx} className="hover:bg-stone-50 transition-colors">
                <td className="p-3 font-bold text-stone-900">{row.layer}</td>
                <td className={`p-3 font-medium ${row.distColor}`}>{row.distance}</td>
                <td className="p-3">{row.standard}</td>
                <td className={`p-3 ${row.mitColor}`}>{row.mitigation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}





