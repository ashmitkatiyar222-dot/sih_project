import React from 'react';

export default function RadarChart({ data = [75, 65, 80, 50, 40], isVisible = true }) {
  // 5 Dimensional axes of environmental compliance
  const axes = [
    { label: 'Biodiversity', value: data[0] ?? 72 },
    { label: 'Hydrology', value: data[1] ?? 65 },
    { label: 'Air Quality', value: data[2] ?? 80 },
    { label: 'Forest Cover', value: data[3] ?? 54 },
    { label: 'Statutory Strictness', value: data[4] ?? 60 },
  ];

  const size = 180;
  const center = size / 2;
  const radius = 62;
  const totalAxes = axes.length;

  // Concentric ISO grid levels (20%, 40%, 60%, 80%, 100%)
  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  // Helper to compute (x, y) on pentagonal grid
  const getCoordinates = (angleIdx, scale) => {
    const angle = (angleIdx * 2 * Math.PI) / totalAxes - Math.PI / 2;
    const x = center + Math.cos(angle) * (radius * scale);
    const y = center + Math.sin(angle) * (radius * scale);
    return { x, y };
  };

  // Generate path string for grid rings
  const getGridPolygonPoints = (scale) => {
    return Array.from({ length: totalAxes }, (_, i) => {
      const { x, y } = getCoordinates(i, scale);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
  };

  // Generate data polygon points
  const dataPoints = axes.map((axis, i) => {
    const scale = Math.max(0.1, Math.min(axis.value / 100, 1.0));
    return getCoordinates(i, scale);
  });

  const dataPolygonString = dataPoints.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

  return (
    <div className="w-full h-full min-h-[160px] flex items-center justify-center relative select-none">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full max-w-[210px] h-full max-h-[180px] overflow-visible"
      >
        {/* Concentric Grid Pentagons */}
        {gridLevels.map((level, idx) => (
          <polygon
            key={idx}
            points={getGridPolygonPoints(level)}
            fill={idx % 2 === 0 ? 'rgba(40, 78, 58, 0.04)' : 'transparent'}
            stroke="#d5cfc2"
            strokeWidth={idx === gridLevels.length - 1 ? '1.2' : '0.8'}
            strokeDasharray={idx === gridLevels.length - 1 ? undefined : '2,2'}
          />
        ))}

        {/* Axis Spokes radiating from center */}
        {axes.map((_, i) => {
          const outer = getCoordinates(i, 1.0);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={outer.x}
              y2={outer.y}
              stroke="#d5cfc2"
              strokeWidth="0.8"
            />
          );
        })}

        {/* Data Area Fill & Outline */}
        <polygon
          points={dataPolygonString}
          fill="rgba(40, 78, 58, 0.28)"
          stroke="#284e3a"
          strokeWidth="1.8"
          strokeLinejoin="round"
          className="transition-all duration-300"
        />

        {/* Data Vertices (Nodes) */}
        {dataPoints.map((p, i) => (
          <g key={i} className="transition-all duration-300">
            <circle cx={p.x} cy={p.y} r="3" fill="#284e3a" stroke="#faf9f5" strokeWidth="1.2" />
            <circle cx={p.x} cy={p.y} r="5" fill="#284e3a" opacity="0.2" />
          </g>
        ))}

        {/* Axis Labels positioned gracefully outside the grid */}
        {axes.map((axis, i) => {
          const labelCoord = getCoordinates(i, 1.28);
          let textAnchor = 'middle';
          let dy = '0.3em';

          if (labelCoord.x < center - 10) textAnchor = 'end';
          else if (labelCoord.x > center + 10) textAnchor = 'start';

          if (labelCoord.y < center - 20) dy = '-0.2em';
          else if (labelCoord.y > center + 20) dy = '0.8em';

          return (
            <text
              key={i}
              x={labelCoord.x}
              y={labelCoord.y}
              textAnchor={textAnchor}
              dy={dy}
              className="text-[8px] font-mono font-semibold fill-stone-600 tracking-tight"
            >
              {axis.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

