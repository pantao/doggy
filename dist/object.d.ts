export declare const deepEqual: (a: any, b: any) => boolean;
/**
 * 将对象的所有 key 转为纯小写的 key
 *
 * @param {Object} object 待转换的对象
 */
export declare const lowercaseKeys: (object: {
    [key: string]: any;
}) => {
    [key: string]: any;
};
export declare const omit: (object: {
    [key: string]: any;
}, keysToOmit: string[]) => {};
/**
 * 为认证字串添加前缀
 *
 * @param {String} authorization 认证字串
 */
export declare const withAuthorizationPrefix: (authorization: string) => string;
/**
 * 将值转换成为类型名称（小写字母）
 *
 * @param {any} object 待转换的值
 */
//# sourceMappingURL=object.d.ts.map