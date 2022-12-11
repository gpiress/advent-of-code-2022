import { readFileSync } from 'fs';

// Input logic
const TEST_LINES = readFileSync('test.in', 'utf-8').split('\r\n');
const INPUT_LINES = readFileSync('input.in', 'utf-8').split('\r\n');


const parseMonkeys = input => {
    const monkeys = [];

    for (let i = 1; i < input.length; i+=7) {
        const startingItemsLine = input[i];
        const operationLine = input[i+1];
        const testLine = input[i+2];
        const trueLine = input[i+3];
        const falseLine = input[i+4];

        const itemsStr = startingItemsLine.split('Starting items: ')[1];
        const items = itemsStr.split(', ').map(numStr => +numStr);
        const operation = operationLine.split('Operation: new = ')[1];
        const divisibleBy = +testLine.split('Test: divisible by ')[1];
        const trueThrowTo = +trueLine.split('If true: throw to monkey ')[1];
        const falseThrowTo = +falseLine.split('If false: throw to monkey ')[1];

        monkeys.push({
            items,
            operation,
            divisibleBy,
            trueThrowTo,
            falseThrowTo,
            inspected: 0,
        });
    }

    return monkeys;
};

const playRound = (monkeys) => {
    for (let i = 0; i < monkeys.length; i++) {
        const currentMonkey = monkeys[i];
        const { items, operation, divisibleBy, trueThrowTo, falseThrowTo } = currentMonkey;

        const totalItems = items.length;
        for (let j = 0; j < totalItems; j++) {
            const item = items.shift();
            //console.log({operation});
            let newWorry = eval(operation.replace(/old/g, item.toString()));
            newWorry = Math.floor(newWorry / 3);
            currentMonkey.inspected++;

            const isDivisible = (newWorry % divisibleBy) === 0;
            if (isDivisible) {
                monkeys[trueThrowTo].items.push(newWorry);
            } else {
                monkeys[falseThrowTo].items.push(newWorry);
            }
        }
    }
};

const playRoundSecond = (monkeys, mdc) => {
    for (let i = 0; i < monkeys.length; i++) {
        const currentMonkey = monkeys[i];
        const { items, operation, divisibleBy, trueThrowTo, falseThrowTo } = currentMonkey;

        const totalItems = items.length;
        for (let j = 0; j < totalItems; j++) {
            const item = items.shift();
            let newWorry = eval(operation.replace(/old/g, item.toString()));
            newWorry = newWorry % mdc;
            currentMonkey.inspected++;

            const isDivisible = (newWorry % divisibleBy) === 0;
            if (isDivisible) {
                monkeys[trueThrowTo].items.push(newWorry);
            } else {
                monkeys[falseThrowTo].items.push(newWorry);
            }
        }
    }
};

const computeMdc = (monkeys) => {
    return monkeys.reduce((prev, monkey) => prev * monkey.divisibleBy, 1);
};

const printItems = (monkeys) => {
    for (let i = 0; i < monkeys.length; i++) {
        const current = monkeys[i];
        const items = current.items.join(', ');

        console.log(`Monkey ${i}: ${items}`);
    }
};

const printInspected = (monkeys) => {
    for (let i = 0; i < monkeys.length; i++) {
        const { inspected } = monkeys[i];

        console.log(`Monkey ${i}: ${inspected}`);
    }
};

// Solution logic
const firstPart = (allReadings) => {
    const monkeys = parseMonkeys(allReadings);
    //console.log({monkeys});

    const ROUNDS = 20;
    for (let i = 0; i < ROUNDS; i++) {
        playRound(monkeys);
    }
    //printItems(monkeys);
    //printInspected(monkeys);

    const inspectedValuesSorted = monkeys
        .map(({inspected}) => inspected)
        .sort((a, b) => b - a);

    const monkeyBusiness = inspectedValuesSorted[0] * inspectedValuesSorted[1];
    console.log({monkeyBusiness});
};

const secondPart = (allReadings) => {
    const monkeys = parseMonkeys(allReadings);
    const mdc = computeMdc(monkeys);

    const ROUNDS = 10000;
    for (let i = 0; i < ROUNDS; i++) {
        playRoundSecond(monkeys, mdc);
    }

    //printItems(monkeys);
    //printInspected(monkeys);
    const inspectedValuesSorted = monkeys
        .map(({inspected}) => inspected)
        .sort((a, b) => b - a);

    const monkeyBusiness = inspectedValuesSorted[0] * inspectedValuesSorted[1];
    console.log({monkeyBusiness});
};


// Call solution
firstPart(INPUT_LINES);
secondPart(INPUT_LINES);