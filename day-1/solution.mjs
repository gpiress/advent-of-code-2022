import { readFileSync } from 'fs';

// Input logic
const TEST_LINES = readFileSync('test.in', 'utf-8').split('\n');
const INPUT_LINES = readFileSync('input.in', 'utf-8').split('\n');


// Solution logic
const getElvenCalories = (inputLines) => {
  let accumulator = 0;
  let elvesCalories = [];
  for (let line of inputLines) {
    if (line === '') {
      elvesCalories.push(accumulator);
      accumulator = 0;
      continue;
    }

    const calories = +line;
    accumulator += calories;
  }
  elvesCalories.push(accumulator);

  return elvesCalories;
};


const firstPart = (allReadings) => {
  const elvenCalories = getElvenCalories(allReadings);

  const maxCalories = elvenCalories.reduce((previous, current) => {
    return previous > current ? previous : current;
  }, 0)

  console.log({maxCalories});
};

const secondPart = (allReadings) => {
  const elvenCalories = getElvenCalories(allReadings);

  const topThree = elvenCalories.reduce((previous, current) => {
    if (previous.length < 3) {
      return [...previous, current].sort((a, b) => +a - +b);
    }

    const previousLowest = previous.shift();
    if (current > previousLowest) {
      return [...previous, current].sort((a, b) => +a - +b);
    } else {
      return [previousLowest, ...previous];
    }
  }, []);

  console.log({topThree});
  const topThreeSum = topThree.reduce((prev, curr) => prev + curr, 0);
  console.log({topThreeSum});
};


// Call solution
firstPart(INPUT_LINES);
secondPart(INPUT_LINES);