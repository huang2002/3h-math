// @ts-check
const { test } = require('3h-test');
const { Matrix } = /** @type {import('..')} */(
    /** @type {unknown} */(require('../dist/3h-math.umd.js'))
);

test({
    verbose: false,
}, {

    init(context) {
        context.assertDeepEqual(Matrix.init(2, 2), [[0, 0], [0, 0]]);
        context.assertDeepEqual(Matrix.init(2, 2, 1), [[1, 1], [1, 1]]);
        context.assertDeepEqual(
            Matrix.init(2, 2, (i, j) => i * 10 + j),
            [[0, 1], [10, 11]]
        );
        context.expectThrow(RangeError, Matrix.init, [1, -1]);
        context.expectThrow(RangeError, Matrix.init, [-1, 1]);
        context.expectThrow(RangeError, Matrix.init, [1, 0]);
    },

    identity(context) {
        const n = 3;
        const m1 = Matrix.identity(n);
        context.assertStrictEqual(m1.length, n);
        context.assertStrictEqual(m1[0].length, n);
        context.assert(
            m1.every((row, i) => row.every(
                (x, j) => (x === +(i === j))
            ))
        );
        const m2 = [[0, 1], [2, 3]];
        context.assertStrictEqual(Matrix.identity(2, m2), m2);
        context.assertDeepEqual(m2, [[1, 0], [0, 1]]);
        context.expectThrow(RangeError, Matrix.identity, [0]);
        context.expectThrow(RangeError, Matrix.identity, [-1]);
        context.expectThrow(RangeError, Matrix.identity, [2, [[0]]]);
        context.expectThrow(RangeError, Matrix.identity, [2, [[0], [0]]]);
        context.expectThrow(RangeError, Matrix.identity, [2, [[0, 0]]]);
    },

    clone(context) {
        context.assertDeepEqual(Matrix.clone([[0, 1], [2, 3]]), [[0, 1], [2, 3]]);
        const m = [[0, 0], [0, 0]];
        context.assertStrictEqual(Matrix.clone([[0, 1], [2, 3]], m), m);
        context.assertDeepEqual(m, [[0, 1], [2, 3]]);
        context.expectThrow(RangeError, Matrix.clone, [[[0, 1], [2, 3]], [[0]]]);
    },

    vstack(context) {
        const m = [[0, 0], [0, 0]];
        const m1 = [[0, 1]];
        const m2 = [[2, 3]];
        const m3 = [[4, 5]];
        context.assertDeepEqual(Matrix.vstack([m1, m2, m3]), [[0, 1], [2, 3], [4, 5]]);
        context.assertDeepEqual(m1, [[0, 1]]);
        context.assertDeepEqual(Matrix.vstack([m1]), m1);
        context.assertDeepEqual(m1, [[0, 1]]);
        context.assertStrictEqual(Matrix.vstack([m1, m2], m), m);
        context.assertDeepEqual(m, [[0, 1], [2, 3]]);
        context.expectThrow(RangeError, Matrix.vstack, [[]]);
        context.expectThrow(RangeError, Matrix.vstack, [[m1, [[]]]]);
        context.expectThrow(RangeError, Matrix.vstack, [[m1, m2], [[0, 1]]]);
    },

    hstack(context) {
        const m = [[0, 0], [0, 0]];
        const m1 = [[0], [3]];
        const m2 = [[1], [4]];
        const m3 = [[2], [5]];
        context.assertDeepEqual(Matrix.hstack([m1, m2, m3]), [[0, 1, 2], [3, 4, 5]]);
        context.assertDeepEqual(m1, [[0], [3]]);
        context.assertDeepEqual(Matrix.hstack([m1]), m1);
        context.assertDeepEqual(m1, [[0], [3]]);
        context.assertStrictEqual(Matrix.hstack([m1, m2], m), m);
        context.assertDeepEqual(m, [[0, 1], [3, 4]]);
        context.expectThrow(RangeError, Matrix.hstack, [[]]);
        context.expectThrow(RangeError, Matrix.hstack, [[m1, [[]]]]);
        context.expectThrow(RangeError, Matrix.hstack, [[m1, m2], [[0], [1]]]);
    },

    sizeOf(context) {
        context.assertShallowEqual(Matrix.sizeOf([[0, 1, 2], [3, 4, 5]]), [2, 3]);
        context.assertShallowEqual(Matrix.sizeOf([[0, 1], [2, 3], [4, 5]]), [3, 2]);
        context.assertShallowEqual(Matrix.sizeOf([[0, 1, 2]]), [1, 3]);
        context.assertShallowEqual(Matrix.sizeOf([[0], [1], [2]]), [3, 1]);
        const v = /** @type {import('..').Vector2} */([0, 0]);
        context.assertStrictEqual(Matrix.sizeOf([[0, 1], [2, 3]], v), v);
        context.assertShallowEqual(v, [2, 2]);
    },

    forEach(context) {
        let count = 0;
        const m = [[0, 1], [2, 3], [4, 5]];
        Matrix.forEach(m, (x, i, j, _m) => {
            context.assertStrictEqual(i * 2 + j, count);
            context.assertStrictEqual(x, _m[i][j]);
            context.assertStrictEqual(_m, m);
            count++;
        });
        context.assertStrictEqual(count, 6);
    },

    map(context) {
        const m = [[0, 1], [2, 3]];
        context.assertDeepEqual(Matrix.map(m, x => x * 2), [[0, 2], [4, 6]]);
        context.assertDeepEqual(m, [[0, 1], [2, 3]]);
        context.assertStrictEqual(Matrix.map(m, x => -x, m), m);
        context.assertDeepEqual(m, [[-0, -1], [-2, -3]]);
        context.expectThrow(RangeError, Matrix.map, [m, x => x, [[0]]]);
    },

    multiply(context) {
        const m = [[0, 1], [2, 3]];
        context.assertDeepEqual(Matrix.multiply(m, 0), [[0, 0], [0, 0]]);
        context.assertDeepEqual(m, [[0, 1], [2, 3]]);
        context.assertStrictEqual(Matrix.multiply(m, 2, m), m);
        context.assertDeepEqual(m, [[0, 2], [4, 6]]);
        context.expectThrow(RangeError, Matrix.multiply, [m, 6, [[0]]]);
    },

    plus(context) {
        const m = [[0, 1], [2, 3]];
        context.assertDeepEqual(Matrix.plus(m, 1), [[1, 2], [3, 4]]);
        context.assertDeepEqual(m, [[0, 1], [2, 3]]);
        context.assertStrictEqual(Matrix.plus(m, 2, m), m);
        context.assertDeepEqual(m, [[2, 3], [4, 5]]);
        context.expectThrow(RangeError, Matrix.plus, [m, 5, [[0]]]);
    },

    matmul(context) {
        const m1 = [[0, 1, 2], [3, 4, 5]];
        const m2 = [[0, 0], [0, 0]];
        context.assertDeepEqual(
            Matrix.matmul(m1, [[0, 1], [2, 3], [4, 5]]),
            [[10, 13], [28, 40]]
        );
        context.assertDeepEqual(m1, [[0, 1, 2], [3, 4, 5]]);
        context.assertStrictEqual(Matrix.matmul(m1, [[6, 7], [8, 9], [10, 11]], m2), m2);
        context.assertDeepEqual(m2, [[28, 31], [100, 112]]);
        context.expectThrow(RangeError, Matrix.matmul, [m1, [[0, 0], [0, 0], [0, 0]], [[0]]]);
    },

    sum(context) {
        const m = [[0, 1, 2], [3, 4, 5]];
        context.assertDeepEqual(
            Matrix.sum([m, [[6, 7, 8], [9, 10, 11]]]),
            [[6, 8, 10], [12, 14, 16]]
        );
        context.assertDeepEqual(m, [[0, 1, 2], [3, 4, 5]]);
        context.assertStrictEqual(Matrix.sum([m, [[6, 7, 8], [9, 10, 11]]], m), m);
        context.assertDeepEqual(m, [[6, 8, 10], [12, 14, 16]]);
        context.expectThrow(RangeError, Matrix.sum, [[]]);
        context.expectThrow(RangeError, Matrix.sum, [[[[0, 1], [2, 3]]], [[0]]]);
        context.expectThrow(RangeError, Matrix.sum, [[[[0, 1], [2, 3]], [[0]]]]);
    },

    substraction(context) {
        const m = [[6, 7, 8], [9, 10, 11]];
        context.assertDeepEqual(
            Matrix.substraction([m, [[5, 4, 3], [2, 1, 0]]]),
            [[1, 3, 5], [7, 9, 11]]
        );
        context.assertDeepEqual(m, [[6, 7, 8], [9, 10, 11]]);
        context.assertStrictEqual(Matrix.substraction([m, [[5, 4, 3], [2, 1, 0]]], m), m);
        context.assertDeepEqual(m, [[1, 3, 5], [7, 9, 11]]);
        context.expectThrow(RangeError, Matrix.substraction, [[]]);
        context.expectThrow(RangeError, Matrix.substraction, [[[[0, 1], [2, 3]]], [[0]]]);
        context.expectThrow(RangeError, Matrix.substraction, [[[[0, 1], [2, 3]], [[0]]]]);
    },

    transpose(context) {
        context.assertDeepEqual(
            Matrix.transpose([[0, 1], [2, 3], [4, 5]]),
            [[0, 2, 4], [1, 3, 5]]
        );
        context.assertDeepEqual(Matrix.transpose([[0]]), [[0]]);
        context.expectThrow(RangeError, Matrix.transpose, [[[0, 1], [2, 3]], [[0]]]);
    },

    det(context) {
        context.assertStrictEqual(Matrix.det([[6]]), 6);
        context.assertStrictEqual(Matrix.det([[1, 2], [3, 4]]), -2);
        context.assertStrictEqual(Matrix.det([[1, 2, 3], [2, 3, 1], [3, 1, 2]]), -18);
        context.assertStrictEqual(
            Matrix.det([[1, 2, 3, 4], [2, 3, 4, 1], [3, 4, 1, 2], [4, 1, 2, 3]]),
            160
        );
        context.expectThrow(RangeError, Matrix.det, [[[0, 1, 2], [3, 4, 5]]]);
    },

    RREF(context) {
        const m1 = [[1, 2, 3], [4, 5, 6]];
        context.assertDeepEqual(Matrix.RREF(m1), [[1, 0, -1], [0, 1, 2]]);
        context.assertDeepEqual(m1, [[1, 2, 3], [4, 5, 6]]);
        const m2 = [[8, 1, 6], [3, 5, 7], [4, 9, 2]];
        context.assertStrictEqual(Matrix.RREF(m2, m2), m2);
        context.assertDeepEqual(m2, [[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
        context.assertDeepEqual(
            Matrix.RREF([
                [1, 1, 0, -3, -1],
                [1, -1, 2, -1, 0],
                [4, -2, 6, 3, -4],
                [2, 4, -2, 4, -7]
            ]),
            [
                [1, 0, 1, 0, -1.1666666666666665],
                [0, 1, -1, 0, -0.8333333333333333],
                [0, 0, 0, 1, -0.3333333333333333],
                [0, 0, 0, 0, 0]
            ]
        );
        context.expectThrow(RangeError, Matrix.RREF, [m2, m1]);
    },

    inv(context) {
        context.assertDeepEqual(Matrix.inv([[1, 2], [3, 4]]), [[-2, 1], [1.5, -.5]]);
        const m1 = [[1, 2, 4], [2, 4, 9], [6, 4, 3]];
        const expected = [[-3, 1.25, 0.25], [6, -2.625, -0.125], [-2, 1, 0]];
        context.assertDeepEqual(Matrix.inv(m1), expected);
        context.assertDeepEqual(m1, [[1, 2, 4], [2, 4, 9], [6, 4, 3]]);
        const m2 = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        context.assertStrictEqual(Matrix.inv(m1, m2), m2);
        context.assertDeepEqual(m2, expected);
    },

    diagonal(context) {
        context.assertShallowEqual(Matrix.diag([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), [1, 5, 9]);
        context.assertShallowEqual(Matrix.diag([[1, 2, 3], [4, 5, 6]]), [1, 5]);
        context.assertShallowEqual(Matrix.diag([[1, 2], [3, 4,], [5, 6]]), [1, 4]);
        context.assertShallowEqual(Matrix.diag([[1, 2, 3]]), [1]);
        context.assertShallowEqual(Matrix.diag([[1], [2], [3]]), [1]);
    },

});
