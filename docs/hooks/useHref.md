---
title: useHref
---

类型定义：
```typescript
declare function useHref(
  to: To,
  options?: { relative?: RelativeRoutingType }
): string;
```
::: details 其它类型

```typescript
// 通过 `history.push` 或者 `history.replace` 描述某个导航的目的地location
// 可能是一个URL或者URL路径片段
type To = string | Partial<Path>;

interface Path {
  // 路径名，以 `/` 开头
  pathname: string;
  // URL搜索字符串，以 `?` 开头
  search: string;
  // URL Hash，以 `#` 开头
  hash: string;
}

declare type RelativeRoutingType = "route" | "path";
```

:::

`useHref` 钩子返回一个URL，可以用来链接到给定的 `to` location，甚至在React Router外。

::: tip
你可能有兴趣查看一下`react-router-dom`中 `<Link>` 组件的源代码，看看它如何在内部使用`useHref`来确定自己的`href`值。
:::



updateAt: 2023年02月03日14:06:46