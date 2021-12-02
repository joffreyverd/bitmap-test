import { Case, Matrix, Position } from './types';

const WHITE_PIXEL = 1;

export default class MatrixHandler {
  private rows: number;
  private columns: number;
  private matrix: Matrix;
  private result: Matrix;

  private whitePixel: boolean = false;
  private position: Position = { row: 0, column: 0 };
  private matrixProcessed: boolean = false;

  constructor({ rows, columns, matrix }: Case) {
    this.rows = rows;
    this.columns = columns;
    this.matrix = matrix;
    this.result = Array(rows).fill(0).map(() => Array(columns).fill(0));
  }

  /**
   *
   * @param r - the row index
   * @param c - the column index
   * @returns - true if the targeted position exist in the matrix
   */
  private inMatrix = (r: number, c: number): boolean => {
    return r >= 0 && r < this.rows && c >= 0 && c < this.columns;
  };

  /**
   *
   * @param i - the counter to rotate through the matrix
   * @returns - the next fourth positions to check (up, right, down, left)
   */
  private rotation = (i: number): number[][] => {
    const { row, column } = this.position;
    return [[row - i, column], [row, column + i], [row + i, column], [row, column - i]];
  };

  /**
   *
   * @param i - the counter to rotate through the matrix
   * @returns - true if there is a white pixel i cases arount the current position
   */
  private isWhiteAround = (i: number): boolean => {
    const isWhite = this.rotation(i).find((destination) => {
      if (this.inMatrix(destination[0], destination[1])) {
        return this.matrix[destination[0]][destination[1]] === WHITE_PIXEL;
      }
      return false;
    });
    return !!isWhite;
  };

  /**
   *
   * @param i - the counter to rotate through the matrix
   * @returns - true if the previous iteration around the target did not succed
   */
  private shouldRotate = (i: number): boolean => {
    const maxMove = this.rows >= this.columns ? this.rows - 1 : this.columns - 1;
    return i <= maxMove && !this.whitePixel;
  };

  /**
   * This method move the cursor into the matrix
   * Example:
   * 0 1 2 3
   * 4 5 6 7
   */
  private runTroughMatrix = (): void => {
    const { row, column } = this.position;
    if (this.inMatrix(row, column + 1)) {
      this.position = { row, column: column + 1 };
    } else if (this.inMatrix(row + 1, column)) {
      this.position = { row: row + 1, column: 0 };
    } else {
      this.matrixProcessed = true;
    }
  };

  /**
   *
   * @returns - the matrix containing distance between from a position
   * to the nearest white pixel
   *
   */
  public getNearestWhitePixel = (): Matrix => {
    while (!this.matrixProcessed) {
      const { row, column } = this.position;
      if (this.matrix[row][column] === WHITE_PIXEL) {
        this.result[row][column] = 0;
      } else {
        this.whitePixel = false;
        for (let i = 1; this.shouldRotate(i); i += 1) {
          if (this.isWhiteAround(i)) {
            this.result[row][column] = i;
            this.whitePixel = true;
          }
        }
      }
      this.runTroughMatrix();
    }
    return this.result;
  };
}
