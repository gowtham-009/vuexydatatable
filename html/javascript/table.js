let currentpage = 1;
let no_of_rows = 10; // Default rows per page
let globaldata = [];
let filteredData = [];
let totalPages = 1;
let sortDirection = {};

//let localhost='192.168.0.101'
// Fetch Table Data
const fetchTableData = async () => {
  document.getElementById('table_loading').style.display = 'block';
  const api = '/html/jsondata/table.json';

  try {
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    globaldata = await response.json();
    filteredData = globaldata; // Initially, show all data
    totalPages = Math.ceil(filteredData.length / no_of_rows);
    renderTable(filteredData);
    renderPagination();
  } catch (error) {
    document.getElementById('error').classList.remove('hidden');
    document.getElementById('error_msg').textContent = error.message;
  } finally {
   setTimeout(() => {
    document.getElementById('table_loading').style.display = 'none';
    document.getElementById('tablecard').classList.remove('hidden');
   }, 3000);
  }
};

// Initialize Fetch
fetchTableData();

// Search Filter
document.getElementById('search-input').addEventListener('input', (event) => {
  const searchText = event.target.value.toLowerCase();
  filteredData = globaldata.filter(item =>
    item.stockname.toLowerCase().includes(searchText) ||
    item.quantity.toString().includes(searchText)
  );

  totalPages = Math.ceil(filteredData.length / no_of_rows);
  currentpage = 1;
  renderTable(filteredData);
  renderPagination();
});

// Update Rows Per Page
document.getElementById('datarows').addEventListener('change', (event) => {
  no_of_rows = parseInt(event.target.value, 10);
  totalPages = Math.ceil(filteredData.length / no_of_rows);
  currentpage = 1;
  renderTable(filteredData);
  renderPagination();
});
document.querySelectorAll('th').forEach((header) => {
  header.addEventListener('click', () => {
    const columnName = header.dataset.column;
    const icon = header.querySelector('i');

    // Toggle sort direction
    sortDirection[columnName] = sortDirection[columnName] === 'asc' ? 'desc' : 'asc';

    // Reset all icons
    document.querySelectorAll('th i').forEach((icon) => {
      icon.className = 'fa-solid fa-arrow-up'; // Default is up
    });

    // Update the icon direction based on the current sort direction
    if (sortDirection[columnName] === 'asc') {
      icon.className = 'fa-solid fa-arrow-down'; // Down for ascending
    } else {
      icon.className = 'fa-solid fa-arrow-up'; // Up for descending
    }

    // Sort and render the table
    sortTableData(columnName, sortDirection[columnName]);
  });
});

const sortTableData = (column, direction) => {
  filteredData.sort((a, b) => {
    const valA = a[column] || '';
    const valB = b[column] || '';

    if (!isNaN(valA) && !isNaN(valB)) {
      return direction === 'asc' ? valA - valB : valB - valA;
    }
    return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
  });

  renderTable(filteredData);
};


