/**
 * Common utilities.
 */
export namespace Common {
    /** dts2md break */
    /**
     * Whether to check input data.
     * (Validation can be disabled to improve performance
     * at the cost of potential errors.)
     * @default true
     */
    export let checkInput = true;
    /** dts2md break */
    /**
     * Type of array initializers.
     */
    export type ArrayInitializer<T> = (_: void, index: number) => T;
    /** dts2md break */
    /**
     * Create an array of the given length and
     * initialize each element using provided initializer.
     */
    export const createArray = <T>(
        length: number,
        initializer: ArrayInitializer<T>,
    ) => Array.from({ length }, initializer);
    /** dts2md break */
    /**
     * Assert that the given two dimensions are equal.
     */
    export const assertSameDimension = (d1: number, d2: number) => {
        if (d1 !== d2) {
            throw new RangeError(
                `dimensions don't match (${d1} !== ${d2})`
            );
        }
    };
    /** dts2md break */
    /**
     * Asserts that the given dimension is valid.
     */
    export const validateDimension = (dimension: number) => {
        if ((dimension <= 0) || !Number.isInteger(dimension)) {
            throw new RangeError(
                `invalid dimension (${dimension})`
            );
        }
    };

}
