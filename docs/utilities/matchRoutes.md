---
title: matchRoutes
---

类型声明：
```typescript
declare function matchRoutes(
  routes: RouteObject[],
  location: Partial<Location> | string,
  basename?: string
): RouteMatch[] | null;

interface RouteMatch<ParamKey extends string = string> {
  params: Params<ParamKey>;
  pathname: string;
  route: RouteObject;
}
```

`matchRoutes` 对给定的 [location](./Location) 运行路由匹配算法，以查看哪些路由(如果有的话)匹配。如果发现匹配，返回 `RouteMatch` 数组对象，每个匹配的路由都有一个。

这是React Router匹配算法的核心🤩。它被用于 [useRoutes](../hooks/useRoutes) 和 [Routes 组件](../components/Route-and-Routes) 内部，决定当前location匹配了哪些routes。
😎在需要手动匹配一组路由的某些情况下，它也很有用。

2022年08月03日10:05:39