// Render Table
const renderTable = (dataValues) => {

  const datalen = dataValues.length;
  document.getElementById('no_of_rows').textContent = datalen;

  const tableBody = document.getElementById('tablebody');
  tableBody.innerHTML = '';

  const startIdx = (currentpage - 1) * no_of_rows;
  const endIdx = Math.min(startIdx + no_of_rows, datalen);
  const pageData = dataValues.slice(startIdx, endIdx);

  document.getElementById('availablestock').textContent = `${datalen} Stocks Available`;
  document.getElementById('show').textContent = `${startIdx + 1} - ${endIdx}`;
  
  
  

  pageData.forEach(item => {

  let shotckhide
  let quantityhide
  let avghide
  let ltphide
  let invhide
  let mkthide
  let overallhide
  let days
    let checkstatus = document.querySelectorAll('input[type="checkbox"]');
  checkstatus.forEach((check) => {
 if (check.checked) {
    if(check.value=='stockname'){
      shotckhide='hidden'
    }
    if(check.value=='quantity'){
      quantityhide='hidden'
    }
    if(check.value=='avgprice'){
      avghide='hidden'
    }
    if(check.value=='ltp'){
      ltphide='hidden'
    }
    if(check.value=='invamt'){
      invhide='hidden'
    }
    if(check.value=='mktval'){
      mkthide='hidden'
    }
    if(check.value=='overall'){
      overallhide='hidden'
    }
    if(check.value=='days'){
      days='hidden'
    }
  
 }
});

    const row = document.createElement('tr');
    const overallClass = item.overall.includes('-') ? 'text-red-500' : 'text-green-500';
    const daysClass = item.days.includes('-') ? 'text-red-500' : 'text-green-500';
    row.innerHTML = `
      <td class="stockname ${shotckhide} whitespace-nowrap text-left px-3 py-2 text-md text-gray-500">${item.stockname}</td>
      <td class="quantity ${quantityhide} whitespace-nowrap text-right px-3 py-2 text-sm text-gray-500" style="border-right: 2px solid rgb(189, 189, 189); border-style: dashed;">${item.quantity}</td>
      <td class="avgprice ${avghide} whitespace-nowrap text-right px-3 py-2 text-sm text-gray-500">${Number(item.avgprice).toFixed(2)}</td>
      <td class="ltp ${ltphide} whitespace-nowrap text-right px-3 py-2 text-sm text-gray-500" style="border-right: 2px solid rgb(189, 189, 189); border-style: dashed;">${Number(item.ltp)}</td>
      <td class="invamt ${invhide} whitespace-nowrap text-right px-3 py-2 text-sm text-gray-500">${item.invamt}</td>
      <td class="mktval ${mkthide} whitespace-nowrap text-right px-3 py-2 text-sm text-gray-500" style="border-right: 2px solid rgb(189, 189, 189); border-style: dashed;">${item.mktval}</td>
      <td class="overall ${overallhide} whitespace-nowrap text-right px-3 py-2 text-sm">
        <span class="${overallClass}">${item.overall}</span>
        <br>
        <span>${item.overallpluss}</span>
      </td>
      <td class="days ${days} whitespace-nowrap text-right px-3 py-2 text-sm">
        <span class="${daysClass}">${item.days}</span>
        <br>
        <span>${item.daysplus}</span>
      </td>
    `;
    tableBody.appendChild(row);
  });
};

const renderPagination = () => {
  const pageNumbersContainer = document.getElementById('page-numbers');
  pageNumbersContainer.innerHTML = '';

  const visiblePages = 3; // Number of visible pages at the beginning
  const lastPage = totalPages; // Assuming totalPages is defined elsewhere

  // Create Previous button
  const prevButton = document.createElement('button');
  prevButton.textContent = 'Previous';
  prevButton.classList.add('px-4', 'py-2', 'text-sm', 'bg-gray-200', 'rounded-md', 'mr-2');
  prevButton.disabled = currentpage === 1;
  prevButton.addEventListener('click', () => {
    if (currentpage > 1) {
      currentpage--;
      renderTable(filteredData);
      renderPagination();
    }
  });
  pageNumbersContainer.appendChild(prevButton);

  // Create buttons for the first few pages (1, 2, 3)
  for (let i = 1; i <= Math.min(visiblePages, totalPages); i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.classList.add('px-4', 'py-2', 'text-sm', 'bg-gray-200', 'rounded-md', 'mr-2');
    if (i === currentpage) {
      pageButton.classList.add('bg-indigo-500', 'text-blue-500');
    }
    pageButton.addEventListener('click', () => {
      currentpage = i;
      renderTable(filteredData);
      renderPagination();
    });
    pageNumbersContainer.appendChild(pageButton);
  }

  // Add ellipsis if currentpage > visiblePages
  if (currentpage > visiblePages) {
    const ellipsis = document.createElement('span');
    ellipsis.textContent = '...';
    ellipsis.classList.add('px-2', 'text-gray-500');
    pageNumbersContainer.appendChild(ellipsis);

    // Add active page button if it's not part of the first visible pages
    if (currentpage > visiblePages && currentpage < totalPages) {
      const activePageButton = document.createElement('button');
      activePageButton.textContent = currentpage;
      activePageButton.classList.add('px-4', 'py-2', 'text-sm', 'bg-indigo-500', 'rounded-md', 'text-white', 'mr-2');
      activePageButton.addEventListener('click', () => {
        renderTable(filteredData);
        renderPagination();
      });
      pageNumbersContainer.appendChild(activePageButton);

      // Add ellipsis again if there's a gap before the last page
      if (currentpage + 1 < totalPages) {
        const ellipsisAfterActive = document.createElement('span');
        ellipsisAfterActive.textContent = '...';
        ellipsisAfterActive.classList.add('px-2', 'text-gray-500');
        pageNumbersContainer.appendChild(ellipsisAfterActive);
      }
    }
  }

  // Add Last Page button if not already part of visible pages
  if (totalPages > visiblePages) {
    const lastPageButton = document.createElement('button');
    lastPageButton.textContent = totalPages;
    lastPageButton.classList.add('px-4', 'py-2', 'text-sm', 'bg-gray-200', 'rounded-md', 'mr-2');
    if (currentpage === totalPages) {
      lastPageButton.classList.add('bg-indigo-500', 'text-blue-600');
    }
    lastPageButton.addEventListener('click', () => {
      currentpage = totalPages;
      renderTable(filteredData);
      renderPagination();
    });
    pageNumbersContainer.appendChild(lastPageButton);
  }

  // Create Next button
  const nextButton = document.createElement('button');
  nextButton.textContent = 'Next';
  nextButton.classList.add('px-4', 'py-2', 'text-sm', 'bg-gray-200', 'rounded-md');
  nextButton.disabled = currentpage === totalPages;
  nextButton.addEventListener('click', () => {
    if (currentpage < totalPages) {
      currentpage++;
      renderTable(filteredData);
      renderPagination();
    }
  });
  pageNumbersContainer.appendChild(nextButton);
};


