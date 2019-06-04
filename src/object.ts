import * as base64 from "./base64";

export const deepEqual: (a: any, b: any) => boolean = (a, b) => {
  if (a === b) {
    return true;
  }

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  if (a !== Object(a) || b !== Object(b)) {
    return false;
  }

  const props = Object.keys(a);

  if (props.length !== Object.keys(b).length) {
    return false;
  }

  return props.every(prop => deepEqual(a[prop], b[prop]));
};

/**
 * 将对象的所有 key 转为纯小写的 key
 *
 * @param {Object} object 待转换的对象
 */
export const lowercaseKeys = (object: {
  [key: string]: any;
}): { [key: string]: any } =>
  !object
    ? {}
    : Object.keys(object).reduce(
        (newObj, key) => ({
          ...newObj,
          [key.toLowerCase()]: object[key]
        }),
        {}
      );

export const omit = (
  object: {
    [key: string]: any;
  },
  keysToOmit: string[]
) =>
  Object.keys(object)
    .filter(option => !keysToOmit.includes(option))
    .reduce(
      (obj, key) => ({
        ...obj,
        [key]: object[key]
      }),
      {}
    );

/**
 * 为认证字串添加前缀
 *
 * @param {String} authorization 认证字串
 */
export const withAuthorizationPrefix = (authorization: string) => {
  if (/^(basic|bearer|token) /i.test(authorization)) {
    return authorization;
  }

  try {
    // TODO: 这里需要从 `./helpers.js` 中定义一个能适配各个平台的 `atob` 方法
    if (/^[\w-]+:/.test(base64.decode(authorization))) {
      return `basic ${authorization}`;
    }
    // eslint-disable-next-line no-empty
  } catch (eror) {}

  if (authorization.split(/\./).length === 3) {
    return `bearer ${authorization}`;
  }

  return `token ${authorization}`;
};

/**
 * 将值转换成为类型名称（小写字母）
 *
 * @param {any} object 待转换的值
 */
// export const classToType = (object: any): string =>
//   "Boolean Number String Function Array Date RegExp Object"
//     .split(" ")
//     .map(c => [`[object ${c}]`, c.toLowerCase()])
//     .reduce((a, b) => ({ ...a, [b[0]]: b[1] }), {})[
//     Object.prototype.toString.call(object)
//   ];

// /**
//  * 包装函数为单次执行函数
//  *
//  * ```js
//  * const fn = (a, b) => a + b
//  * const ofn = once(fn)
//  *
//  * console.log(ofn(1, 2)) // => 3
//  * console.log(ofn(2, 5)) // => 3
//  *
//  * const ofns = once(fn, true)
//  *
//  * console.log(ofns(1, 2)) // => 3
//  * console.log(ofns(2, 5)) // => Uncaught Error: fn shouldn't be called more than once
//  * ```
//  *
//  * @param {Function} fn 该包装的函数
//  * @param {Boolean} strict 是否严格模式
//  */
// export const once = (fn, strict = false) => {
//   const fun = (...args) => {
//     if (fun.called) {
//       if (strict) {
//         throw new Error(fun.onceError)
//       }
//       return fun.value
//     }
//     fun.called = true
//     fun.value = fn.apply(this, args)
//     return fun.value
//   }

//   const name = fn.name || 'Function wrapped with "once"'
//   fun.onceError = `${name} shouldn't be called more than once`
//   fun.called = false
//   return fun
// }

// /**
//  * 节流
//  *
//  * @param {Function} fn 需要节流的函数
//  * @param {Number} wait 阈值
//  */
// export const throttle = (fn, wait = 250) => {
//   let pending = false
//   let result

//   return (...args) => {
//     if (pending) {
//       return result
//     }

//     pending = true

//     result = fn.call(...args)

//     setTimeout(() => {
//       pending = false
//     }, wait)

//     return result
//   }
// }

// /**
//  * 防抖
//  *
//  * @param {Function} fn 需要防抖的函数
//  * @param {Number} wait 阈值
//  */
// export const debounce = (fn, wait = 250) => {
//   let timerId

//   return (...args) => {
//     if (timerId) {
//       clearTimeout(timerId)

//       timerId = null
//     }
//     timerId = setTimeout(() => {
//       fn.call(...args)
//     }, wait)
//   }
// }

// export const extend = (...args) => {
//   let options;
//   let name;
//   let src;
//   let copy;
//   let copyIsArray;
//   let clone;
//   let target = args[0] || {};
//   let i = 1;
//   const { length } = args;
//   let deep = false;

//   if (typeof target === "boolean") {
//     deep = target;
//     target = args[1] || {};
//     i = 2;
//   }

//   if (Object(target) !== target && classToType(target) !== "function") {
//     target = {};
//   }
//   if (length === i) {
//     target = this;
//     i -= 1;
//   }

//   for (; i < length; i += 1) {
//     options = args[i];
//     if (options !== null) {
//       const keys = Object.keys(options);
//       for (i = 0; i < keys.length; i += 1) {
//         name = keys[i];
//         src = target[name];
//         copy = options[name];

//         if (target !== copy) {
//           copyIsArray = isArray(copy);
//           if (deep && copy && (isPlainObject(copy) || copyIsArray)) {
//             if (copyIsArray) {
//               copyIsArray = false;
//               clone = src && isArray(src) ? src : [];
//             } else {
//               clone = src && isPlainObject(src) ? src : {};
//             }

//             target[name] = extend(deep, clone, copy);
//           } else if (copy !== undefined) {
//             target[name] = copy;
//           }
//         }
//       }
//     }
//   }

//   return target;
// };
