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
