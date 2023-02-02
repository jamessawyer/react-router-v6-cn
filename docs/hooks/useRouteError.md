---
title: useRouteError (data APIs)
---

在某个 [errorElement](../route/errorElement) 内部，这个钩子将返回action，loader或渲染时抛出的任何值。
::: warning
注意，抛出响应需要特殊的处理，可参看：
 - [isRouteErrorResponse](../utilities/isRouteErrorResponse)
 - [errorElement throw Response](../route/errorElement#抛出响应)

:::



::: warning 🚨

如果你没有使用 [createBrowserRouter](../routers/createBrowserRouter) 类似的 **数据路由**，上面操作无效

:::



```jsx {2}
function ErrorBoundary() {
  const error = useRouteError() // 🎉
  console.error(error)
  return <div>{error.message}</div>
}

<Route
  errorElement={<ErrorBoundary />}
  loader={() => {
    // 1️⃣ loaders或actions中发生异常错误
    something.that.breaks()
  }}
  action={() => {
    // 2️⃣ 或者显式的抛出异常（这里是throw Response）
    throw new Response('Bad Request', { status: 400 })
  }}
  element={
    // 3️⃣ 或者渲染时抛出异常
    <div>{breaks.while.rendering}</div>
  }
/>
```



createAt: 2023年02月02日14:42:22

