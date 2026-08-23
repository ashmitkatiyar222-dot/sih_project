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
      <div
        className="text-xs sm:text-sm font-mono flex justify-between"
        style={{ color: 'var(--text-muted, #5e625a)' }}
      >
        <span>Protected Environmental Areas within Search Distance</span>
        <span style={{ color: 'var(--color-primary, #284e3a)' }} className="font-bold">Distance Checks Verified ✓</span>
      </div>
      <div
        className="overflow-x-auto border rounded shadow-xs"
        style={{
          borderColor: 'var(--border-subtle, #d5cfc2)',
          backgroundColor: 'var(--bg-card, #faf9f5)',
        }}
      >
        <table className="w-full text-left text-xs sm:text-sm font-sans">
          <thead
            className="border-b font-mono text-xs uppercase font-semibold"
            style={{
              backgroundColor: 'var(--bg-card-subtle, #eae6dc)',
              borderColor: 'var(--border-subtle, #d5cfc2)',
              color: 'var(--text-main, #1a1d1a)',
            }}
          >
            <tr>
              <th className="p-3">Protected Environmental Area</th>
              <th className="p-3">Distance From Site</th>
              <th className="p-3">Applicable Law</th>
              <th className="p-3">Required Action</th>
            </tr>
          </thead>
          <tbody
            className="divide-y text-xs sm:text-sm"
            style={{
              borderColor: 'var(--border-subtle, #d5cfc2)',
              color: 'var(--text-muted, #5e625a)',
            }}
          >
            {SPATIAL_LAYERS.map((row, idx) => (
              <tr
                key={idx}
                className="transition-colors hover:bg-[#eae6dc]/40"
                style={{ backgroundColor: 'var(--bg-card, #faf9f5)' }}
              >
                <td className="p-3 font-bold" style={{ color: 'var(--text-main, #1a1d1a)' }}>{row.layer}</td>
                <td className="p-3 font-mono font-medium" style={{ color: 'var(--color-secondary, #9c6519)' }}>{row.distance}</td>
                <td className="p-3">{row.standard}</td>
                <td className="p-3 font-medium" style={{ color: 'var(--color-primary, #284e3a)' }}>{row.mitigation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
