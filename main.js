// main.js

// ----- Tab Navigation -----
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    // Remove 'active' from all nav-items
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');

    // Hide all tab-content
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));

    // Show the selected tab
    const href = item.getAttribute('href');
    if (href) {
      document.querySelector(href).classList.remove('hidden');
    }
  });
});

// ----- Dropdowns -----
document.querySelectorAll('.dropdown > button').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const content = btn.nextElementSibling;
    document.querySelectorAll('.dropdown-content').forEach(dc => dc.classList.remove('show'));
    content.classList.toggle('show');
  });
});
window.addEventListener('click', () => {
  document.querySelectorAll('.dropdown-content').forEach(dc => dc.classList.remove('show'));
});

// ----- Chips (Date Range Selectors) -----
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    chip.parentElement.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    // TODO: trigger data reload with selected range
  });
});

// ----- Connected Google Sheet Button -----
document.getElementById('connectSheetBtn')?.addEventListener('click', () => {
  connectToGoogleSheet();
});

// ----- PDF Export Buttons -----
document.getElementById('exportPdfBtn')?.addEventListener('click', () => {
  exportDashboardToPdf();
});
document.getElementById('exportReportBtn')?.addEventListener('click', () => {
  exportReportToPdf();
});

// ----- Report Builder -----
document.querySelectorAll('#availableCharts .add-chart').forEach(btn => {
  btn.addEventListener('click', () => {
    const chartItem = btn.closest('.chart-item');
 if (!chartItem) {
 return; // Exit if chart-item is not found
 }

 const clone = chartItem.cloneNode(true);

 // Find and remove the element that contains the "Add to Report" button
 const addChartButtonContainer = clone.querySelector('.add-chart');
 if (addChartButtonContainer) {
 let elementToRemove = addChartButtonContainer;
 // Traverse up to find a suitable container to remove, e.g., a div or parent element holding the button
 // This part might need adjustment based on your HTML structure
 while (elementToRemove && !elementToRemove.classList.contains('chart-item-actions') && elementToRemove.parentElement) {
 elementToRemove = elementToRemove.parentElement;
 }
 // If we found a container element to remove (and it's not the cloned chart-item itself), remove it
 if (elementToRemove && elementToRemove !== clone) {
 elementToRemove.remove();
 } else {
 // If no specific container found, just remove the button itself as a fallback
 addChartButtonContainer.remove();
 }
 }

 // Also remove any other interactive elements that shouldn't be in the report
 clone.querySelectorAll('button, a, input, select, textarea').forEach(interactiveEl => {
 interactiveEl.style.pointerEvents = 'none'; // Disable interaction
 });
    clone.classList.replace('chart-item', 'report-item');
    clone.querySelector('.add-chart').remove();

    // Add action buttons
    const actions = document.createElement('div');
    actions.className = 'flex';
    actions.innerHTML = `
      <button class="move-up p-1 rounded hover:bg-gray-200 mr-1">
        <span class="material-icon">arrow_upward</span>
      </button>
      <button class="move-down p-1 rounded hover:bg-gray-200 mr-1">
        <span class="material-icon">arrow_downward</span>
      </button>
      <button class="delete-chart p-1 rounded hover:bg-gray-200">
        <span class="material-icon">delete</span>
      </button>
    `;
    clone.appendChild(actions);
    document.getElementById('yourReport').appendChild(clone);

    // Add move/delete handlers
    addReportItemHandlers(clone);
  });
});
function addReportItemHandlers(item) {
  item.querySelector('.move-up').addEventListener('click', () => {
    if (item.previousElementSibling) item.parentNode.insertBefore(item, item.previousElementSibling);
  });
  item.querySelector('.move-down').addEventListener('click', () => {
    if (item.nextElementSibling) item.parentNode.insertBefore(item.nextElementSibling, item);
  });
  item.querySelector('.delete-chart').addEventListener('click', () => {
    item.remove();
  });
}
document.querySelectorAll('#yourReport .report-item').forEach(addReportItemHandlers);

// ----- Preview Report -----
document.getElementById('previewReportBtn')?.addEventListener('click', () => {
  previewReport();
});

// ----- Add to Report Button -----
document.getElementById('addToReportBtn')?.addEventListener('click', () => {
  addSearchConsolePerformanceToReport();
});

// ----- Export Search Console Data -----
document.getElementById('export-search-console-btn')?.addEventListener('click', () => {
  exportSearchConsoleDataToSheet();
});

// ----- Function Implementations for Buttons -----

// Conceptual function to initiate Google Sheets API authorization
function connectToGoogleSheet() {
  console.log('Initiating Google Sheets connection...');
  // This would typically involve:
  // 1. Loading the Google API client library (gapi or similar)
  // 2. Configuring your API key and OAuth Client ID
  // 3. Calling gapi.client.init or similar to initialize the client
  // 4. Calling gapi.auth2.getAuthInstance().signIn() to trigger the OAuth flow
  // You would need to handle the response in a callback function.
  alert('Google Sheets connection logic needs to be implemented using Google API client library.');
}

// Conceptual function to export dashboard to PDF using html2pdf.js
function exportDashboardToPdf() {
  console.log('Exporting dashboard to PDF...');
  const element = document.getElementById('dashboard'); // Assuming your dashboard content is within an element with id 'dashboard'

  if (!element) {
    console.error('Dashboard element not found for PDF export.');
    alert('Could not find dashboard content to export.');
    return;
  }

  // This requires the html2pdf.js library to be included in your HTML.
  // Example usage (conceptual):
  /*
  html2pdf(element, {
    margin: 10,
    filename: 'dashboard-report.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  });
  */
  alert('PDF export functionality requires a library like html2pdf.js and needs to be implemented.');
}

