export const removeNonChars = (variableName: string): string[] =>
  variableName.replace(/^\W+|\W+$/g, "").split(/,/);

/**
 * 解析 url 地址中的变量名称
 *
 * @param {String} url URL地址
 */
export const extractUrlVariableNames: (url: string) => string[] = (
  url: string
) => {
  const matches = url.match(/\{[^}]+\}/g);

  if (!matches) {
    return [];
  }

  return matches.map(removeNonChars).reduce((a, b) => a.concat(b), []);
};

/**
 * 向URL地址中添加查询参数
 *
 * @param {String} url URL 地址
 * @param {Object} parameters 查询对数对象
 */
export const addQueryParameters = (
  url: string,
  parameters: { [key: string]: any } = {}
) => {
  const separator = /\?/.test(url) ? "&" : "?";
  const names = Object.keys(parameters);

  if (names.length === 0) {
    return url;
  }

  const query = names
    .map(name => `${name}=${encodeURIComponent(parameters[name])}`)
    .join("&");

  return `${url}${separator}${query}`;
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
export const uniqueId = (length?: number, radix = 16): string => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
    ""
  );
  const segments: string[] = [];

  if (length === undefined) {
    segments[8] = segments[13] = segments[18] = segments[23] = "-";
    segments[14] = "4";

    for (let i = 0; i < 36; i += 1) {
      if (segments[i] === undefined) {
        const r = 0 | (Math.random() * 16);
        segments[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  } else {
    for (let i = 0; i < length; i += 1) {
      segments[i] = chars[0 | (Math.random() * radix)];
    }
  }
  return segments.join("");
};
