import { Common } from './Common';

export type Vector = number[];
export type Vector2 = [number, number];
export type Vector3 = [number, number, number];
/** dts2md break */
export namespace Vector {
    /** dts2md break */
    type VectorInitializer = (index: number) => number;
    /** dts2md break */
    /**
     * Create a vector of the given dimensions
     * initialized by provided initializer
     * (or filled with zero)
     */
    export const init = (
        dimension: number,
        initializer: number | VectorInitializer = 0,
    ) => {
        if (Common.inputCheck) {
            Common.validateDimension(dimension);
        }
        const result = new Array<number>(dimension);
        if (typeof initializer === 'function') {
            for (let i = 0; i < dimension; i++) {
                result[i] = initializer(i);
            }
        } else {
            for (let i = 0; i < dimension; i++) {
                result[i] = initializer;
            }
        }
        return result;
    };
    /** dts2md break */
    /**
     * Fill the given vector with provided value
     * @returns the given vector itself
     */
    export const fill = (vector: Vector, value: number) => {
        for (let i = 0; i < vector.length; i++) {
            vector[i] = value;
        }
        return vector;
    };
    /** dts2md break */
    /**
     * Clone the source vector
     */
    export const clone = (source: Vector, output?: Vector | null) => {
        if (output) {
            if (Common.inputCheck) {
                Common.assertSameDimension(source.length, output.length);
            }
            for (let i = 0; i < source.length; i++) {
                output[i] = source[i];
            }
            return output;
        } else {
            return source.slice();
        }
    };
    /** dts2md break */
    /**
     * Returns the size(dimension) of the given vector
     */
    export const sizeOf = (vector: Vector) => vector.length;
    /** dts2md break */
    export type ForEachCallback =
        (component: number, index: number, vector: Vector) => void;
    /** dts2md break */
    /**
     * Iterates each component of the given vector
     */
    export const forEach = (vector: Vector, callback: ForEachCallback) => {
        vector.forEach(callback);
    };
    /** dts2md break */
    export type MapCallback =
        (component: number, index: number, vector: Vector) => number;
    /** dts2md break */
    /**
     * Map the source vector into a new one
     */
    export const map = (
        source: Vector,
        callback: MapCallback,
        output?: Vector | null,
    ) => {
        const result = output || new Array<number>(source.length);
        if (output && Common.inputCheck) {
            Common.assertSameDimension(source.length, output.length);
        }
        for (let i = 0; i < source.length; i++) {
            result[i] = callback(source[i], i, source);
        }
        return result as Vector;
    };
    /** dts2md break */
    /**
     * Returns the source vector multiplied
     * by the given multiplier(scalar)
     */
    export const multiply = (
        source: Vector,
        multiplier: number,
        output?: Vector | null,
    ) => {
        let result = output;
        if (result) {
            if (Common.inputCheck) {
                Common.assertSameDimension(source.length, result.length);
            }
        } else {
            result = Vector.init(source.length);
        }
        for (let i = 0; i < source.length; i++) {
            result[i] = source[i] * multiplier;
        }
        return result;
    };
    /** dts2md break */
    /**
     * Returns the source vector added the given scalar
     */
    export const plus = (
        source: Vector,
        addition: number,
        output?: Vector | null,
    ) => {
        let result = output;
        if (result) {
            if (Common.inputCheck) {
                Common.assertSameDimension(source.length, result.length);
            }
        } else {
            result = Vector.init(source.length);
        }
        for (let i = 0; i < source.length; i++) {
            result[i] = source[i] + addition;
        }
        return result;
    };
    /** dts2md break */
    /**
     * Returns the norm of the given vector
     */
    export const norm = (vector: Vector) => {
        let s = 0;
        for (let i = 0; i < vector.length; i++) {
            s += vector[i] ** 2;
        }
        return Math.sqrt(s);
    };
    /** dts2md break */
    /**
     * Returns the sum of the given vectors
     */
    export const sum = (vectors: Vector[], output?: Vector | null) => {
        if (!vectors.length) {
            throw new RangeError('no vectors provided');
        }
        let result = output;
        const d0 = vectors[0].length;
        if (Common.inputCheck) {
            Common.validateDimension(d0);
        }
        if (result) {
            if (Common.inputCheck) {
                Common.assertSameDimension(d0, result.length);
            }
        } else {
            result = vectors[0].slice();
        }
        for (let i = 1; i < vectors.length; i++) {
            const vector = vectors[i];
            if (Common.inputCheck) {
                Common.assertSameDimension(d0, vector.length);
            }
            for (let j = 0; j < vector.length; j++) {
                result[j] += vector[j];
            }
        }
        return result;
    };
    /** dts2md break */
    /**
     * Returns the substraction of the given vectors
     * (`result = v0 - v1 - v2 - ...`)
     */
    export const substraction = (vectors: Vector[], output?: Vector | null) => {
        if (!vectors.length) {
            throw new RangeError('no vectors provided');
        }
        let result = output;
        const d0 = vectors[0].length;
        if (Common.inputCheck) {
            Common.validateDimension(d0);
        }
        if (result) {
            if (Common.inputCheck) {
                Common.assertSameDimension(d0, result.length);
            }
        } else {
            result = vectors[0].slice();
        }
        for (let i = 1; i < vectors.length; i++) {
            const vector = vectors[i];
            if (Common.inputCheck) {
                Common.assertSameDimension(d0, vector.length);
            }
            for (let j = 0; j < vector.length; j++) {
                result[j] -= vector[j];
            }
        }
        return result;
    };
    /** dts2md break */
    /**
     * Returns the dot product of the given vectors
     */
    export const dot = (v1: Vector, v2: Vector) => {
        if (Common.inputCheck) {
            Common.assertSameDimension(v1.length, v2.length);
            Common.validateDimension(v1.length);
        }
        return v1.reduce((y, x, i) => (y + x * v2[i]), 0);
    };
    /** dts2md break */
    /**
     * Returns the cross product of the given vectors
     */
    export const cross = (v1: Vector, v2: Vector, output?: Vector) => {
        if (Common.inputCheck) {
            Common.assertSameDimension(v1.length, v2.length);
        }
        if (v1.length === 2) {
            const result = v1[0] * v2[1] - v1[1] * v2[0];
            if (output) {
                if (Common.inputCheck) {
                    Common.assertSameDimension(output.length, 1);
                }
                output[0] = result;
                return output;
            } else {
                return result;
            }
        } else if (v1.length === 3) {
            const x = v1[1] * v2[2] - v1[2] * v2[1];
            const y = v1[2] * v2[0] - v1[0] * v2[2];
            const z = v1[0] * v2[1] - v1[1] * v2[0];
            if (output) {
                if (Common.inputCheck) {
                    Common.assertSameDimension(output.length, 3);
                }
                output[0] = x;
                output[1] = y;
                output[2] = z;
                return output;
            } else {
                return [x, y, z] as Vector3;
            }
        } else {
            throw new RangeError('unsupported cross operation');
        }
    };

}
