# Doggy Toolkit (狗具)

Doggy Toolkit is a util library wrote in typescript.

## Usage

```js
import doggy from "doggy-toolkit";

doggy.is.mobile("13456788675");

doggy.object.deepEqual(foo, bar);

doggy.base64.encode("btoa");

doggy.patterns.MOBILE.test("13432343234");
```

## 说明

这个项目也就是因为公司的项目都是基于 TypeScript 的，所以，把一些常用的库，比如 `lodash` 里面的一些最常用的方法、`isObject`、`extends` 之类的拿 TypeScript 重写了一遍，然后都放在这一个库里，方便公司其它项目使用，所以，无法保证工具包能像别的库那样精简，也没法保证工具包会像别的库那样完善，请自行斟酌是否选用。
