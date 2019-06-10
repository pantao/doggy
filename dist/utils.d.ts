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
/**
 * 模拟 UUID 生成随机伪UUID
 *
 * 这真的只是一个模拟 UUID 的格式生成的随机字符串，并不能保证每一次结果真的都是唯一的，但是在同一个系统中
 * 使用，生成同样值的概率还是足够小了，请谨慎使用。
 *
 * @param length number
 * @param radix number
 */
export declare const uniqueId: (length?: number | undefined, radix?: number) => string;
/**
 * 为 authorization token 添加类型前缀
 *
 * @param authorization token
 */
export declare const withAuthorizationPrefix: (authorization: string) => string;
//# sourceMappingURL=utils.d.ts.map