// Conceptual function to export custom report to PDF using html2pdf.js
function exportReportToPdf() {
  console.log('Exporting custom report to PDF...');
  const element = document.getElementById('yourReport'); // Assuming your report content is within an element with id 'yourReport'

  if (!element) {
    console.error('Report element not found for PDF export.');
    alert('Could not find report content to export.');
    return;
  }

  // Similar to dashboard export, requires html2pdf.js or similar.
  /*
  html2pdf(element, {
    margin: 10,
    filename: 'custom-report.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  });
  */
  alert('Custom report export to PDF functionality requires a library like html2pdf.js and needs to be implemented.');
}

// Basic function to preview the report
function previewReport() {
  console.log('Previewing report...');
  // This could involve:
  // - Opening a modal window showing the report content.
  // - Navigating to a new page/route dedicated to report preview.
  // - Simply toggling the visibility of a dedicated preview div.
  const previewArea = document.getElementById('reportPreviewArea'); // Assuming you have an element for preview
  if (previewArea) {
    previewArea.classList.toggle('hidden');
    console.log('Report preview area toggled.');
  } else {
    alert('Report preview area element not found. Preview logic needs implementation.');
  }

  // Log current report items for debugging/development
  const reportItems = document.querySelectorAll('#yourReport .report-item');
  console.log('Current Report Items:', Array.from(reportItems).map(item => item.textContent.substring(0, 50) + '...'));
}

// Conceptual function to add Search Console Performance to report
function addSearchConsolePerformanceToReport() {
  console.log('Adding Search Console Performance to report...');
  // This would involve:
  // 1. Identifying the template or content for Search Console Performance.
  // 2. Cloning or creating that content.
  // 3. Appending it to the #yourReport section.
  // 4. Adding the necessary move/delete handlers using addReportItemHandlers().
  alert('Adding Search Console Performance to custom report functionality needs implementation.');
}

// Basic function to export Search Console data as CSV
function exportSearchConsoleDataToSheet() {
  console.log('Exporting Search Console data...');

  // Example data (replace with actual data retrieval logic)
  const data = [
    ['Query', 'Clicks', 'Impressions', 'CTR', 'Position'],
    ['example query 1', '123', '4567', '2.7%', '8.2'],
    ['example query 2', '45', '1234', '3.6%', '5.5'],
    ['example query 3', '80', '5678', '1.4%', '10.1']
  ];

  const csvContent = data.map(row => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) { // Feature detection
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'search_console_data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    alert('Your browser does not support downloading files directly.');
  }
}

// ----- Dummy Data Loaders (for demo) -----
function loadDashboardStats() {
  document.getElementById('total-users').textContent = '1,234';
  document.getElementById('total-users-change').textContent = '+5%';
  document.getElementById('page-views').textContent = '8,765';
  document.getElementById('page-views-change').textContent = '+3%';
  document.getElementById('avg-session').textContent = '2m 34s';
  document.getElementById('avg-session-change').textContent = '-1%';
  document.getElementById('bounce-rate').textContent = '47%';
  document.getElementById('bounce-rate-change').textContent = '-2%';
}
function loadSearchConsoleStats() {
  document.getElementById('total-clicks').textContent = '678';
  document.getElementById('total-clicks-change').textContent = '+7%';
  document.getElementById('total-impressions').textContent = '12,345';
  document.getElementById('total-impressions-change').textContent = '+1%';
  document.getElementById('avg-ctr').textContent = '2.4%';
  document.getElementById('avg-ctr-change').textContent = '-0.3%';
  document.getElementById('avg-position').textContent = '9.1';
  document.getElementById('avg-position-change').textContent = '-0.4';
}
function loadAnalyticsStats() {
  document.getElementById('active-users').textContent = '345';
  document.getElementById('active-users-change').textContent = '+2%';
  document.getElementById('sessions').textContent = '1,234';
  document.getElementById('sessions-change').textContent = '+1%';
  document.getElementById('conversion-rate').textContent = '3.7%';
  document.getElementById('conversion-rate-change').textContent = '-0.2%';
  document.getElementById('new-users').textContent = '98';
  document.getElementById('new-users-change').textContent = '+4%';
}
function loadTables() {
  // Search Console Table
  document.getElementById('search-console-table').querySelector('tbody').innerHTML = `
    <tr>
      <td>example query</td>
      <td>123</td>
      <td>4567</td>
      <td>2.7%</td>
      <td>8.2</td>
    </tr>
  `;
  // Detailed Query Table
  document.getElementById('detailed-query-table').querySelector('tbody').innerHTML = `
    <tr>
      <td>keyword 1</td>
      <td>12</td>
      <td>345</td>
      <td>3.4%</td>
      <td>7.8</td>
      <td>/page-1</td>
    </tr>
  `;
}

// ----- Chart Placeholders (real charts need integration) -----
function loadCharts() {
  document.getElementById('traffic-overview-chart').innerHTML = `<svg width="100%" height="100%" viewBox="0 0 800 300"><circle cx="400" cy="150" r="80" fill="#6750A4" opacity="0.2"/><text x="400" y="150" text-anchor="middle" font-size="16" fill="#757575">Demo Chart</text></svg>`;
  document.getElementById('top-pages-chart').innerHTML = `<svg width="100%" height="100%" viewBox="0 0 800 300"><rect x="300" y="100" width="200" height="100" fill="#B58392" opacity="0.2"/><text x="400" y="150" text-anchor="middle" font-size="16" fill="#757575">Demo Chart</text></svg>`;
  // Add similar for other charts...
}

// ----- Initial Load -----
document.addEventListener('DOMContentLoaded', () => {
  loadDashboardStats();
  loadSearchConsoleStats();
  loadAnalyticsStats();
  loadTables();
  loadCharts();
});
