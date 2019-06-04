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
