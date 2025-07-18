document.addEventListener('DOMContentLoaded', async function () {

    // --- CONFIGURATION & STATE VARIABLES ---
    const rowsPerPage = 10;
    let currentPage = 1;
    let allData = [];           // Will hold the original, unmodified data from the JSON file.
    let currentViewData = [];   // Will hold the data after filtering/searching.

    // --- DOM ELEMENT REFERENCES ---
    const searchInput = document.getElementById("mainSearchInput");
    const searchTableBody = document.getElementById("searchTableBody");
    const cityLocation = document.getElementById("cityLocation");
    const countryRegion = document.getElementById("countryRegion");
    const paginationContainer = document.getElementById('pagination-container');
    const downloadLink = document.getElementById('download-link');

    // --- CORE DISPLAY & PAGINATION FUNCTIONS ---

    /**
     * Renders a specific page of data into the table.
     * @param {Array} data - The dataset to display (the filtered data).
     * @param {number} page - The page number to display.
     */
    function displayPage(data, page) {
        searchTableBody.innerHTML = '';
        page--; // Adjust for zero-based array indexing

        const start = rowsPerPage * page;
        const end = start + rowsPerPage;
        const paginatedItems = data.slice(start, end);

        for (const item of paginatedItems) {
            const row = document.createElement("tr");
            // This is the correct row structure for your real data
            row.innerHTML = `
                <td>${item["Employee"] || ''}</td>
                <td>${item["Employee ID"] || ''}</td>
                <td>${item["Report Name"] || ''}</td>
                <td>${item["Expense Type"] || ''}</td>
                <td>${item["Report ID"] || ''}</td>
                <td>${item["Approval Status"] || ''}</td>
                <td>${item["Payment Status"] || ''}</td>
                <td>${item["Report Date"] || ''}</td>
                <td>${item["Transaction Date"] || ''}</td>
                <td>${item["Total Approved Amount"] || ''}</td>
                <td>${item["City/Location"] || ''}</td>
                <td>${item["Payment Type"] || ''}</td>
                <td>${item["Approved Amount"] || ''}</td>
                <td>${item["Submit Date"] || ''}</td>
                <td>${item["Employee Name"] || ''}</td>
                <td>${item["Report Start Date"] || ''}</td>
                <td>${item["Report End Date"] || ''}</td>
                <td>${item["Currency"] || ''}</td>
                <td>${item["Report Total"] || ''}</td>
                <td>${item["Receipt Status"] || ''}</td>
                <td>${item["Cash Advance Return Received"] || ''}</td>
                <td>${item["Amount Due Employee"] || ''}</td>
                <td>${item["Report Id"] || ''}</td>
                <td>${item["Approved by Delegate"] || ''}</td>
                <td>${item["Exception Approved"] || ''}</td>
                <td>${item["Expense Report Auditing Status"] || ''}</td>
                <td>${item["Has Cleared Exceptions"] || ''}</td>
                <td>${item["Person Band before PMS"] || ''}</td>
                <td>${item["Business Unit"] || ''}</td>
                <td>${item["Location"] || ''}</td>
                <td>${item["Gender"] || ''}</td>
                <td>${item["Logon ID"] || ''}</td>
                <td>${item["Email Address"] || ''}</td>
                <td>${item["Country/Region"] || ''}</td>
                <td>${item["Travel Rule Class"] || ''}</td>
                <td>${item["Employee_Manager"] || ''}</td>
                <td>${item["Employee ID_Manager"] || ''}</td>
                <td>${item["Report Name_Manager"] || ''}</td>
                <td>${item["Expense Type_Manager"] || ''}</td>
                <td>${item["Report ID_Manager"] || ''}</td>
                <td>${item["Approval Status_Manager"] || ''}</td>
                <td>${item["Payment Status_Manager"] || ''}</td>
                <td>${item["Report Date_Manager"] || ''}</td>
                <td>${item["Transaction Date_Manager"] || ''}</td>
                <td>${item["Total Approved Amount_Manager"] || ''}</td>
                <td>${item["City/Location_Manager"] || ''}</td>
                <td>${item["Payment Type_Manager"] || ''}</td>
                <td>${item["Approved Amount_Manager"] || ''}</td>
                <td>${item["Submit Date_Manager"] || ''}</td>
                <td>${item["Report Start Date_Manager"] || ''}</td>
                <td>${item["Report End Date_Manager"] || ''}</td>
                <td>${item["Currency_Manager"] || ''}</td>
                <td>${item["Report Total_Manager"] || ''}</td>
                <td>${item["Receipt Status_Manager"] || ''}</td>
                <td>${item["Cash Advance Return Received_Manager"] || ''}</td>
                <td>${item["Amount Due Employee_Manager"] || ''}</td>
                <td>${item["Report Id_Manager"] || ''}</td>
                <td>${item["Approved by Delegate_Manager"] || ''}</td>
                <td>${item["Exception Approved_Manager"] || ''}</td>
                <td>${item["Expense Report Auditing Status_Manager"] || ''}</td>
                <td>${item["Has Cleared Exceptions_Manager"] || ''}</td>
                <td>${item["Person Band before PMS_Manager"] || ''}</td>
                <td>${item["Business Unit_Manager"] || ''}</td>
                <td>${item["Location_Manager"] || ''}</td>
                <td>${item["Gender_Manager"] || ''}</td>
                <td>${item["Logon ID_Manager"] || ''}</td>
                <td>${item["Email Address_Manager"] || ''}</td>
                <td>${item["Country/Region_Manager"] || ''}</td>
                <td>${item["Default Expense Report Approver_Manager"] || ''}</td>
                <td>${item["Default Expense Report Approver ID_Manager"] || ''}</td>
                <td>${item["Default Cash Advance Approver_Manager"] || ''}</td>
                <td>${item["Default Cash Advance Approver ID_Manager"] || ''}</td>
                <td>${item["Default Authorization Request Approver_Manager"] || ''}</td>
                <td>${item["Default Authorization Request Approver ID_Manager"] || ''}</td>
                <td>${item["Default Travel Request Approver_Manager"] || ''}</td>
                <td>${item["Default Travel Request Approver ID_Manager"] || ''}</td>
                <td>${item["BI Manager_Manager"] || ''}</td>
                <td>${item["BI Manager ID_Manager"] || ''}</td>
                <td>${item["Travel Employee Manager_Manager"] || ''}</td>
                <td>${item["Travel Employee Manager ID_Manager"] || ''}</td>
                <td>${item["Travel Rule Class_Manager"] || ''}</td>
                <td>${item["Difference"] || ''}</td>
            `;
            searchTableBody.appendChild(row);
        }
    }

    /**
     * Creates and sets up the pagination controls based on the currently filtered data.
     * @param {Array} data - The filtered dataset.
     */
    function setupPagination(data) {
        paginationContainer.innerHTML = '';
        const pageCount = Math.ceil(data.length / rowsPerPage);

        if (pageCount <= 1) return; // Don't show pagination if there's only one page

        const prevButton = document.createElement('button');
        prevButton.classList.add('pagination-btn');
        prevButton.id = 'prev-btn';
        prevButton.innerText = 'Previous';
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                // *** CORRECTED: Use `currentViewData` so pagination works on filtered results
                displayPage(currentViewData, currentPage);
                updatePaginationUI();
            }
        });
        paginationContainer.appendChild(prevButton);

        for (let i = 1; i <= pageCount; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.classList.add('page-link');
            pageLink.innerText = i;
            pageLink.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                // *** CORRECTED: Use `currentViewData` so pagination works on filtered results
                displayPage(currentViewData, currentPage);
                updatePaginationUI();
            });
            paginationContainer.appendChild(pageLink);
        }

        const nextButton = document.createElement('button');
        nextButton.classList.add('pagination-btn');
        nextButton.id = 'next-btn';
        nextButton.innerText = 'Next';
        nextButton.addEventListener('click', () => {
            if (currentPage < pageCount) {
                currentPage++;
                // *** CORRECTED: Use `currentViewData` so pagination works on filtered results
                displayPage(currentViewData, currentPage);
                updatePaginationUI();
            }
        });
        paginationContainer.appendChild(nextButton);

        updatePaginationUI();
    }

    /**
     * Updates the UI of the pagination controls.
     */
    function updatePaginationUI() {
        // *** CORRECTED: Calculate page count based on `currentViewData`
        const pageCount = Math.ceil(currentViewData.length / rowsPerPage);
        const prevButton = document.getElementById('prev-btn');
        const nextButton = document.getElementById('next-btn');

        if (prevButton) prevButton.classList.toggle('disabled', currentPage === 1);
        if (nextButton) nextButton.classList.toggle('disabled', currentPage === pageCount);

        document.querySelectorAll('.page-link').forEach(link => {
            link.classList.remove('active');
            if (parseInt(link.innerText) === currentPage) {
                link.classList.add('active');
            }
        });
    }

    // --- CENTRAL DATA UPDATE & FILTERING FUNCTION ---
    function updateTableView() {
        const searchValue = searchInput.value;
        const cityLocationValue = cityLocation.value;
        const countryRegionValue = countryRegion.value;

        // Apply filters to the master 'allData' array
        currentViewData = allData.filter(item => 
            (!searchValue || Object.values(item).some(val => String(val).toLowerCase().includes(searchValue.toLowerCase()))) &&
            (!cityLocationValue || item["City/Location"] === cityLocationValue) &&
            (!countryRegionValue || item["Country/Region"] === countryRegionValue)
        );

        currentPage = 1; // Reset to page 1 on every new filter

        // Update download link based on active filters
        const isFilterOrSearchActive = searchValue || cityLocationValue || countryRegionValue;
        if (isFilterOrSearchActive && currentViewData.length > 0) {
            const queryParams = new URLSearchParams();
            if (searchValue) queryParams.set('search', searchValue);
            if (cityLocationValue) queryParams.set('city', cityLocationValue);
            if (countryRegionValue) queryParams.set('region', countryRegionValue);

            downloadLink.href = `download.html?${queryParams.toString()}`;
            downloadLink.classList.remove('hidden');
        } else {
            downloadLink.classList.add('hidden');
        }

        // Re-render the table and pagination controls
        setupPagination(currentViewData);
        displayPage(currentViewData, currentPage);
    }

    // --- INITIALIZATION ---
    async function initialize() {
        try {
            const res = await fetch("/emp-id.json");
            allData = await res.json();
        } catch (error) {
            console.error("Failed to load data:", error);
            searchTableBody.innerHTML = `<tr><td colspan="83">Error loading data. Please try again later.</td></tr>`;
            return;
        }
        
        // Populate filter dropdowns
        const cityLocationOptions = [...new Set(allData.map(item => item["City/Location"]))].sort();
        cityLocationOptions.forEach(option => { if (option) cityLocation.innerHTML += `<option value="${option}">${option}</option>`; });
        const countryRegionOptions = [...new Set(allData.map(item => item["Country/Region"]))].sort();
        countryRegionOptions.forEach(option => { if (option) countryRegion.innerHTML += `<option value="${option}">${option}</option>`; });

        // Set up event listeners to trigger the central update function
        searchInput.addEventListener("input", updateTableView);
        cityLocation.addEventListener("change", updateTableView);
        countryRegion.addEventListener("change", updateTableView);

        // Perform the initial render
        updateTableView();

        // UI LOGIC for the filter dropdown popup
        const filterButton = document.getElementById('filter-toggle-btn');
        const filterDropdown = document.getElementById('filter-dropdown');
        filterButton.addEventListener('click', function(event) { event.stopPropagation(); filterDropdown.classList.toggle('show'); });
        window.addEventListener('click', function(event) { if (filterDropdown.classList.contains('show') && !event.target.closest('.filter-container')) { filterDropdown.classList.remove('show'); } });
    }

    // Start the application
    initialize();
});