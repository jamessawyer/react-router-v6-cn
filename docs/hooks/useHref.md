---
title: useHref
---

类型定义：
```typescript
declare function useHref(to: To): string;

// 译者添加
type To = string | Partial<Path>

// 译者添加
interface Path {
  pathname: string;
  search: string;
  hash: string;
}
```
`useHref` 钩子返回一个URL，可以用来链接到给定的 `to` location，甚至在React Router外。

::: tip
你可能有兴趣查看一下`react-router-dom`中 `<Link>` 组件的源代码，看看它如何在内部使用`useHref`来确定自己的`href`值。
:::