// @ts-check
const { test, TestContext } = require('3h-test');
const { Random } = require('..');

const SEED = 20021011;
const randomizer = new Random.Randomizer(SEED);

const SAMPLE_COUNT = 10;

/**
 * @param {()=>number} fn
 * @param {number} min
 * @param {number} max
 */
const createRandomTest = (fn, min, max) => (
    /**
     * @param {TestContext} context
     */
    context => {
        for (let i = 0; i < SAMPLE_COUNT; i++) {
            const value = fn();
            context.assert(value >= min, `${value} < ${min}`);
            context.assert(value < max, `${value} >= ${max}`);
        }
    }
);

test({
    verbose: false,
}, {

    float: createRandomTest(() => randomizer.float(0, 10), 0, 10),

    integer: createRandomTest(() => randomizer.integer(0, 100), 0, 100),

    boolean(context) {
        for (let i = 0; i < SAMPLE_COUNT; i++) {
            const value = randomizer.boolean();
            context.assert(value === true || value === false);
        }
    },

    string(context) {
        const pattern = /^[0-9a-zA-Z]+$/;
        for (let i = 0; i < SAMPLE_COUNT; i++) {
            const value = randomizer.string();
            context.assert(pattern.test(value));
        }
    },

    choice(context) {
        const choices = [6, 66, 666, 6666, 66666, 666666];
        for (let i = 0; i < SAMPLE_COUNT; i++) {
            const choice = randomizer.choice(choices);
            context.assert(choices.includes(choice));
        }
    },

});
