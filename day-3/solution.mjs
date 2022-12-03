import { readFileSync } from 'fs';

// Input logic
const TEST_LINES = readFileSync('test.in', 'utf-8').split('\r\n');
const INPUT_LINES = readFileSync('input.in', 'utf-8').split('\r\n');


// Solution logic
const getPrio = (character) => {
  const charCode = character.charCodeAt(0);
  
  if (character >= 'a' && character <= 'z') {
    const baseCode = 'a'.charCodeAt(0);
    return charCode - baseCode + 1; // start at 1
  } else {
    const baseCode = 'A'.charCodeAt(0);
    return charCode - baseCode + 27; // start at 27
  }
};

const getCommonOcurrences = (rucksackItems) => {
  const seenInFirstCompartment = new Set();

  const half = rucksackItems.length / 2;
  const common = new Set();

  rucksackItems.split('').forEach((current, index) => {
    if (index < half) {
      seenInFirstCompartment.add(current);
    } else {
      if (seenInFirstCompartment.has(current)) {
        common.add(current);
      }
    }
  });

  const commonOccurrencesArray = Array.from(common);
  //console.log({commonOccurrencesArray});
  return commonOccurrencesArray;
};

const firstPart = (allReadings) => {
  const prioSum = allReadings
    .map(getCommonOcurrences)
    .map((commonOccurrences) => commonOccurrences.map(getPrio))
    .map((priosPerLine) => priosPerLine.reduce((a, b) => a + b, 0))
    .reduce((a, b) => a + b, 0);

  console.log({ prioSum });
};

const groupByThree = (arrayToChange, currentLine, currentIndex) => {

  const newIndex = Math.floor(currentIndex / 3);
  if (arrayToChange.length > newIndex) {
    arrayToChange[newIndex].push(currentLine);
  } else {
    arrayToChange[newIndex] = [currentLine];
  }

  return arrayToChange;
};

const getBadge = (threeRucksacks) => {
  const seenFirst = new Set();
  const seenTwice = new Set();
  let seenAll = '';

  for (let firstChar of threeRucksacks[0]) {
    seenFirst.add(firstChar);
  }

  for (let secondChar of threeRucksacks[1]) {
    if (seenFirst.has(secondChar)) {
      seenTwice.add(secondChar);
    }
  }

  for (let thirdChar of threeRucksacks[2]) {
    if (seenTwice.has(thirdChar)) {
      seenAll = thirdChar;
      break;
    }
  }

  return seenAll;
};

const secondPart = (allReadings) => {
  const prioSum = allReadings
    .reduce(groupByThree, [])
    .map(getBadge)
    .map(getPrio)
    .reduce((a, b) => a + b, 0)

  console.log({ prioSum });
};


// Call solution
firstPart(INPUT_LINES);
secondPart(INPUT_LINES);