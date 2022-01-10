import { Common } from './Common';

/**
 * Type of vectors.
 */
export type Vector = number[];
/** dts2md break */
/**
 * Type of 2D vectors.
 */
export type Vector2 = [number, number];
/** dts2md break */
/**
 * Type of 3D vectors.
 */
export type Vector3 = [number, number, number];
/** dts2md break */
/**
 * Vector-related APIs.
 */
export namespace Vector {
    /** dts2md break */
    /**
     * Type of vector initializers.
     */
    type VectorInitializer = (index: number) => number;
    /** dts2md break */
    /**
     * Create a vector of the given dimensions
     * and initialize it using the given initializer.
     * (Default initializer: `0`.)
     */
    export const init = (
        dimension: number,
        initializer: number | VectorInitializer = 0,
    ): Vector => {

        if (Common.checkInput) {
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
     * Fill the given vector with specific value.
     * @returns The given vector itself.
     */
    export const fill = <SourceType extends Vector>(
        vector: SourceType,
        value: number,
    ): SourceType => {
        for (let i = 0; i < vector.length; i++) {
            vector[i] = value;
        }
        return vector;
    };
    /** dts2md break */
    /**
     * Clone the source vector.
     */
    export const clone = <OutputType extends Vector = Vector>(
        source: Vector,
        output?: OutputType | null,
    ): OutputType => {

        if (output) {

            if (Common.checkInput) {
                Common.assertSameDimension(source.length, output.length);
            }

            for (let i = 0; i < source.length; i++) {
                output[i] = source[i];
            }

            return output;

        } else {
            return source.slice() as OutputType;
        }

    };
    /** dts2md break */
    /**
     * Returns the size(dimension) of the given vector.
     */
    export const sizeOf = (vector: Vector): number => (vector.length);
    /** dts2md break */
    /**
     * Type of callbacks for `Vector.forEach`.
     */
    export type ForEachCallback<SourceType extends Vector> = (
        component: number,
        index: number,
        vector: SourceType,
    ) => void;
    /** dts2md break */
    /**
     * Iterates each component of the given vector.
     */
    export const forEach = <SourceType extends Vector>(
        vector: SourceType,
        callback: ForEachCallback<SourceType>,
    ) => {
        vector.forEach((component, index) => {
            callback(component, index, vector);
        });
    };
    /** dts2md break */
    /**
     * Type of callbacks for `Vector.map`.
     */
    export type MapCallback<SourceType extends Vector> = (
        component: number,
        index: number,
        vector: SourceType,
    ) => number;
    /** dts2md break */
    /**
     * Map the source vector into a new one.
     */
    export const map = <SourceType extends Vector, OutputType extends Vector = Vector>(
        source: SourceType,
        callback: MapCallback<SourceType>,
        output?: OutputType | null,
    ): OutputType => {

        const result = output ?? (new Array<number>(source.length) as OutputType);

        if (output && Common.checkInput) {
            Common.assertSameDimension(source.length, output.length);
        }

        for (let i = 0; i < source.length; i++) {
            result[i] = callback(source[i], i, source);
        }

        return result;

    };
    /** dts2md break */
    /**
     * Returns the result of the source vector
     * multiplies the given scalar. (component-wise)
     */
    export const multiply = <OutputType extends Vector = Vector>(
        source: Vector,
        multiplier: number,
        output?: OutputType | null,
    ): OutputType => {

        const result = output ?? (Vector.init(source.length) as OutputType);

        if (output && Common.checkInput) {
            Common.assertSameDimension(source.length, result.length);
        }

        for (let i = 0; i < source.length; i++) {
            result[i] = source[i] * multiplier;
        }

        return result;

    };
    /** dts2md break */
    /**
     * Returns the result of the source vector
     * adds the given scalar. (component-wise)
     */
    export const plus = <OutputType extends Vector = Vector>(
        source: Vector,
        addition: number,
        output?: OutputType | null,
    ): OutputType => {

        const result = output ?? (Vector.init(source.length) as OutputType);

        if (result && Common.checkInput) {
            Common.assertSameDimension(source.length, result.length);
        }

        for (let i = 0; i < source.length; i++) {
            result[i] = source[i] + addition;
        }

        return result;

    };
    /** dts2md break */
    /**
     * Returns the norm of the given vector.
     */
    export const norm = (vector: Vector): number => {
        let s = 0;
        for (let i = 0; i < vector.length; i++) {
            s += vector[i] ** 2;
        }
        return Math.sqrt(s);
    };
    /** dts2md break */
    /**
     * Returns the sum of the given vectors.
     */
    export const sum = <OutputType extends Vector = Vector>(
        vectors: Vector[],
        output?: OutputType | null,
    ): OutputType => {

        if (!vectors.length) {
            throw new RangeError('no vectors provided');
        }

        const d0 = vectors[0].length;
        if (Common.checkInput) {
            Common.validateDimension(d0);
        }

        const result = output ?? (vectors[0].slice() as OutputType);

        if (output && Common.checkInput) {
            Common.assertSameDimension(d0, result.length);
        }

        for (let i = 1; i < vectors.length; i++) {
            const vector = vectors[i];
            if (Common.checkInput) {
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
     * Returns the substraction of the given vectors.
     * (`result = v0 - v1 - v2 - ...`)
     */
    export const substraction = <OutputType extends Vector = Vector>(
        vectors: Vector[],
        output?: OutputType | null,
    ): OutputType => {

        if (!vectors.length) {
            throw new RangeError('no vectors provided');
        }

        const d0 = vectors[0].length;
        if (Common.checkInput) {
            Common.validateDimension(d0);
        }

        const result = output ?? (vectors[0].slice() as OutputType);

        if (output && Common.checkInput) {
            Common.assertSameDimension(d0, result.length);
        }

        for (let i = 1; i < vectors.length; i++) {
            const vector = vectors[i];
            if (Common.checkInput) {
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
     * Returns the dot product of the given two vectors.
     */
    export const dot = (v1: Vector, v2: Vector) => {
        if (Common.checkInput) {
            Common.validateDimension(v1.length);
            Common.assertSameDimension(v1.length, v2.length);
        }
        return v1.reduce(
            (y, x, i) => (y + x * v2[i]),
            0,
        );
    };
    /** dts2md break */
    /**
     * Type of `Vector.cross`.
     */
    export interface Cross {
        (v1: Vector2, v2: Vector2, output?: null): number;
        <OutputType extends Vector3 = Vector3>(
            v1: Vector3,
            v2: Vector3,
            output?: OutputType | null,
        ): OutputType;
    }
    /** dts2md break */
    /**
     * Returns the cross product of the given two vectors.
     */
    export const cross: Cross = <OutputType extends Vector3 = Vector3>(
        v1: Vector,
        v2: Vector,
        output?: OutputType | null,
    ): number | OutputType => {

        if (Common.checkInput) {
            Common.assertSameDimension(v1.length, v2.length);
        }

        if (v1.length === 2) {

            if (output && Common.checkInput) {
                console.warn('extra output option');
            }

            return v1[0] * v2[1] - v1[1] * v2[0];

        } else if (v1.length === 3) {

            const x = v1[1] * v2[2] - v1[2] * v2[1];
            const y = v1[2] * v2[0] - v1[0] * v2[2];
            const z = v1[0] * v2[1] - v1[1] * v2[0];

            if (output) {

                if (Common.checkInput) {
                    Common.assertSameDimension(output.length, 3);
                }

                output[0] = x;
                output[1] = y;
                output[2] = z;

                return output;

            } else {
                return [x, y, z] as OutputType;
            }

        } else {
            throw new RangeError('unsupported cross operation');
        }

    };

}
