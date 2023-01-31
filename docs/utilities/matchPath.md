---
title: matchPath
---

类型定义：
```typescript
declare function matchPath<
  ParamKey extends string = string
>(
  pattern: PathPattern | string,
  pathname: string
): PathMatch<ParamKey> | null;

interface PathMatch<ParamKey extends string = string> {
  params: Params<ParamKey>;
  pathname: string;
  pattern: PathPattern;
}

interface PathPattern {
  path: string;
  caseSensitive?: boolean;
  end?: boolean;
}
```
`matchPath`根据URL路径名（`pathname`）匹配路由路径模式，并返回有关匹配的信息。**当你需要手动运行路由器（`router`）的匹配算法来确定路由路径是否匹配时，这是非常有用的。如果模式不匹配给定的路径名，它将返回null。🤩**。

[useMatch](../4/useMatch) 钩子在内部使用这个函数来匹配相对于当前位置（`location`）的路由路径。

2022年08月02日22:42:35
