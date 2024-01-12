
for (let cell of allCells) {
    cell.addEventListener('blur', (e) => {
        let [activeCell, cellProps] = getActiveCell()
        let enteredData = cell.innerText;
        if(enteredData=== cellProps.value) return

        cellProps.value = enteredData
        // if data modifies remove child from parent relation ,empty formula field and update children with new value
        removeChildFromParentRel(cellProps.formula);
        cellProps.formula = "";
        updateChildrenCell(addressBar.value);
    })
}

const formulaBar = document.querySelector('.formula-bar');

formulaBar.addEventListener('keydown', (e) => {
    let input = formulaBar.value;
    let address = addressBar.value
    if (e.key === 'Enter' && input !== '') {
        const [activeCell, cellProps] = getActiveCell()

        // if change in formula break parent child relation
        if (input !== cellProps.formula) {
            removeChildFromParentRel(cellProps.formula)
        }
        let evaluatedValue = evaluateFormula(input)
        setCellAndCellprops(evaluatedValue, input)
        // add parent child relation
        addChildToParentRel(input)
        updateChildrenCell(address)
    }
})

function evaluateFormula(formula) {
    let encodedFormulla = formula.split(' ')
    for (let i = 0; i < encodedFormulla.length; i++) {
        if (/^[A-Z][1-9]\d{0,2}$/.test(encodedFormulla[i])) {
            const [activeCell, cellProps] = getActiveCell(encodedFormulla[i])
            encodedFormulla[i] = cellProps.value
        }
    }
    formula = encodedFormulla.join(' ')
    return eval(formula)
}

function setCellAndCellprops(value, formula, adress = null) {
    let [activeCell, cellProps] = getActiveCell(adress)
    activeCell.innerText = value;
    cellProps.value = value;
    cellProps.formula = formula;
}

function addChildToParentRel(formula) {
    let childAdress = addressBar.value
    let encodedFormulla = formula.split(' ')
    for (let i = 0; i < encodedFormulla.length; i++) {
        if (/^[A-Z][1-9]\d{0,2}$/.test(encodedFormulla[i])) {
            const [activeCell, cellProps] = getActiveCell(encodedFormulla[i])
            cellProps.children.push(childAdress)
            console.log(sheetDb);
        }
    }
}

function removeChildFromParentRel(formula) {
    let childAdress = addressBar.value
    let encodedFormulla = formula.split(' ')
    for (let i = 0; i < encodedFormulla.length; i++) {
        if (/^[A-Z][1-9]\d{0,2}$/.test(encodedFormulla[i])) {
            const [activeCell, cellProps] = getActiveCell(encodedFormulla[i])
            let idx = cellProps.children.indexOf(childAdress)
            cellProps.children.splice(idx, 1)
        }
    }
}

function updateChildrenCell(parentAddress) {
    const [parentCell, parentCellOrops] = getActiveCell(parentAddress)
    let children = parentCellOrops.children

    for (let i = 0; i < children.length; i++) {
        let childAdress = children[i]
        const [childCell, childCellProps] = getActiveCell(childAdress)
        let formula = childCellProps.formula
        console.log(formula);
        let evaluatedValue = evaluateFormula(formula)
        setCellAndCellprops(evaluatedValue, formula, childAdress)
        updateChildrenCell(childAdress)
    }
}