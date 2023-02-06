---
title: resolvePath
---

类型定义：
```typescript
declare function resolvePath(
  to: To,
  fromPathname?: string
): Path;

type To = string | Partial<Path>

interface Path {
  pathname: string;
  search: string;
  hash: string;
}
```

📒`resolvePath` 将给定的 `To` 值解析为具有绝对路径名的实际 `Path` 对象。当你需要知道相对 `To` 值的确切路径时有用。比如，`<Link>` 组件使用这个函数知道它实际指向的URL。😎

[useResolvedPath](../hooks/useResolvedPath) 钩子内部使用 `resolvePath` 解析路径名。如果 `to` 包含一个路径名（`pathname`），它会根据当前路由路径名被解析。否则，它会根据当前URL(`location.pathname`) 被解析。

2022年08月02日23:41:29
