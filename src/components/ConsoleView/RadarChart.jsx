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

    const gridColor = '#E7E5E4';
    const angleLineColor = '#D6D3D1';
    const labelColor = '#57534E';
    const primaryColor = '#059669';
    const bgColor = 'rgba(16, 185, 129, 0.18)';

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
                borderWidth: 2,
                pointBackgroundColor: primaryColor,
                pointBorderColor: '#FFFFFF',
                pointHoverBackgroundColor: '#0284C7',
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 300,
            },
            scales: {
              r: {
                angleLines: { color: angleLineColor },
                grid: { color: gridColor },
                pointLabels: {
                  color: labelColor,
                  font: { size: 9, family: 'Plus Jakarta Sans', weight: '600' },
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
    <div className="w-full h-40 flex items-center justify-center">
      <canvas ref={canvasRef} />
    </div>
  );
}

