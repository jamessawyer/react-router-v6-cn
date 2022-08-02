---
title: Route&Routes
---

`Routes` & `Route` 类型定义

::: details 类型声明
```typescript
declare function Routes(
  props: RoutesProps
): React.ReactElement | null

interface RoutesProps {
  children?: React.ReactNode;
  location?: Partial<Location> | string;
}

declare function Route(
  props: RouteProps
): React.ReactElement | null

interface RouteProps {
  caseSensitive?: boolean;
  children?: React.ReactNode;
  element?: React.ReactNode | null;
  index?: boolean;
  path?: string;
}
```
:::
`<Routes>` 和 `<Route>` 是React Router中依据当前 `location` 渲染元素的主要范式😎。
- 你可以认为 `<Route>` 类似于 `if` 语句；如果 `path` 和当前URL能匹配，则它会渲染其 **元素（`element`）**！
- `<Route caseSensitive>` 属性用于决定匹配是否大小写敏感（默认是 `false`）

🚀每当 `location` 发生变化时，`<Routes>` 都会查找所有的 `children <Route>` ，找出最佳匹配，并渲染该分支对应的UI。`<Route>` 元素可以嵌套表示嵌套UI，也相对于嵌套的URL路径。父路由通过渲染一个 [\<Outlet>](./Outlet) 组件来渲染它们的子路由。
```jsx
<Routes>
  <Route path="/" element={<Dashboard />}>
    <Route path="messages" element={<DashboardMessages />} />
    <Route path="tasks" element={<DashboardTasks />} />
  </Route>
  <Route path="about" element={<AboutPage />} />
</Routes>
```
::: tip
🔥 如果你更喜欢通过普通的JS对象定义路由，而不是JSX形式，你可以使用 [useRoutes()](../4/useRoutes)
:::
📚 `<Route element>` 默认是一个 [\<Outlet>](./Outlet)。这意味着即使不存在显式的 `element` 属性，该路由仍会渲染其子元素，所以你可以嵌套路由路径，而不用在子路由元素周围嵌套UI。🤔
例如，下面配置，父路由默认渲染一个 `<Outlet>`，所以子路由将在没有任何UI的情况下渲染。但是子路由的路径是`/users/:id`，因为它仍然构建在其父路由的基础上。
```jsx
<Route path="users">
  <Route path=":id" element={<UserProfile />} />
</Route>
```

2022年08月02日21:22:05
