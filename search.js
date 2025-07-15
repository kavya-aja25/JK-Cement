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
                <td>${item["Employee ID"]}</td>
                <td>${item["Employee"]}</td>
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
                <td>${item["Person Band before PMS"]}</td>
                <td>${item["Location"]}</td>
                <td>${item["Country/Region"]}</td>
            `
            searchTableBody.appendChild(row)
        })
        
    }

    cityLocation.addEventListener("change", filterHandler)
    countryRegion.addEventListener("change", filterHandler)


    data.forEach((item) => {
        const row = document.createElement("tr")
        row.innerHTML = `
            <td>${item["Employee ID"]}</td>
            <td>${item["Employee"]}</td>
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
            <td>${item["Person Band before PMS"]}</td>
            <td>${item["Location"]}</td>
            <td>${item["Country/Region"]}</td>
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

});