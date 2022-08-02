---
title: useInRouterContext
---

类型定义：
```typescript
declare function useInRouterContext(): boolean;
```

如果组件在一个 `<Router>` 上下文被渲染，则 `useInRouterContext` 钩子返回 `true`，否则返回 `false`。这对于一些需要知道它们是否在React Router应用的上下文中渲染的第三方扩展来说是很有用的。

2022年08月02日21:52:04
