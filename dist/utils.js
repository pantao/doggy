"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeNonChars = function (variableName) {
    return variableName.replace(/^\W+|\W+$/g, "").split(/,/);
};
/**
 * 解析 url 地址中的变量名称
 *
 * @param {String} url URL地址
 */
exports.extractUrlVariableNames = function (url) {
    var matches = url.match(/\{[^}]+\}/g);
    if (!matches) {
        return [];
    }
    return matches.map(exports.removeNonChars).reduce(function (a, b) { return a.concat(b); }, []);
};
/**
 * 向URL地址中添加查询参数
 *
 * @param {String} url URL 地址
 * @param {Object} parameters 查询对数对象
 */
exports.addQueryParameters = function (url, parameters) {
    if (parameters === void 0) { parameters = {}; }
    var separator = /\?/.test(url) ? "&" : "?";
    var names = Object.keys(parameters);
    if (names.length === 0) {
        return url;
    }
    var query = names
        .map(function (name) { return name + "=" + encodeURIComponent(parameters[name]); })
        .join("&");
    return "" + url + separator + query;
};
/**
 * 模拟 UUID 生成随机伪UUID
 *
 * 这真的只是一个模拟 UUID 的格式生成的随机字符串，并不能保证每一次结果真的都是唯一的，但是在同一个系统中
 * 使用，生成同样值的概率还是足够小了，请谨慎使用。
 *
 * @param length number
 * @param radix number
 */
exports.uniqueId = function (length, radix) {
    if (radix === void 0) { radix = 16; }
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    var segments = [];
    if (length === undefined) {
        segments[8] = segments[13] = segments[18] = segments[23] = "-";
        segments[14] = "4";
        for (var i = 0; i < 36; i += 1) {
            if (segments[i] === undefined) {
                var r = 0 | (Math.random() * 16);
                segments[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    else {
        for (var i = 0; i < length; i += 1) {
            segments[i] = chars[0 | (Math.random() * radix)];
        }
    }
    return segments.join("");
};
