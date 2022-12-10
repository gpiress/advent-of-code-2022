import { readFileSync } from 'fs';

// Input logic
const TEST_LINES = readFileSync('test.in', 'utf-8').split('\r\n');
const INPUT_LINES = readFileSync('input.in', 'utf-8').split('\r\n');


// Solution logic


const runInstructions = (instructions) => {
    let cycle = 0;
    let x = 1; // initial state
    const relevantCycles = [20, 60, 100, 140, 180, 220, 1000];

    let screen = ['', '', '', '', '', ''];

    let signalsSum = 0;

    const drawPixel = (cycle, x) => {
        const row = Math.floor(cycle / 40);
        const pixel = cycle % 40;

        if (Math.abs(x - pixel) <= 1) {
            //console.log(`Drawing pixel ${pixel} '#'. X is currently ${x}`);
            screen[row] += '#';
        } else {
            //console.log(`Drawing pixel ${pixel} '.'. X is currently ${x}`);
            screen[row] += '.';
        }
    };

    for (const instruction of instructions) {
        let delta = 0;

        if (instruction.startsWith('noop')) {
            drawPixel(cycle, x);
            cycle++;
        } else {
            drawPixel(cycle, x);
            drawPixel(cycle + 1, x);

            delta = +instruction.split(' ')[1];
            cycle += 2;
        }

        if (cycle >= relevantCycles[0]) {
            // do not add delta yet
            const relevant = relevantCycles.shift();
            //console.log(`During cycle ${relevant}, x is ${x}`);
            signalsSum += (relevant * x);
        }

        x += delta;
    }

    return { sum: signalsSum, screen };
};


const firstPart = (allReadings) => {
    const { sum } = runInstructions(allReadings);
    console.log({ sum });
};

const secondPart = (allReadings) => {
    const { screen } = runInstructions(allReadings);
    console.log({ screen });
};


// Call solution
//firstPart(INPUT_LINES);
secondPart(INPUT_LINES);