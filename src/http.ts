import { eachCall, trim } from "./utils";

// c.f. https://nodejs.org/api/http.html#http_message_headers
const ignoreDuplicateOf = [
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
export const parseHeaders = (headers?: string): { [key: string]: string } => {
  const parsed: { [key: string]: any } = {};

  if (!headers) {
    return parsed;
  }
  let key: string;
  let value: string;
  let i: number;

  eachCall(headers.split("\n"), (line: string) => {
    i = line.indexOf(":");

    key = trim(line.substr(0, i).toLowerCase());
    value = trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.includes(key)) {
        return;
      }

      if (key === "set-cookie") {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([value]);
      } else {
        parsed[key] = parsed[key] ? `${parsed[key]}, ${value}` : value;
      }
    }
  });

  return parsed;
};
