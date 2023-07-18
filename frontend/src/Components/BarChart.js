import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

const BarChart = ({ barChartData }) => {

    const chartRef = useRef(null);

    useEffect(() => {
        Chart.register(...registerables);


        const ctx = chartRef.current.getContext('2d');

        // Destroy any existing chart on the canvas
        if (chartRef.current.chart) {
            chartRef.current.chart.destroy();
        }

        // Create a new Chart instance
        chartRef.current.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: barChartData.count.map((obj) => `${obj.range.min}-${obj.range.max}`),
                datasets: [
                    {
                        label: 'Total number of items sold and unsold',
                        data: barChartData.count.map((obj) => obj.count),
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderWidth: 1
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }, [barChartData]);

    return (
        <div className="w-full lg:w-1/2">
            <canvas ref={chartRef} id="myChart" />
        </div>

    )
}

export default BarChart
