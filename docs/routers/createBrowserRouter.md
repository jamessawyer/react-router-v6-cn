---
title: createBrowserRouter
---

## 1️⃣ createBrowserRouter

这是所有web应用推荐使用的路由器。它使用DOM History接口更新URL和管理history栈。

同时它支持 `v6.4+` data APIs，比如 `loaders` & `actions` & `fetchers` 等等。

```js {4,11-24,27}
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import Root, { rootLoader } from './routes/root'
import Team, { teamLoader } from './routes/team'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: rootLoader,
    children: [
      {
        path: 'team',
        element: <Team />,
        loader: teamLoader,
      },
    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
```



## 2️⃣ 类型定义

```typescript
function createBrowserRouter(
  routes: RouteObject[],
  opts?: {
    basename?: string;
    window?: Window;
  }
): RemixRouter;
```



## 3️⃣ routes

`Route`对象数组，对象上的 `children` 属性表示嵌套路由：

```js
createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: rootLoader,
    children: [
      {
        path: 'event/:id',
        element: <Event />,
        loader: eventLoader
      }
    ],
  }
])
```



## 4️⃣ basename

应用的 `basename` 用于你无法将应用部署在根域名的情形，需要在某个子目录下：

```js
createBrwoserRouter(routes, {
  basename: '/app'
})
```

尾部的 `/` 会被保存：

```js {2,7}
createBrwoserRouter(routes, {
  basename: '/app'
})
<Link to="/" /> // 结果为 <a href="/app" />
  
createBrwoserRouter(routes, {
  basename: '/app/'
})
<Link to="/" /> // 结果为 <a href="/app/" />
```



## 5️⃣ window

不使用全局的 `window`，这用于浏览器开发工具插件或者在不同window测试的场景。



2023年01月31日16:50:06
