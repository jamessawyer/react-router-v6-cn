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
```
返回与给定路径上的路由相对于当前位置的匹配数据。
查看 [matchPath](../5/matchPath) 了解更多。

2022年08月02日22:32:54
