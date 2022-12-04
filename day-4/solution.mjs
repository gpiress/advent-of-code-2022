import { readFileSync } from 'fs';

// Input logic
const TEST_LINES = readFileSync('test.in', 'utf-8').split('\r\n');
const INPUT_LINES = readFileSync('input.in', 'utf-8').split('\r\n');


// Solution logic

const doContain = (first, second) => {
    const [firstStart, firstEnd] = first.split('-').map(numberStr => +numberStr);
    const [secondStart, secondEnd] = second.split('-').map(numberStr => +numberStr);

    // check if first contains second
    if (firstStart <= secondStart && firstEnd >= secondEnd) {
        return true;
    }

    // check if second contains first
    if (secondStart <= firstStart && secondEnd >= firstEnd) {
        return true;
    }

    return false;
}

const doOverlap = (first, second) => {
    if (doContain(first, second)) {
        return true;
    }

    const [firstStart, firstEnd] = first.split('-').map(numberStr => +numberStr);
    const [secondStart, secondEnd] = second.split('-').map(numberStr => +numberStr);

    if (firstStart <= secondStart && firstEnd >= secondStart) {
        return true;
    }

    if (secondStart <= firstStart && secondEnd >= firstStart) {
        return true;
    }

    return false;
}

const firstPart = (allReadings) => {
    const containedPairs = allReadings
        .map(line => line.split(','))
        .map(([first, second]) => doContain(first, second))
        .filter((contained) => contained === true)
        .length;

    console.log({containedPairs});
};

const secondPart = (allReadings) => {
    const overlappingPairs = allReadings
        .map(line => line.split(','))
        .map(([first, second]) => doOverlap(first, second))
        .filter((overlap) => overlap === true)
        .length;

    console.log({overlappingPairs});

};


// Call solution
firstPart(INPUT_LINES);
secondPart(INPUT_LINES);