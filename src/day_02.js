/**
 * Contains solutions for Day 2
 * Puzzle Description: https://adventofcode.com/2023/day/2
 */

/**
 * Returns the solution for level one of this puzzle.
 * @param {Object} args - Provides both raw and split input.
 * @param {String} args.input - The original, unparsed input string.
 * @param {String[]} args.lines - Array containing each line of the input string.
 * @returns {Number|String}
 */
export const levelOne = ({ input, lines }) => {
  const answer = lines
    .map(parseGame)
    .filter(({ possible }) => possible)
    .reduce((acc, { game }) => acc + game, 0);
  console.log(answer);
  return answer;
};

/**
 * Returns the solution for level two of this puzzle.
 * @param {Object} args - Provides both raw and split input.
 * @param {String} args.input - The original, unparsed input string.
 * @param {String[]} args.lines - Array containing each line of the input string.
 * @returns {Number|String}
 */
export const levelTwo = ({ input, lines }) => {
  const answer = lines.map(parsePower).reduce((a, b) => a + b, 0);
  console.log(answer);
  return answer;
};

const EMPTY_ROUND = { red: 0, blue: 0, green: 0 };

function parseGame(line) {
  const [game, sets] = line.split(": ");
  const rounds = sets.split("; ").map(parseRound);
  const possible = rounds.reduce(
    (acc, round) => acc && isRoundPossible(round),
    true
  );
  return {
    game: parseInt(game.split(" ")[1], 10),
    possible: possible,
  };
}

function parsePower(line) {
  const [_game, sets] = line.split(": ");
  const rounds = sets.split("; ").map(parseRound).reduce(maxCubes, EMPTY_ROUND);
  return Object.values(rounds).reduce((a, b) => a * b, 1);
}

function parseRound(round) {
  return round.split(", ").reduce((acc, a) => {
    const [count, color] = a.split(" ");
    return { ...acc, [color]: parseInt(count, 10) };
  }, EMPTY_ROUND);
}

function maxCubes(roundA, roundB) {
  return {
    red: Math.max(roundA.red, roundB.red),
    blue: Math.max(roundA.blue, roundB.blue),
    green: Math.max(roundA.green, roundB.green),
  };
}

function isRoundPossible(round) {
  const red = round.red || 0;
  const blue = round.blue || 0;
  const green = round.green || 0;

  return red <= 12 && green <= 13 && blue <= 14;
}
