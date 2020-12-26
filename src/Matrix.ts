import { Common } from './Common';
import { Vector, Vector2 } from './Vector';

export type Matrix = number[][];
/** dts2md break */
export namespace Matrix {
    /** dts2md break */
    const _size1 = [0, 0] as Vector2;
    const _size2 = [0, 0] as Vector2;
    const _size3 = [0, 0] as Vector2;
    /** dts2md break */
    type MatrixInitializer = (i: number, j: number) => number;
    /** dts2md break */
    /**
     * Create a matrix of `m` rows and `n` columns
     * initialized by provided initializer
     * (or filled with zero)
     */
    export const init = (
        m: number,
        n: number,
        initializer: number | MatrixInitializer = 0,
    ) => {
        if (Common.inputCheck) {
            Common.validateDimension(m);
            Common.validateDimension(n);
        }
        if (typeof initializer === 'function') {
            return Common.createArray(
                m,
                (_, i) => Common.createArray(
                    n,
                    (_, j) => initializer(i, j)
                )
            );
        } else {
            const _initializer = () => initializer;
            return Common.createArray(
                m,
                () => Common.createArray(n, _initializer)
            );
        }
    };
    /** dts2md break */
    /**
     * Fill the given matrix with provided value
     * @returns the given matrix itself
     */
    export const fill = (matrix: Matrix, value: number) => {
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
     * Create an identity matrix of the given dimension
     */
    export const identity = (
        dimension: number,
        output?: Matrix | null,
    ) => {
        if (Common.inputCheck) {
            Common.validateDimension(dimension);
        }
        if (output) {
            if (Common.inputCheck) {
                sizeOf(output, _size1);
                Common.assertSameDimension(_size1[0], dimension);
                Common.assertSameDimension(_size1[1], dimension);
            }
            for (let i = 0; i < dimension; i++) {
                for (let j = 0; j < dimension; j++) {
                    output[i][j] = +(i === j);
                }
            }
            return output;
        } else {
            return Common.createArray(
                dimension,
                (_, i) => Common.createArray(
                    dimension,
                    (_, j) => +(i === j)
                )
            );
        }
    };
    /** dts2md break */
    /**
     * Clone the source matrix
     */
    export const clone = (source: Matrix, output?: Matrix | null) => {
        sizeOf(source, _size1);
        if (output) {
            if (Common.inputCheck) {
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
            );
        }
    };
    /** dts2md break */
    /**
     * Returns the dimensions of the given matrix
     */
    export const sizeOf = (matrix: Matrix, output?: Vector2 | null) => {
        const m = matrix.length;
        if (Common.inputCheck) {
            Common.validateDimension(m);
        }
        const n = matrix[0].length;
        if (Common.inputCheck) {
            Common.validateDimension(n);
        }
        if (output) {
            if (Common.inputCheck) {
                Common.assertSameDimension(output.length, 2);
            }
            output[0] = matrix.length;
            output[1] = matrix[0].length;
            return output;
        } else {
            return [m, n] as Vector2;
        }
    };
    /** dts2md break */
    export type ForEachCallback =
        (element: number, i: number, j: number, matrix: Matrix) => void;
    /** dts2md break */
    /**
     * Iterates each component of the given matrix
     */
    export const forEach = (matrix: Matrix, callback: ForEachCallback) => {
        sizeOf(matrix, _size1);
        for (let i = 0; i < _size1[0]; i++) {
            for (let j = 0; j < _size1[1]; j++) {
                callback(matrix[i][j], i, j, matrix);
            }
        }
    };
    /** dts2md break */
    export type MapCallback =
        (element: number, i: number, j: number, matrix: Matrix) => number;
    /** dts2md break */
    /**
     * Map the source matrix into a new one
     */
    export const map = (
        source: Matrix,
        callback: MapCallback,
        output?: Matrix | null,
    ) => {
        sizeOf(source, _size1);
        if (output) {
            if (Common.inputCheck) {
                sizeOf(output, _size2);
                Common.assertSameDimension(_size2[0], _size1[0]);
                Common.assertSameDimension(_size2[1], _size1[1]);
            }
            for (let i = 0; i < _size1[0]; i++) {
                for (let j = 0; j < _size1[1]; j++) {
                    output[i][j] = callback(source[i][j], i, j, source);
                }
            }
            return output;
        } else {
            return Common.createArray(
                _size1[0],
                (_, i) => Common.createArray(
                    _size1[1],
                    (_, j) => callback(source[i][j], i, j, source)
                )
            );
        }
    };
    /** dts2md break */
    /**
     * Returns the source matrix multiplied
     * by the given multiplier(scalar)
     */
    export const multiply = (
        source: Matrix,
        multiplier: number,
        output?: Matrix | null,
    ) => {
        sizeOf(source, _size1);
        if (output) {
            if (Common.inputCheck) {
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
                    (_, j) => source[i][j] * multiplier
                )
            );
        }
    };
    /** dts2md break */
    /**
     * Returns the source matrix added the given scalar
     */
    export const plus = (
        source: Matrix,
        addition: number,
        output?: Matrix | null,
    ) => {
        sizeOf(source, _size1);
        if (output) {
            if (Common.inputCheck) {
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
                    (_, j) => source[i][j] + addition
                )
            );
        }
    };
    /** dts2md break */
    /**
     * Returns the matrix multiplication result of `m1 * m2`
     */
    export const matmul = (
        m1: Matrix,
        m2: Matrix,
        output?: Matrix | null,
    ) => {
        sizeOf(m1, _size1);
        sizeOf(m2, _size2);
        if (Common.inputCheck) {
            Common.assertSameDimension(_size1[1], _size2[0]);
        }
        if (output) {
            if (Common.inputCheck) {
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
            );
        }
    };
    /** dts2md break */
    /**
     * Returns the sum of the given matrices
     * (element-wise addition)
     */
    export const sum = (
        matrices: Matrix[],
        output?: Matrix | null,
    ) => {
        if (!matrices.length) {
            throw new RangeError('no matrices provided');
        }
        const m0 = matrices[0];
        sizeOf(m0, _size1);
        const result = output || init(_size1[0], _size1[1]);
        if (output && Common.inputCheck) {
            sizeOf(output, _size2);
            Common.assertSameDimension(_size2[0], _size1[0]);
            Common.assertSameDimension(_size2[1], _size1[1]);
        }
        for (let i = 0; i < _size1[0]; i++) {
            for (let j = 0; j < _size1[1]; j++) {
                result[i][j] = m0[i][j];
            }
        }
        for (let k = 1; k < matrices.length; k++) {
            const m = matrices[k];
            if (Common.inputCheck) {
                sizeOf(m, _size2);
                Common.assertSameDimension(_size2[0], _size1[0]);
                Common.assertSameDimension(_size2[1], _size1[1]);
            }
            for (let i = 0; i < _size1[0]; i++) {
                for (let j = 0; j < _size1[1]; j++) {
                    result[i][j] += m[i][j];
                }
            }
        }
        return result;
    };
    /** dts2md break */
    /**
     * Returns the substraction of the given matrices
     * (element-wise substraction; `result = m0 - m1 - m2 - ...`)
     */
    export const substraction = (
        matrices: Matrix[],
        output?: Matrix | null,
    ) => {
        if (!matrices.length) {
            throw new RangeError('no matrices provided');
        }
        const m0 = matrices[0];
        sizeOf(m0, _size1);
        const result = output || init(_size1[0], _size1[1]);
        if (output && Common.inputCheck) {
            sizeOf(output, _size2);
            Common.assertSameDimension(_size2[0], _size1[0]);
            Common.assertSameDimension(_size2[1], _size1[1]);
        }
        for (let i = 0; i < _size1[0]; i++) {
            for (let j = 0; j < _size1[1]; j++) {
                result[i][j] = m0[i][j];
            }
        }
        for (let k = 1; k < matrices.length; k++) {
            const m = matrices[k];
            if (Common.inputCheck) {
                sizeOf(m, _size2);
                Common.assertSameDimension(_size2[0], _size1[0]);
                Common.assertSameDimension(_size2[1], _size1[1]);
            }
            for (let i = 0; i < _size1[0]; i++) {
                for (let j = 0; j < _size1[1]; j++) {
                    result[i][j] -= m[i][j];
                }
            }
        }
        return result;
    };
    /** dts2md break */
    /**
     * Returns the transpose of the source matrix
     */
    export const transpose = (source: Matrix, output?: Matrix | null) => {
        sizeOf(source, _size1);
        if (output) {
            if (Common.inputCheck) {
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
            );
        }
    };
    /** dts2md break */
    /**
     * Returns the result of the corresponding determinant of the matrix
     */
    export const det = (matrix: Matrix) => {
        sizeOf(matrix, _size1);
        const n = _size1[0];
        if (Common.inputCheck) {
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
                const m = clone(matrix, null);
                const lastIndex = n - 1;
                let a = 1;
                let negative = false;
                for (let i = 0; i < lastIndex; i++) {
                    if (!m[i][i]) { // first element is zero
                        let j;
                        for (j = i + 1; j < n; j++) {
                            if (m[j][i]) { // find nonzero and swap
                                const t = m[j];
                                m[j] = m[i];
                                m[i] = t;
                                negative = !negative;
                                break;
                            }
                        }
                        if (j === n) { // all zero
                            return 0;
                        }
                    }
                    const b = m[i][i];
                    a *= b;
                    for (let j = i + 1; j < n; j++) { // transform
                        if (m[j][i]) {
                            const c = m[j][i] / b;
                            m[j][i] = 0;
                            for (let k = i + 1; k < n; k++) {
                                m[j][k] -= m[i][k] * c;
                            }
                        }
                    }
                }
                a *= m[lastIndex][lastIndex];
                return negative ? -a : a;
            }
        }
    };
    /** dts2md break */
    /**
     * Get the reduced row echelon form of the given matrix
     * (using Gauss-Jordan elimination)
     */
    export const RREF = (source: Matrix, output?: Matrix) => {
        sizeOf(source, _size1);
        const m = _size1[0];
        const n = _size1[1];
        if (output && Common.inputCheck) {
            sizeOf(output, _size2);
            Common.assertSameDimension(_size2[0], m);
            Common.assertSameDimension(_size2[1], n);
        }
        const result = output || clone(source);
        const lastRowIndex = m - 1;
        let k = 0;
        for (let i = 0; i < n; i++) {
            if (i >= m) {
                break;
            }
            if (!result[k][i]) { // first element is zero
                let j, t;
                for (j = k + 1; j < m; j++) { // find nonzero and swap
                    if (result[j][k]) {
                        t = result[j];
                        result[j] = result[k];
                        result[k] = t;
                        break;
                    }
                }
                if (k < lastRowIndex && j === m) { // all zero
                    continue;
                }
            }
            if (result[k][i] !== 1) { // normalize
                const c = result[k][i];
                result[k][i] = 1;
                let l;
                for (l = i + 1; l < n; l++) {
                    result[k][l] /= c;
                }
            }
            for (let j = 0; j < m; j++) { // transform
                if (k !== j && result[j][i]) {
                    const c = result[j][i];
                    result[j][i] = 0;
                    let l;
                    for (l = i + 1; l < n; l++) {
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
     * Returns the inverse matrix of the source matrix
     * (returns `null` if the inverse matrix doesn't exist)
     */
    export const inv = (source: Matrix, output?: Matrix) => {
        sizeOf(source, _size1);
        const n = _size1[0];
        if (Common.inputCheck) {
            Common.assertSameDimension(n, _size1[1]);
        }
        if (output && Common.inputCheck) {
            sizeOf(output, _size2);
            Common.assertSameDimension(_size2[0], n);
            Common.assertSameDimension(_size2[1], n);
            identity(n, output);
        }
        const result = output || identity(n);
        const m = clone(source, null);
        const lastIndex = n - 1;
        for (let i = 0; i < n; i++) {
            if (!m[i][i]) { // first element is zero
                let j, t;
                for (j = i + 1; j < n; j++) { // find nonzero and swap
                    if (m[j][i]) {
                        t = m[j];
                        m[j] = m[i];
                        m[i] = t;
                        t = result[j];
                        result[j] = result[i];
                        result[i] = t;
                        break;
                    }
                }
                if (i < lastIndex && j === n) { // all zero
                    return null;
                }
            }
            if (m[i][i] !== 1) { // normalize
                const c = m[i][i];
                m[i][i] = 1;
                let k;
                for (k = i + 1; k < n; k++) {
                    m[i][k] /= c;
                }
                for (k = 0; k < n; k++) {
                    result[i][k] /= c;
                }
            }
            for (let j = 0; j < n; j++) { // transform
                if (i !== j && m[j][i]) {
                    const c = m[j][i];
                    m[j][i] = 0;
                    let k;
                    for (k = i + 1; k < n; k++) {
                        m[j][k] -= m[i][k] * c;
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
     * Get the diagonal of the given matrix
     */
    export const diag = (matrix: Matrix, output?: Vector) => {
        sizeOf(matrix, _size1);
        const n = Math.min(_size1[0], _size1[1]);
        if (output) {
            if (Common.inputCheck) {
                Common.assertSameDimension(output.length, n);
            }
            for (let i = 0; i < n; i++) {
                output[i] = matrix[i][i];
            }
            return output;
        } else {
            const result = new Array(n);
            for (let i = 0; i < n; i++) {
                result[i] = matrix[i][i];
            }
            return result;
        }
    };

}
