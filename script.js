const draft = { month: 'feb', year: 2016 };
const draftMonth = draft.month + draft.year.toString().substring(2);
const years = ['16', '17', '18', '19', '20', '21', '22',];
const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const objCENTER = {};
const centerKey = 'text-align';
objCENTER[centerKey] = 'center';
key = 'text-align';
objCENTER[key] = 'center';
let cellStyle = {};
// cellStyle = {...cellStyle, width: '400px'}
// By creating the template on our own we can add the arrows (for the years) and change the text here / TESTING PHASE
let columnDefs = [{
    headerName: 'Year', field: 'yearAndName', pinned: 'left', width: 400, headerComponentParams: {
        template:
            `<div class="ag-cell-label-container" role="presentation"> 
            <span ref="eText" class="ag-header-cell-text" role="columnheader"></span> 
        </div>`
    }, cellStyle,
}];
for (const year of years) {
    for (let month of months) {
        const objCENTER = {};
        const centerKey = 'text-align';
        objCENTER[centerKey] = 'center';
        key = 'text-align';
        objCENTER[key] = 'center';
        let cellStyle = {};
        cellStyle = Object.assign(cellStyle, objCENTER);
        // By creating the template on our own we can add the styling we want to the active draft month header / TESTING PHASE
        let headerTemplate = `<div class="ag-cell-label-container" role="presentation">
        <span ref="eText" class="ag-header-cell-text" role="columnheader"></span> 
        </div>`;
        if (month + year === draftMonth) {
            headerTemplate = `<div class="ag-cell-label-container active-month-header-container" role="presentation">
            <span class="active-month-dot">.</span>
            <span ref="eText" class="ag-header-cell-text" role="columnheader"></span> 
            </div>`;
        }

        columnDefs.push({
            headerName: month.toUpperCase(), field: month + year, cellStyle, editable: true, headerComponentParams: {
                template:
                    headerTemplate
            }
        })
    }
}

function createShitWord() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
const rowData = [];
for (let i = 0; i <= 30; i++) {
    const row = { yearAndName: createShitWord() };
    for (const year of years) {
        for (const month of months) {
            row[month + year] = Math.floor(Math.random() * (1000 - 100) + 100);
        }
    }
    rowData.push(row);
}
const gridOptions = {
    columnDefs,
    rowData,
    enableRangeSelection: true,
    // suppressHorizontalScroll: true,
    rowSelection: 'multiple'
};

const eGridDiv = document.querySelector('#myGrid');


new agGrid.Grid(eGridDiv, gridOptions);