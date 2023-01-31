---
title: Outlet
---

::: details 类型声明

```typescript
interface OutletProps {
  context?: unknown;
}

declare function Outlet(
  props: OutletProps
): React.ReactElement | null
```

:::



译者注：

::: tip

可以看出 Outlet 可以传入 `context` 属性

:::



📒 `<Outlet>`  应该在父路由元素中使用，以渲染其子路由元素。这允许在渲染子路由时显示嵌套UI。如果父路由完全匹配，它将渲染子索引路由，如果没有首路由（`index route`）则不渲染子首路由。

```jsx {8}
function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* 这个元素在URL为 `"/messages"` 时，渲染 <DashboardMessage>
      	为 `"/tasks"` 时 <DashboardTasks>, 如果是 "/" 什么也不渲染
      */}
      <Outlet />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route 
          path="message"
          element={<DashboardMessages />}
        />
        <Route path="tasks" element={<DashboardTasks />} />
      </Route>
    </Routes>
  )
}
```



2022年08月02日18:03:57
