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
        className="text-xs font-sans flex justify-between"
        style={{ color: 'var(--text-muted, #73766f)' }}
      >
        <span>Protected Nature Areas within 10 km Search Radius</span>
        <span style={{ color: 'var(--color-primary, #315c48)' }} className="font-bold">Map Verified ✓</span>
      </div>
      <div
        className="overflow-x-auto border rounded-2xl shadow-xs"
        style={{
          borderColor: 'var(--border-subtle, #d8d4ca)',
          backgroundColor: 'var(--bg-card, #fbfaf6)',
        }}
      >
        <table className="w-full text-left text-xs font-sans">
          <thead
            className="border-b font-semibold"
            style={{
              backgroundColor: 'var(--bg-card-subtle, #edeae1)',
              borderColor: 'var(--border-subtle, #d8d4ca)',
              color: 'var(--text-main, #20231f)',
            }}
          >
            <tr>
              <th className="p-3">Protected Nature Feature</th>
              <th className="p-3">Distance From Site</th>
              <th className="p-3">Safety Rule</th>
              <th className="p-3">Action Needed</th>
            </tr>
          </thead>
          <tbody
            className="divide-y"
            style={{
              borderColor: 'var(--border-subtle, #d8d4ca)',
              color: 'var(--text-muted, #73766f)',
            }}
          >
            {SPATIAL_LAYERS.map((row, idx) => (
              <tr
                key={idx}
                className="transition-colors hover:opacity-90"
                style={{ backgroundColor: 'var(--bg-card, #fbfaf6)' }}
              >
                <td className="p-3 font-bold" style={{ color: 'var(--text-main, #20231f)' }}>{row.layer}</td>
                <td className="p-3 font-medium" style={{ color: 'var(--color-secondary, #b77927)' }}>{row.distance}</td>
                <td className="p-3">{row.standard}</td>
                <td className="p-3 font-semibold" style={{ color: 'var(--color-primary, #315c48)' }}>{row.mitigation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
