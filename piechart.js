document.addEventListener('DOMContentLoaded',async function () {
    const res = await fetch("/employee-claim.json")
    const data = await res.json()
    console.log(data)

    let beforepms = {}
    let beforepmsTotal = 0
    data.forEach((item) => {
        const value = item["Person Band before PMS"]
        if(beforepms[value]===undefined){
            beforepms[value]=1
        }
        else{
            beforepms[value]++
        }
        beforepmsTotal++

    })
    console.log(beforepms)


    // ===== Chart 1: Payment Status Vs Exp_diff =====
    const paymentStatusCtx = document.getElementById('paymentStatusChart').getContext('2d');
    const paymentStatusChart = new Chart(paymentStatusCtx, {
        type: 'pie',
        data: {
            labels: ['Payment Confirmed', 'Financial Posting Failed', 'Sent for Payment', 'Not Paid'],
            datasets: [{
                label: 'Payment Status',
                data: [99.5, 0.22, 0.21, 0.06], 
                backgroundColor: ['#ff0c69', '#365ff4', '#6aff07', '#fffb00'],
                borderWidth: 4,
                borderColor: '#fff',
                hoverOffset: 15 // Makes the slice pop out more on hover
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right', // <-- LEGEND ON THE RIGHT
                    labels: {
                        padding: 20, // Adds space between chart and legend
                        boxWidth: 15,
                        font: { size: 12 }
                    }
                }
            }
        }
    });

    // ===== Chart 2: Exception Approved Vs Exp_Diff =====
    const claimTypeCtx = document.getElementById('claimTypeChart').getContext('2d');
    const claimTypeChart = new Chart(claimTypeCtx, {
        type: 'pie',
        data: {
            labels: ['Yes', 'No'],
            datasets: [{
                label: 'Exception Approved',
                data: [51.73, 48.27],
                backgroundColor: ['#FF6384', '#FFCE56'],
                borderWidth: 2,
                borderColor: '#fff',
                hoverOffset: 15 // Enhanced hover effect
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right', // <-- LEGEND ON THE RIGHT
                    labels: {
                        padding: 20,
                        boxWidth: 15,
                        font: { size: 12 }
                    }
                }
            }
        }
    });

    // ===== Chart 3: Payment Type Vs Exp_Diff =====
    const approvalRateCtx = document.getElementById('approvalRateChart').getContext('2d');
    const approvalRateChart = new Chart(approvalRateCtx, {
        type: 'pie',
        data: {
            labels: ['Self', 'Company Paid'],
            datasets: [{
                label: 'Payment Type',
                data: [99.59, 0.41],
                backgroundColor: ['#4CAF50', '#F44336'],
                borderWidth: 2,
                borderColor: '#fff',
                hoverOffset: 15 // Enhanced hover effect
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right', // <-- LEGEND ON THE RIGHT
                    labels: {
                        padding: 20,
                        boxWidth: 15,
                        font: { size: 12 }
                    }
                }
            }
        }
    });

    // ===== Chart 4: Distribution by Junior Employee Band (Donut) =====
    const juniorBandDonutCtx = document.getElementById('juniorBandDonutChart').getContext('2d');
    const juniorBandDonutChart = new Chart(juniorBandDonutCtx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(beforepms),
            datasets: [{
                    data: Object.values(beforepms).map(val=>val/beforepmsTotal),
                backgroundColor: ['#264653', '#2a9d8f', '#e9c46a', '#deff69ff','#4CAF50', '#c6515fff','#00b7ffff', '#2c2a9dff', '#ff4810ff','#954cafff', '#f436e7ff' ],
                borderWidth: 3,
                borderColor: '#fff',
                hoverOffset: 15 // Enhanced hover effect
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right', // <-- LEGEND ON THE RIGHT
                    labels: {
                        padding: 20,
                        boxWidth: 15,
                        font: { size: 12 }
                    }
                }
            }
        }
    });

});