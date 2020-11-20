export namespace Random {
    /** dts2md break */
    export class Randomizer {
        /** dts2md break */
        /**
         * @param seed randomization seed (default: `Date.now()`)
         */
        constructor(seed = Date.now()) {
            this.x = seed;
        }
        /** dts2md break */
        /**
         * Randomization parameters
         */
        m = 1 << 20;
        p = 9;
        q = 7;
        /** dts2md break */
        /**
         * Current random value
         */
        x: number;
        /** dts2md break */
        /**
         * Get next random value and save it in `this.x`
         * (This is usually used internally and the utility
         * methods declared below may be more useful)
         */
        next = () => {
            return this.x = (this.x * this.p + this.q) % this.m;
        };
        /** dts2md break */
        /**
         * Get a random float number in [min, max)
         */
        float = (min: number, max: number) => (
            min + this.next() / this.m * (max - min)
        );
        /** dts2md break */
        /**
         * Get a random integer in [min, max)
         */
        integer = (min: number, max: number) => (
            Math.floor(this.float(min, max))
        );
        /** dts2md break */
        /**
         * Get a random boolean value
         */
        boolean = () => (this.next() / this.m < .5);
        /** dts2md break */
        /**
         * Get a random string (consisting of 0-9, a-z and A-Z)
         */
        string = () => this.next().toString(36).slice(2);
        /** dts2md break */
        /**
         * Get a random element from the given array(`choices`)
         */
        choice = <T>(choices: T[]) => (
            choices[Math.floor(this.next() / this.m * choices.length)]
        );

    }

}
