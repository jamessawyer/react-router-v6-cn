---
title: isRouteErrorResponse (data APIs)
---

当 [路由错误](../hooks/useRouteError) 是 [路由错误响应](../route/errorElement#抛出响应) 时，这个函数返回 `true`。

```jsx {6}
import { isRouteErrorResponse } from 'react-router-dom'

function ErrorBoundary() {
  const error = useRouteError()
  
  if (isRouteErrorResponse(error)) { // 🎉
    return (
      <div>
        <h1>Oops!</h1>
        <h2>{error.status}</h2>
        <p>{error.statusText}</p>
        {error.data?.message && <p>{error.data.message}</p>}
      </div>
    )
  }
  return <div>Oops!</div>
}
```

当一个响应从actions或loaders中抛出时，它将解包装成 `ErrorResponse` ，这样你的组件就不必处理展开它的复杂性(这将需要React状态和effects来处理`res.json()`返回的promise)

```jsx {6,15-17}
import { json } from 'react-router-dom'

<Route
	errorElement={<ErrorBoundary />}
  action={() => {
    throw json(
      { message: 'email is required' },
      { status: 400 }
    )
  }}
/>

function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    error.status; // 400
    error.data; // { "message: "email is required" }
  }
}
```

::: warning

📚如果用户访问的路由没有匹配到应用中的任何路由，React Router自身也会抛出一个 `404 Response Error`。

:::



createAt: 2023年02月02日15:00:44