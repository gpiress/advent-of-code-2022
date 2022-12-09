import { readFileSync } from 'fs';

// Input logic
const TEST_LINES = readFileSync('test.in', 'utf-8').split('\r\n');
const INPUT_LINES = readFileSync('input.in', 'utf-8').split('\r\n');


let visited = new Set();
let head = { x: 0, y: 0 };
let tail = { x: 0, y: 0 };
let knots = new Array(8).fill(0).map(() => ({ x: 0, y: 0 }));

const areAdjacent = (headPos, tailPos) => {
    const xDiff = Math.abs(headPos.x - tailPos.x);
    const yDiff = Math.abs(headPos.y - tailPos.y);

    return xDiff <= 1 && yDiff <= 1;
};

const adjustTail = (headPos, tailPos) => {
    if (areAdjacent(headPos, tailPos)) {
        return false;
    }

    const xDiff = headPos.x - tailPos.x;
    if (xDiff < 0) {
        tailPos.x = tailPos.x - 1;
    } else if (xDiff > 0) {
        tailPos.x = tailPos.x + 1;
    }

    const yDiff = headPos.y - tailPos.y;
    if (yDiff < 0) {
        tailPos.y = tailPos.y - 1;
    } else if (yDiff > 0) {
        tailPos.y = tailPos.y + 1;
    }

    return true;
};

const adjustKnots = () => {
    adjustTail(head, knots[0]);
    adjustTail(knots[0], knots[1]);
    adjustTail(knots[1], knots[2]);
    adjustTail(knots[2], knots[3]);
    adjustTail(knots[3], knots[4]);
    adjustTail(knots[4], knots[5]);
    adjustTail(knots[5], knots[6]);
    adjustTail(knots[6], knots[7]);
    adjustTail(knots[7], tail);
    visited.add(tail.x * 1000 + tail.y);

    //console.log({head});
    //console.log({knots});
    //console.log({tail});
    //console.log('-------------');
};

const moveHeadRight = (steps, firstPart=true) => {
    for (let i = 0; i < steps; i++) {
        head.x = head.x + 1;
        if (firstPart) {
            adjustTail(head, tail);
            visited.add(tail.x * 1000 + tail.y);
        } else {
            adjustKnots();
        }
    }
};

const moveHeadLeft = (steps, firstPart=true) => {
    for (let i = 0; i < steps; i++) {
        head.x = head.x - 1;
        if (firstPart) {
            adjustTail(head, tail);
            visited.add(tail.x * 1000 + tail.y);
        } else {
            adjustKnots();
        }
    }
};

const moveHeadUp = (steps, firstPart=true) => {
    for (let i = 0; i < steps; i++) {
        head.y = head.y + 1;
        if (firstPart) {
            adjustTail(head, tail);
            visited.add(tail.x * 1000 + tail.y);
        } else {
            adjustKnots();
        }
    }
};

const moveHeadDown = (steps, firstPart=true) => {
    for (let i = 0; i < steps; i++) {
        head.y = head.y - 1;
        if (firstPart) {
            adjustTail(head, tail);
            visited.add(tail.x * 1000 + tail.y);
        } else {
            adjustKnots();
        }
    }
};

const runInstruction = (instruction, firstPart=true) => {
    const [direction, stepsStr] = instruction.split(' ');
    const steps = +stepsStr;

    if (direction === 'R') {
        moveHeadRight(steps, firstPart);
    } else if (direction === 'L') {
        moveHeadLeft(steps, firstPart);
    } else if (direction === 'U') {
        moveHeadUp(steps, firstPart);
    } else if (direction === 'D') {
        moveHeadDown(steps, firstPart);
    }
};


// Solution logic
const firstPart = (allReadings) => {
    allReadings
        .forEach(runInstruction);

    const beenTo = visited.size + 1;

    /*
    visited.forEach(entry => {
        const x = entry / 1000
        const y = entry % 1000;
        console.log(`x: ${x}, y: ${y}`);
    });
    */

    console.log({beenTo});
};

const secondPart = (allReadings) => {
    visited.clear();
    head = { x: 0, y: 0 };
    tail = { x: 0, y: 0 };
    knots = new Array(8).fill(0).map(() => ({ x: 0, y: 0 }));

    allReadings
        .forEach(instruction => runInstruction(instruction, false));

    const beenTo = visited.size;
    console.log({beenTo});
};


// Call solution
firstPart(INPUT_LINES);
secondPart(INPUT_LINES);