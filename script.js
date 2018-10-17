const years = ['16', '17', '18', '19', '20', '21', '22',];
const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const objCENTER = {};
const centerKey = 'text-align';
objCENTER[centerKey] = 'center';
key = 'text-align';
objCENTER[key] = 'center';
let objBorderLeft = { 'box-shadow': '-.5px 0 0 #000' };
let objBorderRight = { 'box-shadow': '-1.2px 0 0 #000' };
let cellStyle = {};
cellStyle = Object.assign(cellStyle, objCENTER);
cellStyle = Object.assign(cellStyle, objBorderLeft, objBorderRight);
// By creating the template on our own we can add the arrows (for the years) and change the text here / TESTING PHASE
let columnDefs = [{
    headerName: 'Year', field: 'yearAndName', pinned: 'left', headerComponentParams: {
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
        let objBorderLeft = { 'box-shadow': '-.5px 0 0 #000' };
        let objBorderRight = { 'box-shadow': '-1.2px 0 0 #000' };
        if (month === 'jan') {
            objBorderLeft = { 'box-shadow': '0px solid #000' };
            objBorderRight = { 'box-shadow': '-1.2px 0 0 #000' };
        }
        let cellStyle = {};
        cellStyle = Object.assign(cellStyle, objCENTER);
        cellStyle = Object.assign(cellStyle, objBorderLeft, objBorderRight);
        // By creating the template on our own we can add the styling we want to the active draft month header / TESTING PHASE
        columnDefs.push({
            headerName: month.toUpperCase(), field: month + year, cellStyle, headerComponentParams: {
                template:
                    `<div class="ag-cell-label-container" role="presentation"> 
                <span ref="eText" class="ag-header-cell-text" role="columnheader"></span> 
            </div>`}
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