// Wait for the DOM to fully load before initializing charts
document.addEventListener('DOMContentLoaded',async function () {

    const res = await fetch("/emp-id.json")
    const data = await res.json()
    console.log(data)
    // Helper function to generate random data
    const generateRandomData = (count, min, max) => {
        const data = [];
        for (let i = 0; i < count; i++) {
            data.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return data;
    };

//  NEW SALES TREND CHART (replaces comboChart)
// ===================================================================
const salesTrendCtx = document.getElementById('comboChart').getContext('2d');

// Helper function to create the custom HTML tooltip
const getOrCreateTooltip = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div#chartjs-tooltip');

    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'chartjs-tooltip';
        tooltipEl.innerHTML = '<table></table>';
        chart.canvas.parentNode.appendChild(tooltipEl);
    }
    return tooltipEl;
};

// The function that draws the custom tooltip
const externalTooltipHandler = (context) => {
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);

    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
    }

    // Set Tooltip Text
    if (tooltip.body) {
        const titleLines = tooltip.title || [];
        const bodyLines = tooltip.body.map(b => b.lines);

        let innerHtml = '';
        
        titleLines.forEach(function(title) {
            innerHtml += '<div class="tooltip-date">' + title + '</div>';
        });

        bodyLines.forEach(function(body, i) {
            const price = body[0];
            innerHtml += '<div class="tooltip-price">' + price + '</div>';
        });

        tooltipEl.innerHTML = innerHtml;
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
};


const salesTrendChart = new Chart(salesTrendCtx, {
    type: 'line',
    data: {
        labels: ['Dec 01', 'Dec 02', 'Dec 03', 'Dec 04', 'Dec 05', 'Dec 06'],
        datasets: [{
            label: 'Revenue',
            data: [1500, 2000, 1600, 3490, 2200, 2100],
            fill: true, // This is crucial for the area gradient
            borderColor: '#f78b7b',
            // Create the beautiful gradient fill
            backgroundColor: function(context) {
                const chart = context.chart;
                const { ctx, chartArea } = chart;

                if (!chartArea) { return null; }
                const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                gradient.addColorStop(0, 'rgba(247, 139, 123, 0)');
                gradient.addColorStop(1, 'rgba(247, 139, 123, 0.4)');
                return gradient;
            },
            tension: 0.4, // This makes the line smooth and curved
            pointBackgroundColor: '#f78b7b',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#f78b7b',
            pointRadius: 5,
            pointHoverRadius: 8
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            // Hide the default legend
            legend: {
                display: false,
            },
            // Enable our custom HTML tooltip
            tooltip: {
                enabled: false, // Disable default tooltip
                position: 'nearest',
                external: externalTooltipHandler
            }
        },
        scales: {
            y: {
                ticks: {
                    // Format the y-axis labels to show a dollar sign
                    callback: function(value, index, values) {
                        return '$' + value;
                    }
                },
                grid: {
                    color: '#f0f0f0' // Light grey grid lines
                }
            },
            x: {
                grid: {
                    display: false // Hide vertical grid lines for a cleaner look
                }
            }
        }
    }
});

    // ===== 2. Horizontal Bar Chart =====
    const horizontalCtx = document.getElementById('horizontalBarChart').getContext('2d');
    const horizontalBarChart = new Chart(horizontalCtx, {
        type: 'bar',
        data: {
            labels: ['Kamlesh', 'Pravinkumar', 'Sukhvinder', 'Agrawal Ankish', 'Ali Shafik', 'Arora Rakshit'],
            datasets: [{
                label: 'Expenses (in thousands)',
                data: generateRandomData(6, 100, 500),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y', // This makes the bar chart horizontal
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });


    // ===== 5. Simple Bar Chart =====
    const barCtx = document.getElementById('barChart').getContext('2d');
    const barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [{
                label: 'Units Produced (in millions)',
                data: generateRandomData(4, 10, 50),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    // need on more bar graph that shows the Manage Vs Expense Type
    const barCtx2 = document.getElementById('barChart2').getContext('2d');
    const barChart2 = new Chart(barCtx2, {
        type: 'bar',
        data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [{
                label: 'Units Produced (in millions)',
                data: generateRandomData(4, 10, 50),
                backgroundColor: 'rgba(97, 104, 230, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
});