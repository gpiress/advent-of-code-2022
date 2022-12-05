import { readFileSync } from 'fs';

// Input logic
const TEST_LINES = readFileSync('test.in', 'utf-8').split('\r\n');
const INPUT_LINES = readFileSync('input.in', 'utf-8').split('\r\n');


// Solution logic
const isNumberLine = (line) => {
    return line.startsWith(' 1');
};

const isInstructionLine = (line) => {
    return line.startsWith('move ');
};

const parseInput = (allReadings) => {
    const stacks = [];
    for (let line of allReadings) {
        if (isNumberLine(line)) {
            break;
        }

        for (let i = 0; i < line.length / 4; i++) {
            const box = line.substr(i * 4 + 1, 1).trim();
            if (box !== '') {
                if (stacks[i] === undefined) {
                    stacks[i] = [box];
                } else {
                    stacks[i].push(box);
                }
            }
        }
    }

    return stacks;
};

const runInstructions = (stacks, allReadings) => {
    for (let line of allReadings) {
        if (!isInstructionLine(line)) {
            continue;
        }

        const parts = line.split(' ');
        const quantity = +parts[1];
        const from = +parts[3] - 1;
        const to = +parts[5] - 1;

        for (let i = 0; i < quantity; i++) {
            const box = stacks[from].shift();
            stacks[to].unshift(box);
        }
    }

    return stacks;
};

const runInstructionsSecondPart = (stacks, allReadings) => {
    for (let line of allReadings) {
        if (!isInstructionLine(line)) {
            continue;
        }

        const parts = line.split(' ');
        const quantity = +parts[1];
        const from = +parts[3] - 1;
        const to = +parts[5] - 1;

        const boxesToMove = stacks[from].splice(0, quantity);
        stacks[to] = [...boxesToMove, ...stacks[to]];
    }

    return stacks;
};

const getMessage = (stacks) => {
    let message = '';

    for (let stack of stacks) {
        message += stack[0];
    }

    return message;
};

const firstPart = (allReadings) => {
    const stacks = parseInput(allReadings);
    //console.log(JSON.stringify(stacks, null, 4));

    const movedStacks = runInstructions(stacks, allReadings);
    //console.log(JSON.stringify(movedStacks, null, 2));

    const message = getMessage(movedStacks);

    console.log({message});
};

const secondPart = (allReadings) => {
    const stacks = parseInput(allReadings);

    const movedStacks = runInstructionsSecondPart(stacks, allReadings);

    const message = getMessage(movedStacks);

    console.log({message});
};


// Call solution
firstPart(INPUT_LINES);
secondPart(INPUT_LINES);