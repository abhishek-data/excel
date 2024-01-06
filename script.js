let rows = 100;
let cols = 26;

let addressColumnContainer = document.querySelector('.address-column-conatiner')
let addressRowContainer = document.querySelector('.address-row-conatiner')
let cellsContainer = document.querySelector('.cells-container')
let addressBar = document.querySelector('.address-bar')

for (let i = 0; i < rows; i++) {
    let addressCol = document.createElement('div')
    addressCol.setAttribute('class', 'address-column-cell')
    addressCol.innerText = i + 1;
    addressColumnContainer.appendChild(addressCol)
}

for (let i = 0; i < cols; i++) {
    let addressRow = document.createElement('div')
    addressRow.setAttribute('class', 'address-row-cell')
    addressRow.innerText = String.fromCharCode(65 + i);
    addressRowContainer.appendChild(addressRow)
}

for (let i = 0; i < rows; i++) {
    const rowCont = document.createElement('div');
    rowCont.setAttribute('class', 'row-container')
    for (let j = 0; j < cols; j++) {
        const cell = document.createElement('div')
        cell.setAttribute('class', 'cell');
        cell.setAttribute('contentEditable', 'true');
        cell.addEventListener('click', () =>{
            addressBar.value = `${i+1} ${String.fromCharCode(65+j)}`
        })
        rowCont.appendChild(cell)
    }
    cellsContainer.appendChild(rowCont);
}