// @ts-check
const { test } = require('3h-test');
const { Vector } = /** @type {import('..')} */(
    /** @type {unknown} */(require('../dist/3h-math.umd.js'))
);

test({
    verbose: false,
}, {

    init(context) {
        context.assertShallowEqual(Vector.init(3), [0, 0, 0]);
        context.assertShallowEqual(Vector.init(2, 1), [1, 1]);
        context.assertShallowEqual(Vector.init(3, i => i), [0, 1, 2]);
        context.expectThrow(Vector.init, RangeError, [-1]);
        context.expectThrow(Vector.init, RangeError, [0]);
    },

    clone(context) {
        context.assertShallowEqual(Vector.clone([0, 1, 2]), [0, 1, 2]);
        const v = [0, 0];
        context.assertShallowEqual(Vector.clone([0, 1], v), v);
        context.assertShallowEqual(v, [0, 1]);
        context.expectThrow(Vector.clone, RangeError, [[0, 1], [0]]);
    },

    sizeOf(context) {
        context.assertStrictEqual(Vector.sizeOf([0, 1, 2]), 3);
        context.assertStrictEqual(Vector.sizeOf([0]), 1);
    },

    forEach(context) {
        let count = 0;
        const v = [1, 2, 3];
        Vector.forEach(v, (x, i, _v) => {
            context.assertStrictEqual(i, count);
            context.assertStrictEqual(x, _v[i]);
            context.assertStrictEqual(_v, v);
            count++;
        });
        context.assertStrictEqual(count, v.length);
    },

    map(context) {
        const v = [0, 1];
        context.assertShallowEqual(Vector.map(v, x => x + 1), [1, 2]);
        context.assertShallowEqual(v, [0, 1]);
        context.assertStrictEqual(Vector.map(v, x => -x, v), v);
        context.assertShallowEqual(v, [-0, -1]);
        context.expectThrow(Vector.map, RangeError, [v, x => x * 2, [0]]);
    },

    multiply(context) {
        const v = [1, 2];
        context.assertShallowEqual(Vector.multiply(v, 2), [2, 4]);
        context.assertShallowEqual(v, [1, 2]);
        context.assertStrictEqual(Vector.multiply(v, 3, v), v);
        context.assertShallowEqual(v, [3, 6]);
        context.expectThrow(Vector.multiply, RangeError, [v, 6, [0]]);
    },

    plus(context) {
        const v = [0, 1];
        context.assertShallowEqual(Vector.plus(v, 1), [1, 2]);
        context.assertShallowEqual(v, [0, 1]);
        context.assertStrictEqual(Vector.plus(v, 2, v), v);
        context.assertShallowEqual(v, [2, 3]);
        context.expectThrow(Vector.plus, RangeError, [v, 5, [0]]);
    },

    norm(context) {
        context.assertStrictEqual(Vector.norm([3, 4]), 5);
        context.assertStrictEqual(Vector.norm([0, 0, 0]), 0);
    },

    sum(context) {
        const v = [0, 1, 2];
        context.assertShallowEqual(Vector.sum([v, [3, 4, 5]]), [3, 5, 7]);
        context.assertShallowEqual(v, [0, 1, 2]);
        context.assertStrictEqual(Vector.sum([v, [6, 7, 8]], v), v);
        context.assertShallowEqual(v, [6, 8, 10]);
        context.expectThrow(Vector.sum, RangeError, [[]]);
    },

    substraction(context) {
        const v = [3, 4, 5];
        context.assertShallowEqual(Vector.substraction([v, [2, 1, 0]]), [1, 3, 5]);
        context.assertShallowEqual(v, [3, 4, 5]);
        context.assertStrictEqual(Vector.substraction([v, [1, 3, 5]], v), v);
        context.assertShallowEqual(v, [2, 1, 0]);
        context.expectThrow(Vector.substraction, RangeError, [[]]);
    },

    dot(context) {
        context.assertStrictEqual(Vector.dot([1, 2, 3], [4, 5, 6]), 32);
        context.assertStrictEqual(Vector.dot([1, 0, 1], [0, 1, 0]), 0);
        context.expectThrow(Vector.dot, RangeError, [[], [0, 1]]);
    },

    cross(context) {
        const v3 = /** @type {import('..').Vector3} */([1, 0, 0]);
        context.expectThrow(Vector.cross, RangeError, [[2, 4], [1, 3, 5]]);
        context.assertStrictEqual(Vector.cross([1, 2], [3, 4]), -2);
        context.assertStrictEqual(Vector.cross([5, 6], [7, 8]), -2);
        context.assertShallowEqual(Vector.cross(v3, [0, 1, 0]), [0, 0, 1]);
        context.assertShallowEqual(v3, [1, 0, 0]);
        context.assertStrictEqual(Vector.cross(v3, [0, 0, 1], v3), v3);
        context.assertShallowEqual(v3, [0, -1, 0]);
        // @ts-ignore
        context.expectThrow(Vector.cross, RangeError, [[0, 1, 1], [1, 0, 0], [0, 0]]);
    },

});
