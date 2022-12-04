import { readFileSync } from 'fs';

// Input logic
const TEST_LINES = readFileSync('test.in', 'utf-8').split('\r\n');
const INPUT_LINES = readFileSync('input.in', 'utf-8').split('\r\n');


// Solution logic

const doContain = ([first, second]) => {
    const [firstStart, firstEnd] = first;
    const [secondStart, secondEnd] = second;

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

const doOverlap = ([first, second]) => {
    const [firstStart, firstEnd] = first;
    const [secondStart, secondEnd] = second;

    if (firstStart <= secondStart && firstEnd >= secondStart) {
        return true;
    }

    if (secondStart <= firstStart && secondEnd >= firstStart) {
        return true;
    }

    return false;
}

const splitAndConvertInput = (elvesRanges) => {
    const [first, second] = elvesRanges;
    const firstNumbers = first.split('-').map(numberStr => +numberStr);
    const secondNumbers = second.split('-').map(numberStr => +numberStr);

    return [firstNumbers, secondNumbers];
}

const firstPart = (allReadings) => {

    const containedPairs = allReadings
        .map(line => line.split(','))
        .map(splitAndConvertInput)
        .filter(doContain)
        .length;

    console.log({containedPairs});
};

const secondPart = (allReadings) => {
    const overlappingPairs = allReadings
        .map(line => line.split(','))
        .map(splitAndConvertInput)
        .filter((ranges) => doContain(ranges) || doOverlap(ranges))
        .length;

    console.log({overlappingPairs});

};


// Call solution
firstPart(INPUT_LINES);
secondPart(INPUT_LINES);