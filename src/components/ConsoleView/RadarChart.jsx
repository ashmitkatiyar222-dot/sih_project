import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function RadarChart({ data, isVisible }) {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!isVisible || !canvasRef.current) return;

    const gridColor = '#d5cfc2';
    const angleLineColor = '#bfb9aa';
    const labelColor = '#5e625a';
    const primaryColor = '#284e3a';
    const bgColor = 'rgba(40, 78, 58, 0.15)';

    let timer = null;

    if (!chartInstanceRef.current) {
      timer = setTimeout(() => {
        if (!canvasRef.current || chartInstanceRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        chartInstanceRef.current = new ChartJS(ctx, {
          type: 'radar',
          data: {
            labels: ['Biodiversity', 'Hydrology', 'Air Quality', 'Forest Density', 'Statutory Strictness'],
            datasets: [
              {
                label: 'Vulnerability Index',
                data: data || [75, 65, 80, 50, 40],
                backgroundColor: bgColor,
                borderColor: primaryColor,
                borderWidth: 1.5,
                pointBackgroundColor: primaryColor,
                pointBorderColor: '#faf9f5',
                pointHoverBackgroundColor: '#9c6519',
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 250,
            },
            scales: {
              r: {
                angleLines: { color: angleLineColor },
                grid: { color: gridColor },
                pointLabels: {
                  color: labelColor,
                  font: { size: 9, family: "'Merriweather Sans', 'Mulish', 'Google Sans', sans-serif", weight: '600' },
                },
                ticks: { display: false },
              },
            },
            plugins: { legend: { display: false } },
          },
        });
      }, 100);
    } else {
      chartInstanceRef.current.data.datasets[0].data = data;
      chartInstanceRef.current.data.datasets[0].backgroundColor = bgColor;
      chartInstanceRef.current.data.datasets[0].borderColor = primaryColor;
      chartInstanceRef.current.data.datasets[0].pointBackgroundColor = primaryColor;
      chartInstanceRef.current.options.scales.r.grid.color = gridColor;
      chartInstanceRef.current.options.scales.r.angleLines.color = angleLineColor;
      chartInstanceRef.current.options.scales.r.pointLabels.color = labelColor;
      chartInstanceRef.current.update('none');
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [data, isVisible]);

  return (
    <div className="w-full h-36 flex items-center justify-center">
      <canvas ref={canvasRef} />
    </div>
  );
}

