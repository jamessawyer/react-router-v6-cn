---
title: RouterProvider
---

## 1️⃣ \<RouterProvider>
所有的router对象都会传递给这个组件，用于渲染你的应用，并使应用支持其余的APIs。
```js {3,24}
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'about',
        element: <About />,
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider 
    router={router} 
    fallbackElement={<BigSpinner />}
  />
)
```

## 2️⃣ fallbackElement
如果你的应用不是服务端渲染。`DataBrowserRouter` 会在挂载时发起所有正在匹配的路由loaders。在此迁建，你可以提供一个 `fallbackElement` 告诉用户应用正在运作中。让静态托管TTFB变得重要!

```js {3}
<RouterProvider 
  router={router} 
  fallbackElement={<SpinnerofDoom />}
/>
```

2023年01月31日17:04:53