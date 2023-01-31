---
title: createRoutesFromChildren
---

类型声明：
```typescript
declare function createRoutesFromChildren(
  children: React.ReactNode
): RouteObject[];

interface RouteObject {
  caseSensitive?: boolean;
  children?: RouteObject[];
  element?: React.ReactNode;
  index?: boolean;
  path?: string;
}
```

`createRoutesFromChildren` 是一个辅助函数，用于从 `<Route>` 元素创建路由对象。它被用于 [\<Routes>](../3/Route-and-Routes) 元素内部，依据其 [\<Route>](../3/Route-and-Routes) 子元素生成路由对象🤩。

2022年08月03日09:32:47
