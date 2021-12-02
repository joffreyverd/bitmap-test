import { Bitmaps } from './types';

const formatInput = (input: string): Bitmaps => {
  const entries = input.trim().split('\n');
  const casesNumber = Number(entries[0]);
  const retrievedCases = entries.slice(1).join('\n').split('\n\n');

  const cases = retrievedCases.map((entry) => {
    const rowsAndColumns = entry.split('\n')[0].split(' ');
    const rows = Number(rowsAndColumns[0]);
    const columns = Number(rowsAndColumns[1]);

    const matrix = entry.split('\n').slice(1).map((arr) => arr.split('').map((val) => {
      if (!['0', '1'].includes(val)) {
        throw new Error('Only 0 and 1 are accepted in a Bitmap.');
      }
      return Number(val);
    }));
    return { rows, columns, matrix };
  });
  return { casesNumber, cases };
};

export default formatInput;
