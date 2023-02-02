---
title: useLoaderData (data APIs)
---

这个钩子提供了从路由loader返回的值。

```jsx {4,7,12}
import {
  createBrowserRouter,
  RouterProvider,
  useLoaderData,
} from 'react-router-dom'

function loader() { // 路由loader
  return fetchFakeAlbums()
}

export function Albums() {
  const albums = useLoaderData()
  // ...
}

const router = createBrowserRouter([
  {
    path: '/',
    loader: loader,
    element: <Albums />,
  }
])

ReactDOM.createRoot(el).render(
  <RouterProvider router={router} />
)
```

::: tip

📚在路由 [actions](../route/action) 被调用后，数据将自动重新生效，并从你的loader中返回最新的数据。

:::

注意，`useLoaderData` 不会发起fetch。它只是读取React Router内部管理的fetch结果，所以你不需要担心它在由于路由之外的原因重新渲染时 `refetch`。

这也意味着每次渲染时，返回的数据都是稳定的，你可以安全的将其作为依赖数组传递给React Hooks（比如 `useEffect`）。**它只会在 `actions` 之后导致loader重新调用或者特定导航时才改变。** 在这些情况下，标识（`identity`）将会改变(即使值不变)。

你可以在任何组件或自定义hooks中使用useLoaderData，不仅仅是路由元素中。它将从上下文中最近的路由返回数据。

想要从页面上任何激活的路由中获取数据，可以查看 [useRouteLoaderData](./useRouteLoaderData)。



createAt: 2023年02月02日14:11:25

