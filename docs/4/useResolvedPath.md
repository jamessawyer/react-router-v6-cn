---
title: useResolvedPath
---

类型定义：
```typescript
declare function useResolvedPath(to: To): Path;
```

📒 该钩子根据当前位置的路径名（`pathname`）解析给定`to`值中位置的路径名。
这对从相对值构建链接时有用。比如，查看 [NavLink](../3/NavLink) 组件源码，它内部调用 `useResolvedPath` 解析被链接页面的完整路径名。

查看 [resolvePath](../5/resolvePath) 了解更多。

2022年08月02日23:32:58
