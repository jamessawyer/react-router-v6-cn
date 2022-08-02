---
title: Router
---

类型定义：

```typescript
declare function Router(
	props: RouterProps
): React.ReactElement | null

interface RouterProps {
  basename?: string;
  children?: React.ReactNode;
  location: Partial<Location> | string;
  navigationType?: NavigationType;
  navigator: Navigator;
  static?: boolean;
}
```

📒 `<Router>` 是一个底层的接口，它被所有路由组件共享（比如 `<BrowserRouter>` 和 `<StaticRouter>`）。就React而言，`<Router>` 是一个 [context provider](https://reactjs.org/docs/context.html#contextprovider)，用于提供应用路由信息🤩。

你可以永远不需要手动的渲染 `<Router>`。相反，你应当根据使用环境使用更上层的routers。对一个应用一般只需要一个router即可。

`<Router basename>` 属性可用于使你的应用中的所有路由和链接相对于它们都共享的 URL 路径名的 `base` 部分。这在使用React Router仅渲染较大应用的一部分或当你的应用具有多个入口点时很有用。Basenames不区分大小写。



2022年08月02日16:01:18

