"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var semver = /^v?(?:\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+))?(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;
var indexOrEnd = function (string, letter) {
    return string.indexOf(letter) === -1 ? string.length : string.indexOf(letter);
};
var split = function (version) {
    var c = version.replace(/^v/, "").replace(/\+.*$/, "");
    var patchIndex = indexOrEnd(c, "-");
    var splits = c.substring(0, patchIndex).split(".");
    splits.push(c.substring(patchIndex + 1));
    return splits;
};
var tryParse = function (version) {
    return isNaN(Number(version)) ? version : Number(version);
};
var assertValidate = function (version) {
    if (typeof version !== "string") {
        throw new TypeError("Invalid argument expected string.");
    }
    if (!semver.test(version)) {
        throw new Error("Invalid argument not valid semver ${version} received.");
    }
};
/**
 * 版本比较
 *
 * - `0`：版本相等
 * - `-1`：`v2` 新于 `v1`
 * - `1`：`v2` 旧于 `v1`
 *
 * > 当 版本带有 `pre-release` 等 后缀时，其版本判定为老于没有后缀的版本号
 *
 * @param v1 any
 * @param v2 any
 */
exports.compare = function (v1, v2) {
    [v1, v2].forEach(assertValidate);
    var s1 = split(v1);
    var s2 = split(v2);
    for (var i = 0; i < Math.max(s1.length - 1, s2.length - 1); i++) {
        var n1 = parseInt(s1[i] || "0", 10);
        var n2 = parseInt(s2[i] || "0", 10);
        if (n1 > n2)
            return 1;
        if (n2 > n1)
            return -1;
    }
    var sp1 = s1[s1.length - 1];
    var sp2 = s2[s2.length - 1];
    if (sp1 && sp2) {
        var p1 = sp1.split(".").map(tryParse);
        var p2 = sp2.split(".").map(tryParse);
        for (i = 0; i < Math.max(p1.length, p2.length); i++) {
            if (p1[i] === undefined ||
                (typeof p2[i] === "string" && typeof p1[i] === "number"))
                return -1;
            if (p2[i] === undefined ||
                (typeof p1[i] === "string" && typeof p2[i] === "number"))
                return 1;
            if (p1[i] > p2[i])
                return 1;
            if (p2[i] > p1[i])
                return -1;
        }
    }
    else if (sp1 || sp2) {
        return sp1 ? -1 : 1;
    }
    return 0;
};
