export declare const removeNonChars: (variableName: string) => string[];
/**
 * 解析 url 地址中的变量名称
 *
 * @param {String} url URL地址
 */
export declare const extractUrlVariableNames: (url: string) => string[];
/**
 * 向URL地址中添加查询参数
 *
 * @param {String} url URL 地址
 * @param {Object} parameters 查询对数对象
 */
export declare const addQueryParameters: (url: string, parameters?: {
    [key: string]: any;
}) => string;
//# sourceMappingURL=utils.d.ts.map