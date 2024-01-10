let sheetDb = [];

for (let i = 0; i < rows; i++) {
    let sheetRow = [];
    for (let j = 0; j < cols; j++) {
        let cellProps = {
            bold: false,
            italic: false,
            underline: false,
            fontFamily: 'monospace',
            fontSize: '14',
            alignment: 'left',
            fontColor: '#000000',
            bgColor: '#ECF0F1',
        }
        sheetRow.push(cellProps);
    }
    sheetDb.push(sheetRow);
}

// Selectors for cell properties

const bold = document.querySelector('.bold');
const italic = document.querySelector('.italic');
const underlined = document.querySelector('.underlined');
const fontColor = document.querySelector('.font-color-props');
const bgColor = document.querySelector('.background-color-props');
const fontFamily = document.querySelector('.font-family-prop');
const fontSize = document.querySelector('.font-size-prop');
const alignment = document.querySelectorAll('.alignment')
const leftAlign = alignment[0];
const centerAlign = alignment[1];
const rightAlign = alignment[2];

const activeColorProps = '#bcc2be';
const inactiveColorProps = '#ffffff';
// application for two way binding



// Event listeners for cell properties
bold.addEventListener('click', (e) => {
    const [cell, cellProps] = getActiveCell()
    cellProps.bold = !cellProps.bold;
    cell.style.fontWeight = cellProps.bold ? 'bold' : 'normal';
    bold.style.backgroundColor = cellProps.bold ? activeColorProps : inactiveColorProps;
});

italic.addEventListener('click', () => {
    const [cell, cellProps] = getActiveCell()
    cellProps.italic = !cellProps.italic;
    cell.style.fontStyle = cellProps.italic ? 'italic' : 'normal';
    italic.style.backgroundColor = cellProps.italic ? activeColorProps : inactiveColorProps;
});
underlined.addEventListener('click', () => {
    const [cell, cellProps] = getActiveCell()
    cellProps.underline = !cellProps.underline;
    cell.style.textDecoration = cellProps.underline ? 'underline' : 'normal';
    underlined.style.backgroundColor = cellProps.underline ? activeColorProps : inactiveColorProps;
});
fontColor.addEventListener('change', (e) => {
    const [cell, cellProps] = getActiveCell()
    cellProps.fontColor = fontColor.value;
    cell.style.color = cellProps.fontColor;
    fontColor.value = cellProps.fontColor;
});
bgColor.addEventListener('change', () => {
    const [cell, cellProps] = getActiveCell()
    cellProps.bgColor = bgColor.value;
    cell.style.backgroundColor = cellProps.bgColor;
    bgColor.value = cellProps.bgColor;
});
fontFamily.addEventListener('click', () => {
    const [cell, cellProps] = getActiveCell()
    cellProps.fontFamily = fontFamily.value;
    cell.style.fontFamily = cellProps.fontFamily
    fontFamily.value = cellProps.fontFamily;
});
fontSize.addEventListener('click', () => {
    const [cell, cellProps] = getActiveCell()
    cellProps.fontSize = fontSize.value;
    cell.style.fontSize = cellProps.fontSize + 'px';
    fontFamily.value = cellProps.fontSize;
});

alignment.forEach((align) => {
    align.addEventListener('click', (e) => {
        const [cell, cellProps] = getActiveCell()
        const alignValue = e.target.classList[0]
        cellProps.alignment = alignValue;
        cell.style.textAlign = cellProps.alignment;
        switch (alignValue) {
            case 'left':
                leftAlign.style.backgroundColor = activeColorProps;
                rightAlign.style.backgroundColor = inactiveColorProps;
                centerAlign.style.backgroundColor = inactiveColorProps;
                break;
            case 'center':
                leftAlign.style.backgroundColor = inactiveColorProps;
                rightAlign.style.backgroundColor = inactiveColorProps;
                centerAlign.style.backgroundColor = activeColorProps;
                break;
            case 'right':
                leftAlign.style.backgroundColor = inactiveColorProps;
                rightAlign.style.backgroundColor = activeColorProps;
                centerAlign.style.backgroundColor = inactiveColorProps;
                break;
        }
    })
})

const allCells = document.querySelectorAll('.cell');
for (let cell of allCells) {
    addEventListenerToAttachCellProps(cell);
}

function addEventListenerToAttachCellProps(cell) {
    cell.addEventListener('click', (e) => {
        const [_, cellProps] = getActiveCell()
        cell.style.fontWeight = cellProps.bold ? 'bold' : 'normal';
        cell.style.fontStyle = cellProps.italic ? 'italic' : 'normal';
        cell.style.textDecoration = cellProps.underline ? 'underline' : 'normal';
        cell.style.color = cellProps.fontColor;
        cell.style.backgroundColor = cellProps.bgColor;
        cell.style.fontFamily = cellProps.fontFamily;
        cell.style.fontSize = cellProps.fontSize + 'px';
        cell.style.textAlign = cellProps.alignment;


        switch (cellProps.alignment) {
            case 'left':
                leftAlign.style.backgroundColor = activeColorProps;
                rightAlign.style.backgroundColor = inactiveColorProps;
                centerAlign.style.backgroundColor = inactiveColorProps;
                break;
            case 'center':
                leftAlign.style.backgroundColor = inactiveColorProps;
                rightAlign.style.backgroundColor = inactiveColorProps;
                centerAlign.style.backgroundColor = activeColorProps;
                break;
            case 'right':
                leftAlign.style.backgroundColor = inactiveColorProps;
                rightAlign.style.backgroundColor = activeColorProps;
                centerAlign.style.backgroundColor = inactiveColorProps;
                break;
        }
        bold.style.backgroundColor = cellProps.bold ? activeColorProps : inactiveColorProps;
        italic.style.backgroundColor = cellProps.italic ? activeColorProps : inactiveColorProps;
        underlined.style.backgroundColor = cellProps.underline ? activeColorProps : inactiveColorProps;
        fontColor.value = cellProps.fontColor;
        bgColor.value = cellProps.bgColor;
        fontFamily.value = cellProps.fontFamily;
        fontSize.value = cellProps.fontSize;
    })
}

function getActiveCell() {
    let cellAdress = addressBar.value.split(' ');
    let cid = Number(cellAdress[1].charCodeAt(0)) - 65;
    let rid = Number(cellAdress[0]) - 1;
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProps = sheetDb[rid][cid];
    return [cell, cellProps];
}

