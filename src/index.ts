import formatInput from './formatInput';
import formatOutput from './formatOutput';
import MatrixHandler from './MatrixHandler';

let input = '';
process.stdin.on('readable', () => {
  const entry = process.stdin.read();
  while (entry) {
    if (entry === 'exit') {
      process.stdin.emit('exit');
    }
    input += entry;
  }
});

process.stdin.on('exit', () => {
  const { cases, casesNumber } = formatInput(input);
  if (casesNumber !== cases.length) {
    throw new Error('The number of cases is wrong.');
  }
  const bitmaps = cases.map((bitmapCase) => {
    const matrix = new MatrixHandler(bitmapCase);
    return matrix.getNearestWhitePixel();
  });
  process.stdout.write(formatOutput(bitmaps));
  process.exit();
});
