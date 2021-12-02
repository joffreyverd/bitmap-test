export type Matrix = number[][];

export type Case = {
  rows: number,
  columns: number,
  matrix: Matrix
}

export type Bitmaps = {
  casesNumber: number,
  cases: Case[]
}

export type Position = {
  row: number,
  column: number
}
