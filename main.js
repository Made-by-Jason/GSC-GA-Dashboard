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
  alert('Connect to Google Sheet (not implemented)');
});

// ----- PDF Export Buttons -----
document.getElementById('exportPdfBtn')?.addEventListener('click', () => {
  alert('Export dashboard to PDF (not implemented)');
});
document.getElementById('exportReportBtn')?.addEventListener('click', () => {
  alert('Export custom report to PDF (not implemented)');
});

// ----- Report Builder -----
document.querySelectorAll('#availableCharts .add-chart').forEach(btn => {
  btn.addEventListener('click', () => {
    const chartItem = btn.closest('.chart-item');
    const clone = chartItem.cloneNode(true);
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
  alert('Preview report (not implemented)');
});

// ----- Add to Report Button -----
document.getElementById('addToReportBtn')?.addEventListener('click', () => {
  alert('Add Search Console Performance to custom report (not implemented)');
});

// ----- Export Search Console Data -----
document.getElementById('export-search-console-btn')?.addEventListener('click', () => {
  alert('Export Search Console data to Sheet (not implemented)');
});

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
