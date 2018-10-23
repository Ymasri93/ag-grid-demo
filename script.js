const draft = { month: 'mar', year: 2018 };
let year = '';
const draftMonth = draft.month + draft.year.toString().substring(2);
const years = ['16', '17', '18', '19', '20', '21', '22',];
const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const fiscalYearStart = 'jan';
const fiscalYearEnd = 'dec';

const objCENTER = {};
const centerKey = 'text-align';
objCENTER[centerKey] = 'center';
key = 'text-align';
objCENTER[key] = 'center';
let cellStyle = {};
// By creating the template on our own we can add the arrows (for the years) and change the text here / TESTING PHASE
const template =
    `<div class="ag-cell-label-container" role="presentation">
    <img class="img-click" onclick="scrollToPrevYear()" src="images/prev.png"/>
    <img class="img-click" onclick="scrollToNextYear()" src="images/next.png"/>
    <span ref="eText" class="ag-header-cell-text" role="columnheader"></span> 
 </div>`;
let columnDefs = [{
    headerName: 'Year',
    field: 'yearAndName',
    pinned: 'left',
    width: 400,
    headerComponentParams: { template },
    cellStyle,
    cellRendererSelector: function (params) {
        const moodDetails = {
            component: 'moodCellRenderer'
        };
        if (params.data.type === 'CUS') {
            return moodDetails;
        }
        else {
            //if we return null then no custom cell renderer will be called
            return null;
        }
    }
}];
for (const year of years) {
    for (let month of months) {
        const objectStyle = {};
        const centerKey = 'text-align';
        objectStyle[centerKey] = 'center';
        const textAlignKey = 'text-align';
        objectStyle[textAlignKey] = 'center';
        const paddingTopKey = 'padding-top';
        objectStyle[paddingTopKey] = '15px'
        let cellStyle = {};
        cellStyle = Object.assign(cellStyle, objectStyle);
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
            headerName: month.toUpperCase() + year,
            field: month + year,
            cellStyle, width: 80,
            editable: true,
            headerComponentParams: { template: headerTemplate },
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
for (let i = 0; i <= 5; i++) {
    const row = { yearAndName: createShitWord(), type: (Math.random() < .50) ? 'CUS' : 'GRO' };
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
    rowHeight: 77,
    enableRangeSelection: true,
    suppressHorizontalScroll: true,
    rowSelection: 'multiple',
    components: {
        moodCellRenderer: MoodCellRenderer,
    },
    onGridReady: function () {
        year = draft.year;
        gridOptions.api.ensureColumnVisible(fiscalYearEnd + year.toString().substring(2));
    }
};

function scrollToNextYear() {
    let yearNumber = parseInt(year);
    console.log(yearNumber);
    if (yearNumber < 2022) {
        yearNumber++;
        year = yearNumber.toString();
        gridOptions.api.ensureColumnVisible(fiscalYearEnd + year.substring(2));
    }
}

function scrollToPrevYear() {
    let yearNumber = parseInt(year);
    console.log(yearNumber);
    if (yearNumber > 2016) {
        yearNumber--;
        year = yearNumber.toString();
        gridOptions.api.ensureColumnVisible(fiscalYearStart + year.substring(2));
    }
}

function MoodCellRenderer() {
}

MoodCellRenderer.prototype.init = function (params) {
    this.eGui = document.createElement('span');
    if (params.value !== "" || params.value !== undefined || params.value !== null) {
        var imgForMood = 'https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/images/smiley.png';
        this.eGui.innerHTML = '<img width="20px" src="' + imgForMood + '" />';
    }
};

MoodCellRenderer.prototype.getGui = function () {
    return this.eGui;
};

const eGridDiv = document.querySelector('#myGrid');


new agGrid.Grid(eGridDiv, gridOptions);