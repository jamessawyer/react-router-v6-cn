---
title: createSearchParams
---

类型声明：
```typescript
declare function createSearchParams(
  init?: URLSearchParamsInit
): URLSearchParams;
```
::: tip
关于 `URLSearchParamsInit` & `URLSearchParams` 类型定义，可以参考 [useSearchParams](../4/useSearchParams)
:::

`createSearchParams` 是对 [new URLSearchParams(init)](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams) 很薄的一层包装，它也支持使用数组对象值。这个函数与`useSearchParams` 内部用于从 `URLSearchParamsInit` 值创建`URLSearchParams` 对象的函数是相同的。

2022年08月03日09:43:22
