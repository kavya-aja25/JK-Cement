document.addEventListener('DOMContentLoaded', function () {

    // Get references to the HTML elements we need to interact with
    const statusElement = document.getElementById('download-status');
    const manualDownloadBtn = document.getElementById('manual-download-btn');
    const backBtn = document.querySelector('.back-btn'); // Assuming this is the 'Back to Search' link

    // Set initial text for the buttons
    manualDownloadBtn.textContent = 'Download Now';
    backBtn.textContent = 'Back to Search';

    /**
     * Converts an array of JavaScript objects into a CSV-formatted string.
     * @param {Array<Object>} dataArray The data to be converted.
     * @returns {string|null} A string in CSV format, or null if the input is empty.
     */
    function convertToCSV(dataArray) {
        if (!dataArray || dataArray.length === 0) {
            return null;
        }

        const headers = Object.keys(dataArray[0]);

        // Helper function to handle values that might break CSV formatting (like commas or quotes)
        const escapeCSVValue = (value) => {
            // If the value is null or undefined, return an empty string
            const strValue = String(value ?? ''); 
            // If the value contains a comma, a newline, or a double quote, it needs to be escaped
            if (strValue.includes(',') || strValue.includes('"') || strValue.includes('\n')) {
                // Escape double quotes by doubling them, then wrap the entire string in double quotes
                return `"${strValue.replace(/"/g, '""')}"`;
            }
            return strValue;
        };

        // Create an array of CSV rows from the data
        const csvRows = dataArray.map(row =>
            headers.map(fieldName => escapeCSVValue(row[fieldName])).join(',')
        );

        // Add the header row to the top of the array
        csvRows.unshift(headers.join(','));

        // Join all rows with a newline character to form the final CSV string
        return csvRows.join('\n');
    }

    /**
     * Takes a CSV string and triggers a file download in the browser.
     * @param {string} csvContent The CSV data to download.
     * @param {string} filename The desired name for the downloaded file.
     */
    function downloadCSV(csvContent, filename) {
        // Create a 'Blob' which is a file-like object of immutable, raw data
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        
        // Create a temporary link element
        const link = document.createElement("a");

        // Create a temporary URL for the Blob
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        
        // Make the link invisible and add it to the page
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        
        // Programmatically click the link to trigger the download
        link.click();
        
        // Clean up by removing the link and revoking the temporary URL
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    /**
     * The main function that orchestrates the download process.
     */
    function processDownload() {
        // Retrieve the filtered data (as a JSON string) from sessionStorage
        const jsonData = sessionStorage.getItem('filteredDataForDownload');

        // --- Handle the case where no data is found ---
        if (!jsonData) {
            statusElement.textContent = "No data to download. Please return to the search page and select your data.";
            manualDownloadBtn.disabled = true;
            manualDownloadBtn.style.cursor = 'not-allowed';
            manualDownloadBtn.style.opacity = '0.6';
            return; // Stop the function
        }

        try {
            // Parse the JSON string back into a JavaScript array
            const data = JSON.parse(jsonData);
            const csvContent = convertToCSV(data);

            if (csvContent) {
                // Create a dynamic filename with the current date
                // const filename = `jk_cement_claims_${new Date().toISOString().slice(0, 10)}.csv`;
                // downloadCSV(csvContent, filename);
                
                // Update the UI to give feedback
                statusElement.textContent = "Download started! If it didn't work, please use the button below.";
                manualDownloadBtn.textContent = "Download Again";
            } else {
                 statusElement.textContent = "Could not generate a download file from the provided data.";
            }

        } catch (error) {
            console.error("Error processing download:", error);
            statusElement.textContent = "An error occurred while preparing your download file.";
        }
    }

    // Add a click event listener to the manual download button
    manualDownloadBtn.addEventListener('click', processDownload);

    // Automatically trigger the download process when the page finishes loading
    processDownload();

});