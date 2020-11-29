// @ts-check
const { test } = require('3h-test');
const { Matrix } = require('..');

test({
    verbose: false,
}, {

    init(context) {
        context.assertJSONEqual(Matrix.init(2, 2), [[0, 0], [0, 0]]);
        context.assertJSONEqual(Matrix.init(2, 2, 1), [[1, 1], [1, 1]]);
        context.assertJSONEqual(
            Matrix.init(2, 2, (i, j) => i * 10 + j),
            [[0, 1], [10, 11]]
        );
        context.expectThrow(Matrix.init, RangeError, [1, -1]);
        context.expectThrow(Matrix.init, RangeError, [-1, 1]);
        context.expectThrow(Matrix.init, RangeError, [1, 0]);
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
        context.assertJSONEqual(m2, [[1, 0], [0, 1]]);
        context.expectThrow(Matrix.identity, RangeError, [0]);
        context.expectThrow(Matrix.identity, RangeError, [-1]);
        context.expectThrow(Matrix.identity, RangeError, [2, [[0]]]);
        context.expectThrow(Matrix.identity, RangeError, [2, [[0], [0]]]);
        context.expectThrow(Matrix.identity, RangeError, [2, [[0, 0]]]);
    },

    clone(context) {
        context.assertJSONEqual(Matrix.clone([[0, 1], [2, 3]]), [[0, 1], [2, 3]]);
        const m = [[0, 0], [0, 0]];
        context.assertStrictEqual(Matrix.clone([[0, 1], [2, 3]], m), m);
        context.assertJSONEqual(m, [[0, 1], [2, 3]]);
        context.expectThrow(Matrix.clone, RangeError, [[[0, 1], [2, 3]], [[0]]]);
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
        context.assertJSONEqual(Matrix.map(m, x => x * 2), [[0, 2], [4, 6]]);
        context.assertJSONEqual(m, [[0, 1], [2, 3]]);
        context.assertStrictEqual(Matrix.map(m, x => -x, m), m);
        context.assertJSONEqual(m, [[-0, -1], [-2, -3]]);
        context.expectThrow(Matrix.map, RangeError, [m, x => x, [[0]]]);
    },

    multiply(context) {
        const m = [[0, 1], [2, 3]];
        context.assertJSONEqual(Matrix.multiply(m, 0), [[0, 0], [0, 0]]);
        context.assertJSONEqual(m, [[0, 1], [2, 3]]);
        context.assertStrictEqual(Matrix.multiply(m, 2, m), m);
        context.assertJSONEqual(m, [[0, 2], [4, 6]]);
        context.expectThrow(Matrix.multiply, RangeError, [m, 6, [[0]]]);
    },

    plus(context) {
        const m = [[0, 1], [2, 3]];
        context.assertJSONEqual(Matrix.plus(m, 1), [[1, 2], [3, 4]]);
        context.assertJSONEqual(m, [[0, 1], [2, 3]]);
        context.assertStrictEqual(Matrix.plus(m, 2, m), m);
        context.assertJSONEqual(m, [[2, 3], [4, 5]]);
        context.expectThrow(Matrix.plus, RangeError, [m, 5, [[0]]]);
    },

    matmul(context) {
        const m1 = [[0, 1, 2], [3, 4, 5]];
        const m2 = [[0, 0], [0, 0]];
        context.assertJSONEqual(
            Matrix.matmul(m1, [[0, 1], [2, 3], [4, 5]]),
            [[10, 13], [28, 40]]
        );
        context.assertJSONEqual(m1, [[0, 1, 2], [3, 4, 5]]);
        context.assertStrictEqual(Matrix.matmul(m1, [[6, 7], [8, 9], [10, 11]], m2), m2);
        context.assertJSONEqual(m2, [[28, 31], [100, 112]]);
        context.expectThrow(Matrix.matmul, RangeError, [m1, [[0, 0], [0, 0], [0, 0]], [[0]]]);
    },

    sum(context) {
        const m = [[0, 1, 2], [3, 4, 5]];
        context.assertJSONEqual(
            Matrix.sum([m, [[6, 7, 8], [9, 10, 11]]]),
            [[6, 8, 10], [12, 14, 16]]
        );
        context.assertJSONEqual(m, [[0, 1, 2], [3, 4, 5]]);
        context.assertStrictEqual(Matrix.sum([m, [[6, 7, 8], [9, 10, 11]]], m), m);
        context.assertJSONEqual(m, [[6, 8, 10], [12, 14, 16]]);
        context.expectThrow(Matrix.sum, RangeError, [[]]);
        context.expectThrow(Matrix.sum, RangeError, [[[[0, 1], [2, 3]]], [[0]]]);
        context.expectThrow(Matrix.sum, RangeError, [[[[0, 1], [2, 3]], [[0]]]]);
    },

    transpose(context) {
        context.assertJSONEqual(
            Matrix.transpose([[0, 1], [2, 3], [4, 5]]),
            [[0, 2, 4], [1, 3, 5]]
        );
        context.assertJSONEqual(Matrix.transpose([[0]]), [[0]]);
        context.expectThrow(Matrix.transpose, RangeError, [[[0, 1], [2, 3]], [[0]]]);
    },

    det(context) {
        context.assertStrictEqual(Matrix.det([[6]]), 6);
        context.assertStrictEqual(Matrix.det([[1, 2], [3, 4]]), -2);
        context.assertStrictEqual(Matrix.det([[1, 2, 3], [2, 3, 1], [3, 1, 2]]), -18);
        context.assertStrictEqual(
            Matrix.det([[1, 2, 3, 4], [2, 3, 4, 1], [3, 4, 1, 2], [4, 1, 2, 3]]),
            160
        );
        context.expectThrow(Matrix.det, RangeError, [[[0, 1, 2], [3, 4, 5]]]);
    },

    RREF(context) {
        const m1 = [[1, 2, 3], [4, 5, 6]];
        context.assertJSONEqual(Matrix.RREF(m1), [[1, 0, -1], [0, 1, 2]]);
        context.assertJSONEqual(m1, [[1, 2, 3], [4, 5, 6]]);
        const m2 = [[8, 1, 6], [3, 5, 7], [4, 9, 2]];
        context.assertStrictEqual(Matrix.RREF(m2, m2), m2);
        context.assertJSONEqual(m2, [[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
        context.expectThrow(Matrix.RREF, RangeError, [m2, m1]);
    },

    inv(context) {
        context.assertJSONEqual(Matrix.inv([[1, 2], [3, 4]]), [[-2, 1], [1.5, -.5]]);
        const m1 = [[1, 2, 4], [2, 4, 9], [6, 4, 3]];
        const expected = [[-3, 1.25, 0.25], [6, -2.625, -0.125], [-2, 1, 0]];
        context.assertJSONEqual(Matrix.inv(m1), expected);
        context.assertJSONEqual(m1, [[1, 2, 4], [2, 4, 9], [6, 4, 3]]);
        const m2 = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        context.assertStrictEqual(Matrix.inv(m1, m2), m2);
        context.assertJSONEqual(m2, expected);
    },

    diagonal(context) {
        context.assertShallowEqual(Matrix.diag([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), [1, 5, 9]);
        context.assertShallowEqual(Matrix.diag([[1, 2, 3], [4, 5, 6]]), [1, 5]);
        context.assertShallowEqual(Matrix.diag([[1, 2], [3, 4,], [5, 6]]), [1, 4]);
        context.assertShallowEqual(Matrix.diag([[1, 2, 3]]), [1]);
        context.assertShallowEqual(Matrix.diag([[1], [2], [3]]), [1]);
    },

});
