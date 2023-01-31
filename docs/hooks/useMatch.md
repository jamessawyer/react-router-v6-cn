---
title: ⚡useMatch
---
类型定义：
```typescript
declare function useMatch<
  ParamKey extends string = string
>(
  pattern: PathPattern | string
): PathMatch<ParamKey> | null;

// 译者添加
interface PathMatch<ParamKey extends string = string> {
  params: Params<ParamKey>;
  pathname: string;
  pattern: PathPattern;
}

// 译者添加
interface PathPattern {
  path: string;
  caseSensitive?: boolean;
  end?: boolean;
}
```
返回与给定路径上的路由相对于当前位置的匹配数据。
查看 [matchPath](../5/matchPath) 了解更多。

2022年08月02日22:32:54
