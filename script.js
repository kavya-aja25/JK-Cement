document.addEventListener('DOMContentLoaded', function () {

    /**
     * Initializes the main spending report line chart using Chart.js.
     * @param {string} canvasId The ID of the canvas element for the chart.
     */
    function initSpendingChart(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) {
            console.warn(`Chart canvas with id "${canvasId}" not found.`);
            return;
        }
        const ctx = canvas.getContext('2d');

        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, 'rgba(255, 122, 122, 0.7)');
        gradient.addColorStop(1, 'rgba(255, 122, 122, 0)');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Dec 01', 'Dec 02', 'Dec 03', 'Dec 04', 'Dec 05', 'Dec 06'],
                datasets: [{
                    label: 'Spending',
                    data: [1800, 2200, 1700, 3490, 2800, 2100],
                    borderColor: '#FF7A7A',
                    backgroundColor: gradient,
                    fill: true,
                    borderWidth: 3,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointBackgroundColor: '#FF7A7A'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { display: false }, x: { display: false } },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        enabled: true,
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: context => `$${new Intl.NumberFormat().format(context.parsed.y)}`
                        }
                    }
                }
            }
        });
    }

    /**
     * Initializes the credit score doughnut chart using Chart.js.
     * @param {string} canvasId The ID of the canvas element for the chart.
     */
    function initCreditScoreChart(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) {
            console.warn(`Chart canvas with id "${canvasId}" not found.`);
            return;
        }
        const ctx = canvas.getContext('2d');

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [678, 1000 - 678], // The score from your HTML is 678
                    backgroundColor: ['#4A90E2', '#E9ECEF'], // Blue for score, light gray for remaining
                    borderWidth: 0,
                    borderRadius: 20,
                    spacing: 5 // Adds a small gap between segments
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '80%',
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                }
            }
        });
    }

    /**
     * Sets up a click animation handler for statistics cards.
     */
    function setupStatCardAnimations() {
        const statCards = document.querySelectorAll('.stat-card');
        if (statCards.length === 0) return;

        statCards.forEach(card => {
            card.addEventListener('click', () => {
                card.classList.add('clicked');
                // This duration should match the animation-duration in your CSS
                setTimeout(() => card.classList.remove('clicked'), 400);
            });
        });
    }

    /**
     * Sets up a real-time search filter for a list of navigation items.
     * @param {string} inputId The ID of the search input element.
     * @param {string} listId The ID of the list element (<ul>) to filter.
     */
    function setupSearchFilter(inputId, listId) {
        const searchInput = document.getElementById(inputId);
        const itemList = document.getElementById(listId);

        if (!searchInput || !itemList) {
            console.warn(`Search filter elements (input: #${inputId}, list: #${listId}) not found.`);
            return;
        }
        const items = itemList.getElementsByTagName('li');

        searchInput.addEventListener('input', function() {
            const filter = searchInput.value.toLowerCase();
            for (let i = 0; i < items.length; i++) {
                // Check the 'aria-label' or text content for a match
                const link = items[i].querySelector('a');
                const textValue = link.getAttribute('aria-label') || link.innerText || '';
                if (textValue.toLowerCase().indexOf(filter) > -1) {
                    items[i].style.display = "";
                } else {
                    items[i].style.display = "none";
                }
            }
        });
    }

    // ===== Main Execution Block =====
    // This runs after the entire HTML page has been loaded.
    document.addEventListener('DOMContentLoaded', function () {
        // Initialize each component by calling its setup function.
        initSpendingChart('spendingChart');
        initCreditScoreChart('creditScoreChart');
        setupStatCardAnimations();
        setupSearchFilter('mainSearchInput', 'sidebarNavList');
    });
});