---
title: createHashRouter
---

当你的web服务器无法将所有流量导向React Router应用的场景时，才会使用这个路由器。它会使用hash(`#`)表示URL的部分，来管理应用URL。

::: warning
不推荐使用hash URLs
:::

除此之外，其余功能和 [createBrowserRouter](./createBrowserRouter) 相同：
```js
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {
  createHashRouter,
  RouterProvider,
} from 'react-router-dom'

import Root, { rootLoader } from './routes/root'
import Team, { teamLoader } from './routes/team'

const router = createHashRouter([
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

2023年01月31日16:54:31