"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent"
];
/**
 * 解析 http headers
 *
 * @param headers string
 */
exports.parseHeaders = function (headers) {
    var parsed = {};
    if (!headers) {
        return parsed;
    }
    var key;
    var value;
    var i;
    utils_1.eachCall(headers.split("\n"), function (line) {
        i = line.indexOf(":");
        key = utils_1.trim(line.substr(0, i).toLowerCase());
        value = utils_1.trim(line.substr(i + 1));
        if (key) {
            if (parsed[key] && ignoreDuplicateOf.includes(key)) {
                return;
            }
            if (key === "set-cookie") {
                parsed[key] = (parsed[key] ? parsed[key] : []).concat([value]);
            }
            else {
                parsed[key] = parsed[key] ? parsed[key] + ", " + value : value;
            }
        }
    });
    return parsed;
};
