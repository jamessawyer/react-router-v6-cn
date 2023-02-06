---
title: useRoutes
---
类型声明：
```typescript
declare function useRoutes(
  routes: RouteObject[],
  location?: Partial<Location> | string
): React.ReactElement | null;
```
::: details 其它类型
```typescript
// 译者添加
declare type RouteObject = IndexRouteObject | NonIndexRouteObject;

// 译者添加
interface Path {
  pathname: string;
  search: string;
  hash: string;
}

// 译者添加
interface Location extends Path {
  state: any;
  key: string;
}
```
:::

👩🏻‍🏫 `useRoutes` 钩子是 `<Routes>` 的函数形式，但是它使用JS对象定义你的路由，而不是 [\<Route>](../components/Route-and-Routes) 元素，因此它不需要使用JSX。

`useRoutes` 的返回值要么是一个你可以用来渲染路由树的有效的React元素，要么没有匹配到则是 `null`。
```jsx
import * as React from 'react'
import { useRoutes } from 'react-router-dom'

function App() {
  let element = useRoutes([
    {
      path: '/',
      element: <Dashboard />,
      children: [
        {
          path: 'messages',
          element: <DashboardMessages />,
        },
        {
          path: 'tasks',
          element: <DashboardTasks />,
        }
      ]
    },
    { path: 'about', element: <AboutPage /> }
  ])

  return element
}
```

2022年08月02日21:38:15
