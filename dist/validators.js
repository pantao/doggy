"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var patterns_1 = require("./patterns");
exports.prcCitizenID = function (value) {
    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
    var checkCode = value.substring(17).toUpperCase();
    if (patterns_1.PRC_CITIZEN_ID.test(value)) {
        var parityIndex = value
            .substring(0, 17)
            .split("")
            .map(function (number, index) { return parseInt(number) * factor[index]; })
            .reduce(function (a, b) { return a + b; }, 0) % 11;
        return "" + parity[parityIndex] === "" + checkCode;
    }
    return false;
};
