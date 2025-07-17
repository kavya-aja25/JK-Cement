// Wait for the DOM to fully load before initializing charts
document.addEventListener('DOMContentLoaded', async function () {

    const res = await fetch("/emp-id.json")
    const data = await res.json()
    console.log(data)
    const searchInput = document.getElementById("mainSearchInput")
    const searchTableBody = document.getElementById("searchTableBody")
    const cityLocation = document.getElementById("cityLocation")
    const countryRegion = document.getElementById("countryRegion")

    cityLocation.innerHTML = `<option value="">City/Location</option>`
    countryRegion.innerHTML = `<option value="">Country/Region</option>` 


    const cityLocationOptions = []
    const countryRegionOptions = []
    data.forEach((item) => {
        const cityLocationOption = item["City/Location"]
        const countryRegionOption = item["Country/Region"]
        if (!cityLocationOptions.includes(cityLocationOption)) {
            cityLocationOptions.push(cityLocationOption)
        }
        if (!countryRegionOptions.includes(countryRegionOption)) {
            countryRegionOptions.push(countryRegionOption)
        }
    })
    cityLocationOptions.forEach((option) => {
        cityLocation.innerHTML += `<option value="${option}">${option}</option>`
    })
    countryRegionOptions.forEach((option) => {
        countryRegion.innerHTML += `<option value="${option}">${option}</option>`
    })

    const filterHandler =(e)=>{
        
        const cityLocationValue = cityLocation.value
        const countryRegionValue = countryRegion.value
        let filteredData = data
        if(cityLocationValue){
            filteredData = filteredData.filter((item)=>item["City/Location"]===cityLocationValue)
        }
        if(countryRegionValue){
            filteredData = filteredData.filter((item)=>item["Country/Region"]===countryRegionValue)
        }
        searchTableBody.innerHTML = ""
        filteredData.forEach((item)=>{
            const row = document.createElement("tr")
            row.innerHTML = `
        <td>${item["Employee"]}</td>
        <td>${item["Employee ID"]}</td>
        <td>${item["Report Name"]}</td>
        <td>${item["Expense Type"]}</td>
        <td>${item["Report ID"]}</td>
        <td>${item["Approval Status"]}</td>
        <td>${item["Payment Status"]}</td>
        <td>${item["Report Date"]}</td>
        <td>${item["Transaction Date"]}</td>
        <td>${item["Total Approved Amount"]}</td>
        <td>${item["City/Location"]}</td>
        <td>${item["Payment Type"]}</td>
        <td>${item["Approved Amount"]}</td>
        <td>${item["Submit Date"]}</td>
        <td>${item["Employee Name"]}</td>
        <td>${item["Report Start Date"]}</td>
        <td>${item["Report End Date"]}</td>
        <td>${item["Currency"]}</td>
        <td>${item["Report Total"]}</td>
        <td>${item["Receipt Status"]}</td>
        <td>${item["Cash Advance Return Received"]}</td>
        <td>${item["Amount Due Employee"]}</td>
        <td>${item["Report Id"]}</td>
        <td>${item["Approved by Delegate"]}</td>
        <td>${item["Exception Approved"]}</td>
        <td>${item["Expense Report Auditing Status"]}</td>
        <td>${item["Has Cleared Exceptions"]}</td>
        <td>${item["Person Band before PMS"]}</td>
        <td>${item["Business Unit"]}</td>
        <td>${item["Location"]}</td>
        <td>${item["Gender"]}</td>
        <td>${item["Logon ID"]}</td>
        <td>${item["Email Address"]}</td>
        <td>${item["Country/Region"]}</td>
        <td>${item["Travel Rule Class"]}</td>
        <td>${item["Employee_Manager"]}</td>
        <td>${item["Employee ID_Manager"]}</td>
        <td>${item["Report Name_Manager"]}</td>
        <td>${item["Expense Type_Manager"]}</td>
        <td>${item["Report ID_Manager"]}</td>
        <td>${item["Approval Status_Manager"]}</td>
        <td>${item["Payment Status_Manager"]}</td>
        <td>${item["Report Date_Manager"]}</td>
        <td>${item["Transaction Date_Manager"]}</td>
        <td>${item["Total Approved Amount_Manager"]}</td>
        <td>${item["City/Location_Manager"]}</td>
        <td>${item["Payment Type_Manager"]}</td>
        <td>${item["Approved Amount_Manager"]}</td>
        <td>${item["Submit Date_Manager"]}</td>
        <td>${item["Report Start Date_Manager"]}</td>
        <td>${item["Report End Date_Manager"]}</td>
        <td>${item["Currency_Manager"]}</td>
        <td>${item["Report Total_Manager"]}</td>
        <td>${item["Receipt Status_Manager"]}</td>
        <td>${item["Cash Advance Return Received_Manager"]}</td>
        <td>${item["Amount Due Employee_Manager"]}</td>
        <td>${item["Report Id_Manager"]}</td>
        <td>${item["Approved by Delegate_Manager"]}</td>
        <td>${item["Exception Approved_Manager"]}</td>
        <td>${item["Expense Report Auditing Status_Manager"]}</td>
        <td>${item["Has Cleared Exceptions_Manager"]}</td>
        <td>${item["Person Band before PMS_Manager"]}</td>
        <td>${item["Business Unit_Manager"]}</td>
        <td>${item["Location_Manager"]}</td>
        <td>${item["Gender_Manager"]}</td>
        <td>${item["Logon ID_Manager"]}</td>
        <td>${item["Email Address_Manager"]}</td>
        <td>${item["Country/Region_Manager"]}</td>
        <td>${item["Default Expense Report Approver_Manager"]}</td>
        <td>${item["Default Expense Report Approver ID_Manager"]}</td>
        <td>${item["Default Cash Advance Approver_Manager"]}</td>
        <td>${item["Default Cash Advance Approver ID_Manager"]}</td>
        <td>${item["Default Authorization Request Approver_Manager"]}</td>
        <td>${item["Default Authorization Request Approver ID_Manager"]}</td>
        <td>${item["Default Travel Request Approver_Manager"]}</td>
        <td>${item["Default Travel Request Approver ID_Manager"]}</td>
        <td>${item["BI Manager_Manager"]}</td>
        <td>${item["BI Manager ID_Manager"]}</td>
        <td>${item["Travel Employee Manager_Manager"]}</td>
        <td>${item["Travel Employee Manager ID_Manager"]}</td>
        <td>${item["Travel Rule Class_Manager"]}</td>
        <td>${item["Difference"]}</td>

            `
            searchTableBody.appendChild(row)
        })
        
    }

    cityLocation.addEventListener("change", filterHandler)
    countryRegion.addEventListener("change", filterHandler)


    data.forEach((item) => {
        const row = document.createElement("tr")
        row.innerHTML = `
        <td>${item["Employee"]}</td>
        <td>${item["Employee ID"]}</td>
        <td>${item["Report Name"]}</td>
        <td>${item["Expense Type"]}</td>
        <td>${item["Report ID"]}</td>
        <td>${item["Approval Status"]}</td>
        <td>${item["Payment Status"]}</td>
        <td>${item["Report Date"]}</td>
        <td>${item["Transaction Date"]}</td>
        <td>${item["Total Approved Amount"]}</td>
        <td>${item["City/Location"]}</td>
        <td>${item["Payment Type"]}</td>
        <td>${item["Approved Amount"]}</td>
        <td>${item["Submit Date"]}</td>
        <td>${item["Employee Name"]}</td>
        <td>${item["Report Start Date"]}</td>
        <td>${item["Report End Date"]}</td>
        <td>${item["Currency"]}</td>
        <td>${item["Report Total"]}</td>
        <td>${item["Receipt Status"]}</td>
        <td>${item["Cash Advance Return Received"]}</td>
        <td>${item["Amount Due Employee"]}</td>
        <td>${item["Report Id"]}</td>
        <td>${item["Approved by Delegate"]}</td>
        <td>${item["Exception Approved"]}</td>
        <td>${item["Expense Report Auditing Status"]}</td>
        <td>${item["Has Cleared Exceptions"]}</td>
        <td>${item["Person Band before PMS"]}</td>
        <td>${item["Business Unit"]}</td>
        <td>${item["Location"]}</td>
        <td>${item["Gender"]}</td>
        <td>${item["Logon ID"]}</td>
        <td>${item["Email Address"]}</td>
        <td>${item["Country/Region"]}</td>
        <td>${item["Travel Rule Class"]}</td>
        <td>${item["Employee_Manager"]}</td>
        <td>${item["Employee ID_Manager"]}</td>
        <td>${item["Report Name_Manager"]}</td>
        <td>${item["Expense Type_Manager"]}</td>
        <td>${item["Report ID_Manager"]}</td>
        <td>${item["Approval Status_Manager"]}</td>
        <td>${item["Payment Status_Manager"]}</td>
        <td>${item["Report Date_Manager"]}</td>
        <td>${item["Transaction Date_Manager"]}</td>
        <td>${item["Total Approved Amount_Manager"]}</td>
        <td>${item["City/Location_Manager"]}</td>
        <td>${item["Payment Type_Manager"]}</td>
        <td>${item["Approved Amount_Manager"]}</td>
        <td>${item["Submit Date_Manager"]}</td>
        <td>${item["Report Start Date_Manager"]}</td>
        <td>${item["Report End Date_Manager"]}</td>
        <td>${item["Currency_Manager"]}</td>
        <td>${item["Report Total_Manager"]}</td>
        <td>${item["Receipt Status_Manager"]}</td>
        <td>${item["Cash Advance Return Received_Manager"]}</td>
        <td>${item["Amount Due Employee_Manager"]}</td>
        <td>${item["Report Id_Manager"]}</td>
        <td>${item["Approved by Delegate_Manager"]}</td>
        <td>${item["Exception Approved_Manager"]}</td>
        <td>${item["Expense Report Auditing Status_Manager"]}</td>
        <td>${item["Has Cleared Exceptions_Manager"]}</td>
        <td>${item["Person Band before PMS_Manager"]}</td>
        <td>${item["Business Unit_Manager"]}</td>
        <td>${item["Location_Manager"]}</td>
        <td>${item["Gender_Manager"]}</td>
        <td>${item["Logon ID_Manager"]}</td>
        <td>${item["Email Address_Manager"]}</td>
        <td>${item["Country/Region_Manager"]}</td>
        <td>${item["Default Expense Report Approver_Manager"]}</td>
        <td>${item["Default Expense Report Approver ID_Manager"]}</td>
        <td>${item["Default Cash Advance Approver_Manager"]}</td>
        <td>${item["Default Cash Advance Approver ID_Manager"]}</td>
        <td>${item["Default Authorization Request Approver_Manager"]}</td>
        <td>${item["Default Authorization Request Approver ID_Manager"]}</td>
        <td>${item["Default Travel Request Approver_Manager"]}</td>
        <td>${item["Default Travel Request Approver ID_Manager"]}</td>
        <td>${item["BI Manager_Manager"]}</td>
        <td>${item["BI Manager ID_Manager"]}</td>
        <td>${item["Travel Employee Manager_Manager"]}</td>
        <td>${item["Travel Employee Manager ID_Manager"]}</td>
        <td>${item["Travel Rule Class_Manager"]}</td>
        <td>${item["Difference"]}</td>
        `
        searchTableBody.appendChild(row)
    })

    searchInput.addEventListener("input", function (e) {
        const searchValue = e.target.value.toLowerCase()
        const rows = searchTableBody.getElementsByTagName("tr")
        Array.from(rows).forEach((row) => {
            const cells = row.getElementsByTagName("td")
            let match = false
            Array.from(cells).forEach((cell) => {
                if (cell.textContent.toLowerCase().includes(searchValue)) {
                    match = true
                }
            })
            if (match) {
                row.style.display = ""
            } else {
                row.style.display = "none"
            }
        })
    })
    // Get the button and the dropdown content
const filterButton = document.getElementById('filter-toggle-btn');
const filterDropdown = document.getElementById('filter-dropdown');

// --- Toggles the dropdown ---
function toggleFilterDropdown() {
    filterDropdown.classList.toggle('show');
}

// Event listener for the filter button click
filterButton.addEventListener('click', function(event) {
    // This stops the click from immediately being caught by the 'window' click listener
    event.stopPropagation(); 
    toggleFilterDropdown();
});

// --- Closes the dropdown if the user clicks outside of it ---
window.addEventListener('click', function(event) {
    // Check if the dropdown is open AND if the click was outside the button/dropdown
    if (filterDropdown.classList.contains('show')) {
        // .closest() checks if the clicked element (event.target) is inside our .filter-container
        if (!event.target.closest('.filter-container')) {
            filterDropdown.classList.remove('show');
        }
    }
});

});