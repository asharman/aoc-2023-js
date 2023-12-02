/**
 * Contains solutions for Day 1
 * Puzzle Description: https://adventofcode.com/2023/day/1
 */

/**
 * Returns the solution for level one of this puzzle.
 * @param {Object} args - Provides both raw and split input.
 * @param {String} args.input - The original, unparsed input string.
 * @param {String[]} args.lines - Array containing each line of the input string.
 * @returns {Number|String}
 */
export const levelOne = ({ input, lines }) => {
  const answer = lines.map(parseInputOne).reduce((a, b) => a + b, 0);
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
  const numbers = lines.map(parseInputTwo);
  console.log(numbers);

  const answer = numbers.reduce((a, b) => a + b, 0);
  return answer;
};

/**
 * @param {String} line
 * @returns {Number|String}
 */
function parseInputOne(line) {
  const numbers = line.split("").reduce(
    (acc, s) => {
      const number = parseInt(s, 10);

      // Character is a number
      if (!isNaN(number)) {
        // A number has been found in the string already
        // update the last digit seen
        if (acc[0]) {
          return [acc[0], number];
          // This is the first number found, make both digits this number
        } else {
          return [number, number];
        }
      } else {
        return acc;
      }
    },
    [null, null]
  );

  const [tens, ones] = numbers;
  return tens * 10 + ones;
}

/**
 * @param {String} string
 * @returns {{output: String|null, remaining: String}}
 */
function parseDigit(string) {
  if (parseInt(string.slice(0, 1), 10)) {
    return parseInt(string.slice(0, 1), 10);
  } else if (string.slice(0, 3) === "one") {
    return 1;
  } else if (string.slice(0, 3) === "two") {
    return 2;
  } else if (string.slice(0, 5) === "three") {
    return 3;
  } else if (string.slice(0, 4) === "four") {
    return 4;
  } else if (string.slice(0, 4) === "five") {
    return 5;
  } else if (string.slice(0, 3) === "six") {
    return 6;
  } else if (string.slice(0, 5) === "seven") {
    return 7;
  } else if (string.slice(0, 5) === "eight") {
    return 8;
  } else if (string.slice(0, 4) === "nine") {
    return 9;
  } else {
    return null;
  }
}

/**
 * @param {String} line
 * @returns {Number|String}
 */
function parseInputTwo(line) {
  const iter = (string, acc) => {
    if (string === "") {
      return acc;
    } else {
      const output = parseDigit(string);
      if (output) {
        return iter(string.slice(1), [...acc, output]);
      } else {
        return iter(string.slice(1), acc);
      }
    }
  };
  const digits = iter(line, []);
  return digits[0] * 10 + digits[digits.length - 1];
}

console.log(parseInputTwo("jcb82eightwond"));
