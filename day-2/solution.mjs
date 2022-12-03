import { readFileSync } from 'fs';

// Input logic
const TEST_LINES = readFileSync('test.in', 'utf-8').split('\r\n');
const INPUT_LINES = readFileSync('input.in', 'utf-8').split('\r\n');


// Solution logic
const signScores = new Map();
signScores.set('X', 1);
signScores.set('Y', 2);
signScores.set('Z', 3);

const WIN_POINTS = 6;
const DRAW_POINTS = 3;
const LOSS_POINTS = 0;

const isYourWin = (opponent, yours) => {
  if (opponent === 'A' && yours === 'Y') {
    return true;
  }

  if (opponent === 'B' && yours === 'Z') {
    return true;
  }

  if (opponent === 'C' && yours === 'X') {
    return true;
  }

  return false;
};

const isDraw = (opponent, yours) => {
  if (opponent === 'A' && yours === 'X') {
    return true;
  }

  if (opponent === 'B' && yours === 'Y') {
    return true;
  }

  if (opponent === 'C' && yours === 'Z') {
    return true;
  }

  return false;
};

const roundPoints = (opponent, yours) => {
  const score = +signScores.get(yours);

  if (isYourWin(opponent, yours)) {
    return score + WIN_POINTS;
  } else if (isDraw(opponent, yours)) {
    return score + DRAW_POINTS;
  }

  return score + LOSS_POINTS;
};

const winRoundPoints = (opponent) => {
  if (opponent === 'A') {
    return signScores.get('Y') + WIN_POINTS;
  }

  if (opponent === 'B') {
    return signScores.get('Z') + WIN_POINTS;
  }

  if (opponent === 'C') {
    return signScores.get('X') + WIN_POINTS;
  }
};

const drawRoundPoints = (opponent) => {
  if (opponent === 'A') {
    return signScores.get('X') + DRAW_POINTS;
  }

  if (opponent === 'B') {
    return signScores.get('Y') + DRAW_POINTS;
  }

  if (opponent === 'C') {
    return signScores.get('Z') + DRAW_POINTS;
  }
};

const loseRoundPoints = (opponent) => {
  if (opponent === 'A') {
    return signScores.get('Z') + LOSS_POINTS;
  }

  if (opponent === 'B') {
    return signScores.get('X') + LOSS_POINTS;
  }

  if (opponent === 'C') {
    return signScores.get('Y') + LOSS_POINTS;
  }
};

const roundPointsSecondStrat = (opponent, yours) => {
  if (yours === 'X') {
    return loseRoundPoints(opponent);
  }

  if (yours === 'Y') {
    return drawRoundPoints(opponent);
  }

  if (yours === 'Z') {
    return winRoundPoints(opponent);
  }
  
  throw Error('should never get here');
};

const firstPart = (allReadings) => {
  const finalScore = allReadings
    .map(line => line.split(' '))
    .map(([opp, yours]) => roundPoints(opp, yours))
    .reduce((prev, curr) => prev + curr, 0);
  
  console.log(`Your total score is ${finalScore}`);
};

const secondPart = (allReadings) => {
  const finalScore = allReadings
    .map(line => line.split(' '))
    .map(([opp, yours]) => roundPointsSecondStrat(opp, yours))
    .reduce((prev, curr) => prev + curr, 0);
  
  console.log(`Second part total score is ${finalScore}`);
};


// Call solution
firstPart(INPUT_LINES);
secondPart(INPUT_LINES);