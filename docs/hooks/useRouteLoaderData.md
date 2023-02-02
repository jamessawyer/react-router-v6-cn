---
title: useRouteLoaderData (data APIs)
---

📚这个钩子使得树中任何当前渲染的路由上的数据可用。这对于树中较深处的组件非常有用，这些组件需要来自更远的路由的数据，以及父路由需要树中较深处的子路由的数据。

```jsx
import { useRouteLoaderData } from 'react-router-dom'

function SomeComp() {
  const user = useRouteLoaderData('root')
  // ...
}
```
`React Router使用确定性的，自动生成的路由ids在其内部存储数据`，但你可以提供自己的路由id，使useRouteLoaderData这个钩子更易使用。比如下面路由自定义的id:

```jsx {6}
createBrowserRouter([
  {
    path: '/',
    loader: () => fetchUser(),
    element: <Root />,
    id: 'root', // 🎉
    children: [
      {
        path: 'jobs/:jobId',
        loader: loadJob,
        element: <JobListing />,
      },
    ],
  },
])
```

则loader返回的user则在应用中的任何地方都可以访问到了：

```js
const user = useRouteLoaderData('root')
```

::: warning

只有当前路由被渲染了，该数据才有值。如果你请求的路由数据所在的路由当前没有被渲染，则该hook将返回 `undefined`

:::



createAt: 2023年02月02日14:26:57

