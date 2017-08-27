'use strict';

QUnit.module('Тестируем функцию plain', function () {
    QUnit.test('Работает с единственным элементом', function (assert) {
        assert.deepEqual(plain([]), [], 'Работает с пустым массивом');
        assert.deepEqual(plain([42]), [42], 'Работает с массивом из одного элемента');
        assert.deepEqual(plain([1, 2, 3, 4]), [1, 2, 3, 4], 'Сохраняет порядок элементов');
    });

    QUnit.test('Работает с единственным массивом', function (assert) {
        assert.deepEqual(plain([[]]), []);
        assert.deepEqual(plain([[42]]), [42]);
        assert.deepEqual(plain([[1, 2, 3, 4]]), [1, 2, 3, 4]);
    });

    QUnit.test('Работает со смешанными значениями', function (assert) {
        assert.deepEqual(plain([[], 42]), [42]);
        assert.deepEqual(plain([[42], 0]), [42, 0]);
        assert.deepEqual(plain([[1, 2, 3, 4], 5, 6, 7, 8]), [1, 2, 3, 4, 5, 6, 7, 8]);
    });

    QUnit.test('Работает с несколькими массивами', function (assert) {
        assert.deepEqual(plain([[], []]), [], 'Работает с пустыми массивами');
        assert.deepEqual(plain([[42], [42]]), [42, 42]);
        assert.deepEqual(plain([[42, 42], [42]]), [42, 42, 42]);
        assert.deepEqual(plain([[1], [2], [3], [4, 5, 6]]), [1, 2, 3, 4, 5, 6]);
    });

    QUnit.test('Работает с вложенными массивами', function (assert) {
        assert.deepEqual(plain([[], [[], [], []]]), [], 'Работает с пустыми массивами');
        assert.deepEqual(plain([[42], [[42], [], [42]], [42]]), [42, 42, 42, 42]);
        assert.deepEqual(plain([[42, 42], [42, [42, [42, 42], 42]]]), [42, 42, 42, 42, 42, 42, 42]);
        assert.deepEqual(plain([[1], [2], [3], [4, 5, [6, 7, 8, [9]], 10], 11]), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    });

    QUnit.test('Работает с элементами разных типов', function (assert) {
        assert.deepEqual(plain([['abcde'], [['f'], [null, false], [NaN, NaN], NaN], -Infinity]), ['abcde', 'f', null, false, NaN, NaN, NaN, -Infinity]);
    });

    QUnit.test('Еще немного тестов', function (assert) {
        assert.deepEqual(plain(["abcde", [[[[[["plain", [[[1]]]]]]]]]]), ["abcde", "plain", 1], 'Работает с очень глубокими массивами');
        assert.deepEqual(plain(["abcde" + "abc", [1 + 2]]), ["abcdeabc", 3],  'Работает с вычисляемыми значениями' );
        assert.deepEqual(plain([[NaN], "a"[0]]), [NaN, "a"]);
    });
});
