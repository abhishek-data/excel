
for (let cell of allCells) {
    cell.addEventListener('blur', (e) => {
        let [activeCell, cellProps] = getActiveCell()
        let enteredData = activeCell.innerText;
        if(enteredData=== cellProps.value) return

        cellProps.value = enteredData
        // if data modifies remove child from parent relation ,empty formula field and update children with new value
        removeChildFromParentRel(cellProps.formula);
        cellProps.formula = "";
        updateChildrenCell(addressBar.value);
    })
}

const formulaBar = document.querySelector('.formula-bar');

formulaBar.addEventListener('keydown', async (e) => {
    let inputFormula = formulaBar.value;
    let address = addressBar.value
    if (e.key === 'Enter' && inputFormula !== '') {
        const [activeCell, cellProps] = getActiveCell()

        // if change in formula break parent child relation
        if (inputFormula !== cellProps.formula) {
            removeChildFromParentRel(cellProps.formula)
        }

        addChildToGraphComponent(inputFormula, address);
        // Check formula is cyclic or not, then only evaluate
        // True -> cycle, False -> Not cyclic
        // console.log(graphComponentMatrix);
        let cycleResponse = isGraphCylic(graphComponentMatrix);
        if (cycleResponse) {
            // alert("Your formula is cyclic");
            let response = confirm("Your formula is cyclic. Do you want to trace your path?");
            while (response === true) {
                // Keep on tracking color until user is sartisfied
                await isGraphCylicTracePath(graphComponentMatrix, cycleResponse); // I want to complete full  iteration of color tracking, so I will attach wait here also
                response = confirm("Your formula is cyclic. Do you want to trace your path?");
            }

            removeChildFromGraphComponent(inputFormula, address);
            return;
        }
        let evaluatedValue = evaluateFormula(inputFormula)
        setCellAndCellprops(evaluatedValue, inputFormula)
        // add parent child relation
        addChildToParentRel(inputFormula)
        updateChildrenCell(address)
    }
})

function addChildToGraphComponent(formula, childAddress) {
    let [crid, ccid] = decodeRIDCIDFromAddress(childAddress);
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [prid, pcid] = decodeRIDCIDFromAddress(encodedFormula[i]);
            // B1: A1 + 10
            // rid -> i, cid -> j
            graphComponentMatrix[prid][pcid].push([crid, ccid]);
        }
    }
}

function removeChildFromGraphComponent(formula, childAddress) {
    let [crid, ccid] = decodeRIDCIDFromAddress(childAddress);
    let encodedFormula = formula.split(" ");

    for (let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [prid, pcid] = decodeRIDCIDFromAddress(encodedFormula[i]);
            graphComponentMatrix[prid][pcid].pop();
        }
    }
}

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







