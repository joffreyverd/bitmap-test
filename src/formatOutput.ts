const formatOutput = (output: number[][][]): string => output.map((i) => {
  return `${i.map((j) => j.join(' ')).join('\n')}\n`;
}).join('\n\n');

export default formatOutput;
