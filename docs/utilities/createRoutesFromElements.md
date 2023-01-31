---
title: createRoutesFromElements
---

## 1️⃣ createRoutesFromElements
`createRoutesFromElements` 是一个依据 `<Route>` 元素创建路由对象的辅助函数。如果你更偏好使用JSX形式，而不是对象形式创建路由配置：
```js {4,7,9,17}
import {
  createBrwoserRouter,
  RouterProvider,
  createRoutesFromElements,
} from 'react-router-dom'

// 1️⃣ 写成JSX形式
const router = createBrwoserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="about" element={<About />} />
    </Route>
  )
)

// 2️⃣ 也可以写成对象配置
const router = createBrwoserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'about',
        element: <About />
      },
    ]
  }
])
```
::: tip
👩‍🏫 它同样用于 [Routes](../components/Route-and-Routes) 内部，用于依据 `<Route>` 子元素中生成路由对象
:::

## 2️⃣ 类型定义
```typescript
declare function createRoutesFromElements(
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

2023年01月31日17:34:29
