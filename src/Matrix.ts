import { Common } from './Common';
import { Vector, Vector2 } from './Vector';

/**
 * Type of matrices.
 */
export type Matrix = number[][];
/** dts2md break */
/**
 * Matrix-related APIs.
 */
export namespace Matrix {

    const _size1 = [0, 0] as Vector2;
    const _size2 = [0, 0] as Vector2;
    const _size3 = [0, 0] as Vector2;
    /** dts2md break */
    /**
     * Type of matrix element initializers.
     */
    export type MatrixInitializer = (i: number, j: number) => number;
    /** dts2md break */
    /**
     * Create a matrix with specific rows and columns
     * and initialize it using the given initializer.
     * (Default initializer: `0`.)
     */
    export const init = (
        rows: number,
        columns: number,
        initializer: number | MatrixInitializer = 0,
    ): Matrix => {

        if (Common.checkInput) {
            Common.validateDimension(rows);
            Common.validateDimension(columns);
        }

        if (typeof initializer === 'function') {
            return Common.createArray(
                rows,
                (_, i) => Common.createArray(
                    columns,
                    (_, j) => initializer(i, j)
                )
            );
        } else {
            const _initializer = () => initializer;
            return Common.createArray(
                rows,
                () => (
                    Common.createArray(columns, _initializer)
                )
            );
        }

    };
    /** dts2md break */
    /**
     * Fill the given matrix with specific value.
     * @returns The given matrix itself.
     */
    export const fill = <T extends Matrix>(
        matrix: T,
        value: number,
    ): T => {
        let row;
        for (let i = 0; i < matrix.length; i++) {
            row = matrix[i];
            for (let j = 0; j < row.length; j++) {
                row[j] = value;
            }
        }
        return matrix;
    };
    /** dts2md break */
    /**
     * Create an identity matrix of specific dimension.
     */
    export const identity = (
        dimension: number,
        output?: Matrix | null,
    ): Matrix => {

        if (Common.checkInput) {
            Common.validateDimension(dimension);
        }

        if (output) {

            if (Common.checkInput) {
                sizeOf(output, _size1);
                Common.assertSameDimension(_size1[0], dimension);
                Common.assertSameDimension(_size1[1], dimension);
            }

            for (let i = 0; i < dimension; i++) {
                for (let j = 0; j < dimension; j++) {
                    output[i][j] = (i === j) ? 1 : 0;
                }
            }

            return output;

        } else {
            return Common.createArray(
                dimension,
                (_, i) => Common.createArray(
                    dimension,
                    (_, j) => (i === j) ? 1 : 0
                )
            );
        }

    };
    /** dts2md break */
    /**
     * Clone the source matrix.
     */
    export const clone = <OutputType extends Matrix = Matrix>(
        source: Matrix,
        output?: OutputType | null,
    ): OutputType => {

        sizeOf(source, _size1);

        if (output) {

            if (Common.checkInput) {
                sizeOf(output, _size2);
                Common.assertSameDimension(_size2[0], _size1[0]);
                Common.assertSameDimension(_size2[1], _size1[1]);
            }

            for (let i = 0; i < _size1[0]; i++) {
                for (let j = 0; j < _size1[1]; j++) {
                    output[i][j] = source[i][j];
                }
            }

            return output;

        } else {
            return Common.createArray(
                _size1[0],
                (_, i) => Common.createArray(
                    _size1[1],
                    (_, j) => source[i][j]
                )
            ) as OutputType;
        }

    };
    /** dts2md break */
    /**
     * Stack the given matrices vertically.
     */
    export const vstack = <OutputType extends Matrix = Matrix>(
        matrices: Matrix[],
        output?: OutputType | null,
    ): OutputType => {

        if (!matrices.length) {
            throw new RangeError('no matrices provided');
        }

        const m0 = matrices[0];
        const width = sizeOf(m0, _size1)[1];
        const heights = [_size1[0]];
        let height = _size1[0];

        // calculate total height
        for (let i = 1; i < matrices.length; i++) {

            if (Common.checkInput) {
                Common.assertSameDimension(
                    sizeOf(matrices[i], _size2)[1],
                    width
                );
            }

            heights[i] = matrices[i].length;
            height += heights[i];

        }

        const result = output ?? (init(height, width) as OutputType);
        if (output && Common.checkInput) {
            sizeOf(output, _size3);
            Common.assertSameDimension(_size3[0], height);
            Common.assertSameDimension(_size3[1], width);
        }

        // copy elements
        let rowIndex = 0;
        for (let k = 0; k < matrices.length; k++) {
            const m = matrices[k];
            for (let i = 0; i < heights[k]; i++) {
                for (let j = 0; j < width; j++) {
                    result[rowIndex][j] = m[i][j];
                }
                rowIndex++;
            }
        }

        return result;

    };
    /** dts2md break */
    /**
     * Stack the given matrices horizontally.
     */
    export const hstack = <OutputType extends Matrix = Matrix>(
        matrices: Matrix[],
        output?: OutputType | null,
    ): OutputType => {

        if (!matrices.length) {
            throw new RangeError('no matrices provided');
        }

        const m0 = matrices[0];
        const height = sizeOf(m0, _size1)[0];
        const widths = [_size1[1]];
        let width = _size1[1];

        // calculate total width
        for (let i = 1; i < matrices.length; i++) {

            sizeOf(matrices[i], _size2);

            if (Common.checkInput) {
                Common.assertSameDimension(_size2[0], height);
            }

            widths[i] = _size2[1];
            width += _size2[1];

        }

        const result = output ?? (init(height, width) as OutputType);
        if (output && Common.checkInput) {
            sizeOf(output, _size3);
            Common.assertSameDimension(_size3[0], width);
            Common.assertSameDimension(_size3[1], height);
        }

        // copy elements
        let columnIndex = 0;
        for (let k = 0; k < matrices.length; k++) {
            const m = matrices[k];
            for (let j = 0; j < widths[k]; j++) {
                for (let i = 0; i < height; i++) {
                    result[i][columnIndex] = m[i][j];
                }
                columnIndex++;
            }
        }

        return result;

    };
    /** dts2md break */
    /**
     * Returns the dimensions of the given matrix.
     */
    export const sizeOf = <OutputType extends Vector2 = Vector2>(
        matrix: Matrix,
        output?: OutputType | null,
    ): OutputType => {

        const rows = matrix.length;
        if (Common.checkInput) {
            Common.validateDimension(rows);
        }

        const columns = matrix[0].length;
        if (Common.checkInput) {
            Common.validateDimension(columns);
        }

        if (output) {

            if (Common.checkInput) {
                Common.assertSameDimension(output.length, 2);
            }

            output[0] = matrix.length;
            output[1] = matrix[0].length;

            return output;

        } else {
            return [rows, columns] as OutputType;
        }

    };
    /** dts2md break */
    /**
     * Type of callbacks for `Matrix.forEach`.
     */
    export type ForEachCallback<SourceType extends Matrix> = (
        element: number,
        rowIndex: number,
        columnIndex: number,
        matrix: SourceType,
    ) => void;
    /** dts2md break */
    /**
     * Iterate each element of the given matrix.
     */
    export const forEach = <SourceType extends Matrix>(
        matrix: SourceType,
        callback: ForEachCallback<SourceType>,
    ): void => {
        sizeOf(matrix, _size1);
        for (let i = 0; i < _size1[0]; i++) {
            for (let j = 0; j < _size1[1]; j++) {
                callback(matrix[i][j], i, j, matrix);
            }
        }
    };
    /** dts2md break */
    /**
     * Type of callbacks for `Matrix.map`.
     */
    export type MapCallback<SourceType extends Matrix> = (
        element: number,
        rowIndex: number,
        columnIndex: number,
        matrix: SourceType,
    ) => number;
    /** dts2md break */
    /**
     * Map the source matrix into a new one.
     */
    export const map = <SourceType extends Matrix, OutputType extends Matrix = Matrix>(
        source: SourceType,
        callback: MapCallback<SourceType>,
        output?: OutputType | null,
    ): OutputType => {

        sizeOf(source, _size1);

        if (output) {

            if (Common.checkInput) {
                sizeOf(output, _size2);
                Common.assertSameDimension(_size2[0], _size1[0]);
                Common.assertSameDimension(_size2[1], _size1[1]);
            }

            for (let i = 0; i < _size1[0]; i++) {
                for (let j = 0; j < _size1[1]; j++) {
                    output[i][j] = callback(
                        source[i][j],
                        i,
                        j,
                        source,
                    );
                }
            }

            return output;

        } else {
            return Common.createArray(
                _size1[0],
                (_, i) => Common.createArray(
                    _size1[1],
                    (_, j) => callback(
                        source[i][j],
                        i,
                        j,
                        source,
                    )
                )
            ) as OutputType;
        }

    };
    /** dts2md break */
    /**
     * Returns the result of the source matrix
     * multiplies the given scalar. (element-wise)
     */
    export const multiply = <OutputType extends Matrix = Matrix>(
        source: Matrix,
        multiplier: number,
        output?: OutputType | null,
    ): OutputType => {

        sizeOf(source, _size1);

        if (output) {

            if (Common.checkInput) {
                sizeOf(output, _size2);
                Common.assertSameDimension(_size2[0], _size1[0]);
                Common.assertSameDimension(_size2[1], _size1[1]);
            }

            for (let i = 0; i < _size1[0]; i++) {
                for (let j = 0; j < _size1[1]; j++) {
                    output[i][j] = source[i][j] * multiplier;
                }
            }

            return output;

        } else {
            return Common.createArray(
                _size1[0],
                (_, i) => Common.createArray(
                    _size1[1],
                    (_, j) => (source[i][j] * multiplier)
                )
            ) as OutputType;
        }

    };
    /** dts2md break */
    /**
     * Returns the result of the source matrix
     * adds the given scalar. (element-wise)
     */
    export const plus = <OutputType extends Matrix = Matrix>(
        source: Matrix,
        addition: number,
        output?: OutputType | null,
    ): OutputType => {

        sizeOf(source, _size1);

        if (output) {

            if (Common.checkInput) {
                sizeOf(output, _size2);
                Common.assertSameDimension(_size2[0], _size1[0]);
                Common.assertSameDimension(_size2[1], _size1[1]);
            }

            for (let i = 0; i < _size1[0]; i++) {
                for (let j = 0; j < _size1[1]; j++) {
                    output[i][j] = source[i][j] + addition;
                }
            }

            return output;

        } else {
            return Common.createArray(
                _size1[0],
                (_, i) => Common.createArray(
                    _size1[1],
                    (_, j) => (source[i][j] + addition)
                )
            ) as OutputType;
        }

    };
    /** dts2md break */
    /**
     * Returns the matrix multiplication result of `m1 * m2`.
     */
    export const matmul = <OutputType extends Matrix = Matrix>(
        m1: Matrix,
        m2: Matrix,
        output?: OutputType | null,
    ): OutputType => {

        sizeOf(m1, _size1);
        sizeOf(m2, _size2);

        if (Common.checkInput) {
            Common.assertSameDimension(_size1[1], _size2[0]);
        }

        if (output) {

            if (Common.checkInput) {
                sizeOf(output, _size3);
                Common.assertSameDimension(_size3[0], _size1[0]);
                Common.assertSameDimension(_size3[1], _size2[1]);
            }

            for (let i = 0; i < _size1[0]; i++) {
                for (let j = 0; j < _size2[1]; j++) {
                    output[i][j] = 0;
                    for (let k = 0; k < _size1[1]; k++) {
                        output[i][j] += m1[i][k] * m2[k][j];
                    }
                }
            }

            return output;

        } else {
            return Common.createArray(
                _size1[0],
                (_, i) => Common.createArray(
                    _size2[1],
                    (_, j) => {
                        let result = 0;
                        for (let k = 0; k < _size1[1]; k++) {
                            result += m1[i][k] * m2[k][j];
                        }
                        return result;
                    }
                )
            ) as OutputType;
        }

    };
    /** dts2md break */
    /**
     * Returns the sum of the given matrices.
     * (element-wise addition)
     */
    export const sum = <OutputType extends Matrix = Matrix>(
        matrices: Matrix[],
        output?: OutputType | null,
    ): OutputType => {

        if (!matrices.length) {
            throw new RangeError('no matrices provided');
        }

        const m0 = matrices[0];
        sizeOf(m0, _size1);

        const result = output ?? (init(_size1[0], _size1[1]) as OutputType);
        if (output && Common.checkInput) {
            sizeOf(output, _size2);
            Common.assertSameDimension(_size2[0], _size1[0]);
            Common.assertSameDimension(_size2[1], _size1[1]);
        }

        for (let i = 0; i < _size1[0]; i++) {
            for (let j = 0; j < _size1[1]; j++) {
                result[i][j] = m0[i][j];
            }
        }

        let matrix;
        for (let k = 1; k < matrices.length; k++) {

            matrix = matrices[k];

            if (Common.checkInput) {
                sizeOf(matrix, _size2);
                Common.assertSameDimension(_size2[0], _size1[0]);
                Common.assertSameDimension(_size2[1], _size1[1]);
            }

            for (let i = 0; i < _size1[0]; i++) {
                for (let j = 0; j < _size1[1]; j++) {
                    result[i][j] += matrix[i][j];
                }
            }

        }

        return result;

    };
    /** dts2md break */
    /**
     * Returns the substraction of the given matrices.
     * (element-wise substraction; `result = m0 - m1 - m2 - ...`)
     */
    export const substraction = <OutputType extends Matrix = Matrix>(
        matrices: Matrix[],
        output?: OutputType | null,
    ): OutputType => {

        if (!matrices.length) {
            throw new RangeError('no matrices provided');
        }

        const m0 = matrices[0];

        sizeOf(m0, _size1);

        const result = output ?? (init(_size1[0], _size1[1]) as OutputType);
        if (output && Common.checkInput) {
            sizeOf(output, _size2);
            Common.assertSameDimension(_size2[0], _size1[0]);
            Common.assertSameDimension(_size2[1], _size1[1]);
        }

        for (let i = 0; i < _size1[0]; i++) {
            for (let j = 0; j < _size1[1]; j++) {
                result[i][j] = m0[i][j];
            }
        }

        let matrix;
        for (let k = 1; k < matrices.length; k++) {

            matrix = matrices[k];

            if (Common.checkInput) {
                sizeOf(matrix, _size2);
                Common.assertSameDimension(_size2[0], _size1[0]);
                Common.assertSameDimension(_size2[1], _size1[1]);
            }

            for (let i = 0; i < _size1[0]; i++) {
                for (let j = 0; j < _size1[1]; j++) {
                    result[i][j] -= matrix[i][j];
                }
            }

        }

        return result;

    };
    /** dts2md break */
    /**
     * Returns the transpose of the source matrix.
     */
    export const transpose = <OutputType extends Matrix = Matrix>(
        source: Matrix,
        output?: OutputType | null,
    ): OutputType => {

        sizeOf(source, _size1);

        if (output) {

            if (Common.checkInput) {
                sizeOf(output, _size2);
                Common.assertSameDimension(_size1[0], _size2[1]);
                Common.assertSameDimension(_size1[1], _size2[0]);
            }

            for (let i = 0; i < _size1[0]; i++) {
                for (let j = 0; j < _size1[1]; j++) {
                    output[j][i] = source[i][j];
                }
            }

            return output;

        } else {
            return Common.createArray(
                _size1[1],
                (_, j) => Common.createArray(
                    _size1[0],
                    (_, i) => source[i][j]
                )
            ) as OutputType;
        }

    };
    /** dts2md break */
    /**
     * Returns the result of determinant of the given matrix.
     */
    export const det = (matrix: Matrix): number => {

        sizeOf(matrix, _size1);

        const n = _size1[0];
        if (Common.checkInput) {
            Common.assertSameDimension(n, _size1[1]);
        }

        switch (n) {

            case 1: {
                return matrix[0][0];
            }

            case 2: {
                return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
            }

            case 3: {
                return (
                    matrix[0][0] * matrix[1][1] * matrix[2][2]
                    + matrix[0][1] * matrix[1][2] * matrix[2][0]
                    + matrix[0][2] * matrix[1][0] * matrix[2][1]
                    - matrix[2][0] * matrix[1][1] * matrix[0][2]
                    - matrix[0][1] * matrix[1][0] * matrix[2][2]
                    - matrix[0][0] * matrix[2][1] * matrix[1][2]
                );
            }

            default: {

                const _matrix = clone(matrix, null);
                const lastIndex = n - 1;
                let result = 1;
                let negative = false;

                for (let i = 0; i < lastIndex; i++) {

                    if (!_matrix[i][i]) { // first element is zero
                        for (let j = i + 1; j < n; j++) {
                            if (_matrix[j][i]) { // find nonzero and swap
                                const t = _matrix[j];
                                _matrix[j] = _matrix[i];
                                _matrix[i] = t;
                                negative = !negative;
                                break;
                            }
                        }
                        return 0; // all zero
                    }

                    const b = _matrix[i][i];

                    result *= b;

                    for (let j = i + 1; j < n; j++) { // transform
                        if (_matrix[j][i]) {
                            const c = _matrix[j][i] / b;
                            _matrix[j][i] = 0;
                            for (let k = i + 1; k < n; k++) {
                                _matrix[j][k] -= _matrix[i][k] * c;
                            }
                        }
                    }

                }

                result *= _matrix[lastIndex][lastIndex];

                return negative ? -result : result;

            }

        }

    };
    /** dts2md break */
    /**
     * Get the reduced row echelon form of the given matrix.
     * (using Gauss-Jordan elimination)
     */
    export const RREF = <OutputType extends Matrix = Matrix>(
        source: Matrix,
        output?: OutputType | null,
    ): OutputType => {

        sizeOf(source, _size1);

        const rows = _size1[0];
        const columns = _size1[1];

        if (output && Common.checkInput) {
            sizeOf(output, _size2);
            Common.assertSameDimension(_size2[0], rows);
            Common.assertSameDimension(_size2[1], columns);
        }

        const result = output ?? (clone(source) as OutputType);
        const lastRowIndex = rows - 1;
        let k = 0;
        for (let i = 0; i < columns; i++) {

            if (i >= rows) {
                break;
            }

            if (!result[k][i]) { // first element is zero
                let j, t;
                for (j = k + 1; j < rows; j++) { // find nonzero and swap
                    if (result[j][k]) {
                        t = result[j];
                        result[j] = result[k];
                        result[k] = t;
                        break;
                    }
                }
                if ((k < lastRowIndex) && (j === rows)) { // all zero
                    continue;
                }
            }

            if (result[k][i] !== 1) { // normalize

                const c = result[k][i];

                result[k][i] = 1; // current row

                let l;
                for (l = i + 1; l < columns; l++) { // rows below
                    result[k][l] /= c;
                }

            }

            for (let j = 0; j < rows; j++) { // transform
                if (k !== j && result[j][i]) {

                    const c = result[j][i];

                    result[j][i] = 0;

                    let l;
                    for (l = i + 1; l < columns; l++) {
                        result[j][l] -= result[k][l] * c;
                    }

                }
            }

            k++;

        }

        return result;

    };
    /** dts2md break */
    /**
     * Returns the inverse of the source matrix.
     * (Returns `null` if the inverse matrix doesn't exist.)
     */
    export const inv = <OutputType extends Matrix = Matrix>(
        source: Matrix,
        output?: OutputType | null,
    ): OutputType | null => {

        sizeOf(source, _size1);

        const n = _size1[0];

        if (Common.checkInput) {
            Common.assertSameDimension(n, _size1[1]);
        }

        if (output && Common.checkInput) {
            sizeOf(output, _size2);
            Common.assertSameDimension(_size2[0], n);
            Common.assertSameDimension(_size2[1], n);
            identity(n, output);
        }

        const result = output ?? (identity(n) as OutputType);
        const matrix = clone(source, null);
        const lastIndex = n - 1;

        for (let i = 0; i < n; i++) {

            if (!matrix[i][i]) { // first element is zero
                let j, t;
                for (j = i + 1; j < n; j++) { // find nonzero and swap
                    if (matrix[j][i]) {
                        t = matrix[j];
                        matrix[j] = matrix[i];
                        matrix[i] = t;
                        t = result[j];
                        result[j] = result[i];
                        result[i] = t;
                        break;
                    }
                }
                if ((i < lastIndex) && (j === n)) { // all zero
                    return null;
                }
            }

            if (matrix[i][i] !== 1) { // normalize

                const c = matrix[i][i];

                matrix[i][i] = 1;

                let k;
                for (k = i + 1; k < n; k++) {
                    matrix[i][k] /= c;
                }
                for (k = 0; k < n; k++) {
                    result[i][k] /= c;
                }

            }

            for (let j = 0; j < n; j++) { // transform
                if (i !== j && matrix[j][i]) {

                    const c = matrix[j][i];

                    matrix[j][i] = 0;

                    let k;
                    for (k = i + 1; k < n; k++) {
                        matrix[j][k] -= matrix[i][k] * c;
                    }
                    for (k = 0; k < n; k++) {
                        result[j][k] -= result[i][k] * c;
                    }

                }
            }

        }

        return result;

    };
    /** dts2md break */
    /**
     * Get the diagonal of the given matrix.
     */
    export const diag = <OutputType extends Vector = Vector>(
        matrix: Matrix,
        output?: OutputType | null,
    ): OutputType => {

        sizeOf(matrix, _size1);

        const n = Math.min(_size1[0], _size1[1]);

        if (output) {

            if (Common.checkInput) {
                Common.assertSameDimension(output.length, n);
            }

            for (let i = 0; i < n; i++) {
                output[i] = matrix[i][i];
            }

            return output;

        } else {
            const result = new Array(n) as OutputType;
            for (let i = 0; i < n; i++) {
                result[i] = matrix[i][i];
            }
            return result;
        }

    };

}