// Date Range Filter
const applyDateFilter = () => {
  const fromDate = document.getElementById('date-from').value;
  const toDate = document.getElementById('date-to').value;

  const fromTimestamp = new Date(fromDate);
  const toTimestamp = new Date(toDate);

  filteredData = globaldata.filter(item => {
    const itemDate = new Date(item.date).getTime();
    if (fromTimestamp && itemDate < fromTimestamp) return false;
    if (toTimestamp && itemDate > toTimestamp) return false;
    return true;
  });

  totalPages = Math.ceil(filteredData.length / no_of_rows);
  currentpage = 1;
  renderTable(filteredData);
  renderPagination();
};

document.getElementById('date-from').addEventListener('change', applyDateFilter);
document.getElementById('date-to').addEventListener('change', () => {
  applyDateFilter();
  document.getElementById('datemodal').classList.add('hidden');
});

function datebtn(){
  document.getElementById('datemodal').classList.remove('hidden')
  document.getElementById('daterangebtn').classList.add('ring-indigo-500', 'bg-indigo-50','text-blue-500')
  document.getElementById('ogaintbtn').classList.remove('ring-indigo-500', 'bg-indigo-50','text-blue-500')
  document.getElementById('todayobtn').classList.remove('ring-indigo-500', 'bg-indigo-50','text-blue-500')
  document.getElementById('monthbtn').classList.remove('ring-indigo-500', 'bg-indigo-50','text-blue-500')
  document.getElementById('weekbtn').classList.remove('ring-indigo-500', 'bg-indigo-50','text-blue-500')
}
document.getElementById('datemodalclose').addEventListener('click', function(){
  window.location.href='stocktable.html'
})

function filters(){
  document.getElementById('filter_modal').classList.remove('hidden')
}

const positiveltpfilter = () => {
 
  filteredData = globaldata.filter(item => item.ltp > 0);

  filteredData.sort((a, b) => a.ltp - b.ltp);

  totalPages = Math.ceil(filteredData.length / no_of_rows);
  currentpage = 1;

  renderTable(filteredData);
  renderPagination();
  document.getElementById('filter_modal').classList.add('hidden');
};

const negativeltpfilter = () => {
 
  filteredData = globaldata.filter(item => item.ltp > 0);

  filteredData.sort((a, b) =>  b.ltp - a.ltp);

  totalPages = Math.ceil(filteredData.length / no_of_rows);
  currentpage = 1;

  renderTable(filteredData);
  renderPagination();
  document.getElementById('filter_modal').classList.add('hidden');
};

const stockprofit = () => {
  
  filteredData = globaldata.filter(item => parseFloat(item.overall) > 0);
  totalPages = Math.ceil(filteredData.length / no_of_rows);
  currentpage = 1;

  renderTable(filteredData);
  renderPagination();
  document.getElementById('filter_modal').classList.add('hidden');
};

const stockloss = () => {
 
  filteredData = globaldata.filter(item => parseFloat(item.overall) < 0);
  totalPages = Math.ceil(filteredData.length / no_of_rows);
  currentpage = 1;

  renderTable(filteredData);
  renderPagination();
  document.getElementById('filter_modal').classList.add('hidden');
};


const smallcap = () => {
  
  filteredData = globaldata.filter(item => parseFloat(item.mktval) <= 5000);
  totalPages = Math.ceil(filteredData.length / no_of_rows);
  currentpage = 1;

  renderTable(filteredData);
  renderPagination();
  document.getElementById('filter_modal').classList.add('hidden');
};

const largecap = () => {
 
  filteredData = globaldata.filter(item => parseFloat(item.mktval) >= 20000);
  totalPages = Math.ceil(filteredData.length / no_of_rows);
  currentpage = 1;

  renderTable(filteredData);
  renderPagination();
  document.getElementById('filter_modal').classList.add('hidden');
};

