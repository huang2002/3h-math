/**
 * Randomization-related APIs.
 */
export namespace Random {
    /** dts2md break */
    /**
     * Class of randomizers.
     */
    export class Randomizer {
        /** dts2md break */
        /**
         * Constructor of {@link Randomizer}.
         * (Default seed: `Date.now()`)
         */
        constructor(seed = Date.now()) {
            this.x = seed;
        }
        /** dts2md break */
        /**
         * Randomization parameter `m`.
         */
        m = 1 << 20;
        /** dts2md break */
        /**
         * Randomization parameter `p`.
         */
        p = 9;
        /** dts2md break */
        /**
         * Randomization parameter `q`.
         */
        q = 7;
        /** dts2md break */
        /**
         * Current value.
         */
        x: number;
        /** dts2md break */
        /**
         * Get next random value and save it in `this.x`.
         * (This is usually used internally and the utility
         * methods declared below may be more useful.)
         */
        next(): number {
            return this.x = (this.x * this.p + this.q) % this.m;
        };
        /** dts2md break */
        /**
         * Get a random float number in range [min, max).
         */
        float(min: number, max: number): number {
            return min + this.next() / this.m * (max - min);
        }
        /** dts2md break */
        /**
         * Get a random integer in range [min, max).
         */
        integer(min: number, max: number): number {
            return Math.floor(this.float(min, max));
        }
        /** dts2md break */
        /**
         * Get a random boolean value.
         */
        boolean(): boolean {
            return (this.next() / this.m) < .5;
        }
        /** dts2md break */
        /**
         * Get a random string. (consisting of 0-9, a-z and A-Z)
         */
        string(): string {
            return (this.next() / this.m)
                .toString(36)
                .slice(2);
        }
        /** dts2md break */
        /**
         * Get a random element from the given array.
         */
        choice<T>(choices: T[]): T {
            return choices[
                Math.floor(this.next() / this.m * choices.length)
            ];
        }

    }

}
