const years = ['16', '17', '18', '19', '20', '21', '22',];
const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
let columnDefs = [{ headerName: '', field: 'yearAndName' , pinned: 'left'}];
for (const year of years) {
    for (let month of months) {
        columnDefs.push({ headerName: month.toUpperCase(), field: month + year })
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
    rowSelection: 'multiple'
};

const eGridDiv = document.querySelector('#myGrid');

new agGrid.Grid(eGridDiv, gridOptions);