const midcap = () => {
  
  filteredData = globaldata.filter(item => parseFloat(item.mktval) > 5000 && parseFloat(item.mktval) < 20000);
  totalPages = Math.ceil(filteredData.length / no_of_rows);
  currentpage = 1;

  renderTable(filteredData);
  renderPagination();
  document.getElementById('filter_modal').classList.add('hidden');
};


// Add event listeners to each checkbox for column visibility toggling
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', function () {
    const columnClass = this.value; // Get the column class from the checkbox value
    const headerCell = document.querySelector(`th[data-column="${columnClass}"]`); // Select the corresponding header cell
    const columnCells = document.querySelectorAll(`td.${columnClass}`); // Select all cells in the column body

    // Toggle header visibility
    if (headerCell) {
      headerCell.style.display = this.checked ? 'none' : '';
    }

    // Toggle body cells visibility
    columnCells.forEach(cell => {
      cell.style.display = this.checked ? 'none' : '';
    });
  });
});

// Uncheck all checkboxes when 'uncheck' button is clicked
document.getElementById('uncheck').addEventListener('click', function() {
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;  // Uncheck each checkbox
    const columnClass = checkbox.value;
    const headerCell = document.querySelector(`th[data-column="${columnClass}"]`);
    const columnCells = document.querySelectorAll(`td.${columnClass}`);

    // Reset visibility for header and body cells
    if (headerCell) {
      headerCell.style.display = ''; // Make header visible again
    }

    columnCells.forEach(cell => {
      cell.style.display = ''; // Make body cells visible again
    });
  });
});







document.getElementById('export-btn').addEventListener('click', () => {
  
  let checkstatus = document.querySelectorAll('input[type="checkbox"]');
  let excludeColumns = [];

  // Collect columns to exclude based on checkbox values
  checkstatus.forEach((check) => {
    if (check.checked) {
      if (check.value === 'stockname') {
        excludeColumns.push('StockName');
      }

      if (check.value === 'quantity') {
        excludeColumns.push('Quantity');
      }

      if (check.value === 'avgprice') {
        excludeColumns.push('AvgPrice');
      }
      if (check.value === 'ltp') {
        excludeColumns.push('LTP');
      }

      if (check.value === 'invamt') {
        excludeColumns.push('InvAmount');
      }
      if (check.value === 'invamt') {
        excludeColumns.push('InvAmount');
      }

      if (check.value === 'date') {
        excludeColumns.push('Date');
      }
      if (check.value === 'mktval') {
        excludeColumns.push('MktValue');
      }
      if (check.value === 'overall') {
        excludeColumns.push('Overall');
        excludeColumns.push('OverallPlus');
      }

      if (check.value === 'days') {
        excludeColumns.push('Days');
        excludeColumns.push('DaysPlus');
      }



      // Add more conditions if needed for other columns
    }
  });

 

  //Filter the data based on excluded columns
  const filteredExportData = filteredData.map(item => {
    let filteredItem = {};
    // Only include fields that are not in excludeColumns
    if (!excludeColumns.includes('StockName')) filteredItem.StockName = item.stockname;
    if (!excludeColumns.includes('Quantity')) filteredItem.Quantity = item.quantity;
    if (!excludeColumns.includes('AvgPrice')) filteredItem.AvgPrice = Number(item.avgprice).toFixed(2);
    if (!excludeColumns.includes('LTP')) filteredItem.LTP = Number(item.ltp);
    if (!excludeColumns.includes('InvAmount')) filteredItem.InvAmount = item.invamt;
    if (!excludeColumns.includes('Date')) filteredItem.Date = item.date;
    if (!excludeColumns.includes('MktValue')) filteredItem.MktValue = item.mktval;
    if (!excludeColumns.includes('Overall')) filteredItem.Overall = item.overall;
    if (!excludeColumns.includes('OverallPlus')) filteredItem.OverallPlus = item.overallpluss;
    if (!excludeColumns.includes('Days')) filteredItem.Days = item.days;
    if (!excludeColumns.includes('DaysPlus')) filteredItem.DaysPlus = item.daysplus;
    return filteredItem;
  });

  // Convert the filtered data to a worksheet
  const worksheet = XLSX.utils.json_to_sheet(filteredExportData);

  // Create a workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Stock Data');

  // Export the workbook as an Excel file
  XLSX.writeFile(workbook, 'Stock_Data.xlsx');
});


document.getElementById('clearall').addEventListener('click', function(){
  window.location.href='stocktable.html'
})

