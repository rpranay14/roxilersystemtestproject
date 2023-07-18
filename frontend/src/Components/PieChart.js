import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

const PieChart = ({ pieChartData }) => {
    const chartRef = useRef(null);
    useEffect(() => {
        Chart.register(...registerables);
        const ctx = chartRef.current.getContext('2d');
        if (chartRef.current.chart) {
            chartRef.current.chart.destroy();
        }
        chartRef.current.chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: Object.keys(pieChartData.category),
                datasets: [
                    {
                        label: 'Employee Skills Distribution',
                        data: Object.values(pieChartData.category),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                        ],
                        borderWidth: 1,
                    },
                ],
            },
        });

    }, [pieChartData]);
    return (
        <div>
            <canvas ref={chartRef} id="myChart" />
        </div>
    )
}


export default PieChart
