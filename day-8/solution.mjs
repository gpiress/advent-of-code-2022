import { readFileSync } from 'fs';

// Input logic
const TEST_LINES = readFileSync('test.in', 'utf-8').split('\r\n');
const INPUT_LINES = readFileSync('input.in', 'utf-8').split('\r\n');


// Solution logic

const parseInput = (allReadings) => {
    const lineToArray = (line) => {
        const partsStr = line.split('');
        const parts = partsStr.map(numberStr => +numberStr);
        return parts;
    };

    const matrix = allReadings
        .map(lineToArray);
    return matrix;
};

const computeMaxHeightMatrix = (treeMatrix) => {
    const maxHeightMatrix = [];

    // go over rows
    for (let i = 0; i < treeMatrix.length; i++) {
        const row = treeMatrix[i];
        maxHeightMatrix[i] = new Array(row.length).fill(10);
        let maxHeightInRowSoFar = -1;

        // Left to right
        for (let j = 0; j < row.length - 1; j++) {
            const currentValue = row[j];
            maxHeightInRowSoFar = Math.max(maxHeightInRowSoFar, currentValue);

            const curentValueInMatrix = maxHeightMatrix[i][j + 1];
            maxHeightMatrix[i][j + 1] = Math.min(maxHeightInRowSoFar, curentValueInMatrix);
        }

        // Right to left
        maxHeightInRowSoFar = -1;
        for (let j = row.length - 1; j > 0; j--) {
            const currentValue = row[j];
            maxHeightInRowSoFar = Math.max(maxHeightInRowSoFar, currentValue);

            const curentValueInMatrix = maxHeightMatrix[i][j - 1];
            maxHeightMatrix[i][j - 1] = Math.min(maxHeightInRowSoFar, curentValueInMatrix);
        }
    }

    // go over columns
    for (let i = 0; i < treeMatrix.length; i++) {
        // Top down
        let maxHeightInColSoFar = -1;
        for (let j = 0; j < treeMatrix.length - 1; j++) {
            const currentValue = treeMatrix[j][i];
            maxHeightInColSoFar = Math.max(maxHeightInColSoFar, currentValue);

            const curentValueInMatrix = maxHeightMatrix[j + 1][i];
            maxHeightMatrix[j + 1][i] = Math.min(maxHeightInColSoFar, curentValueInMatrix);
        }

        // Bottom up
        maxHeightInColSoFar = -1;
        for (let j = treeMatrix.length - 1; j > 0; j--) {
            const currentValue = treeMatrix[j][i];
            maxHeightInColSoFar = Math.max(maxHeightInColSoFar, currentValue);

            const curentValueInMatrix = maxHeightMatrix[j - 1][i];
            maxHeightMatrix[j - 1][i] = Math.min(maxHeightInColSoFar, curentValueInMatrix);
        }
    }

    return maxHeightMatrix;
};

const howManyVisible = (treeMatrix, maxHeightMatrix) => {
    let visible = 0;

    for (let i = 0; i < treeMatrix.length; i++) {
        const row = treeMatrix[i];

        for (let j = 0; j < row.length; j++) {
            if (i === 0 || j === 0) {
                visible++;
                continue;
            }

            if (i === treeMatrix.length - 1 || j === row.length - 1) {
                visible++;
                continue;
            }

            const maxPossibleHeight = maxHeightMatrix[i][j];
            if (row[j] > maxPossibleHeight) {
                visible++;
            }
        }
    }

    return visible;
}

const calcScenic = (treeMatrix, row, column) => {
    const treeHeight = treeMatrix[row][column];

    let scenic = 1;

    // look left
    let sight = 1;
    let j = column - 1;
    while (j > 0) {
        const newHeight = treeMatrix[row][j];
        if (newHeight >= treeHeight) {
            break;
        }
        j--;
        sight++;
    }

    scenic = scenic * sight;

    // look right
    sight = 1;
    j = column + 1;
    while (j < treeMatrix[row].length - 1) {
        const newHeight = treeMatrix[row][j];
        if (newHeight >= treeHeight) {
            break;
        }
        j++;
        sight++;
    }

    scenic = scenic * sight;

    // look up
    sight = 1;
    let i = row - 1;
    while (i > 0) {
        const newHeight = treeMatrix[i][column];
        if (newHeight >= treeHeight) {
            break;
        }
        i--;
        sight++;
    }

    scenic = scenic * sight;

    // look down
    sight = 1;
    i = row + 1;
    while (i < treeMatrix.length - 1) {
        const newHeight = treeMatrix[i][column];
        if (newHeight >= treeHeight) {
            break;
        }
        i++;
        sight++;
    }

    scenic = scenic * sight;
    return scenic;
}

const computeHighestScenic = (treeMatrix) => {
    let maxScenic = 0;

    for (let i = 1; i < treeMatrix.length - 1; i++) {
        for (let j = 1; j < treeMatrix[i].length - 1; j++) {
            const scenicValue = calcScenic(treeMatrix, i, j);
            //console.log(`Scenic value for '${treeMatrix[i][j]}' [${i}][${j}] is ${scenicValue}`);
            maxScenic = Math.max(maxScenic, scenicValue);
        }
    }

    return maxScenic;
};

const firstPart = (allReadings) => {
    const treeMatrix = parseInput(allReadings);
    //console.log({treeMatrix});

    const maxHeightMatrix = computeMaxHeightMatrix(treeMatrix);
    //console.log({maxHeightMatrix});

    const visible = howManyVisible(treeMatrix, maxHeightMatrix);
    console.log({visible});
};

const secondPart = (allReadings) => {
    const treeMatrix = parseInput(allReadings);
    const highestScenic = computeHighestScenic(treeMatrix);
    console.log({highestScenic});
};


// Call solution
firstPart(INPUT_LINES);
secondPart(INPUT_LINES);