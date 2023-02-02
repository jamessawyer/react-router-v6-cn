---
title: errorElement (data APIs)
---

当在 [loaders](./loader)，[actions](./action) 或组件渲染中抛出异常时，错误路径将被渲染（`<Route errorElement>`），而不是渲染正常路径的路由（`<Route element>`）。可以使用 `useRouteError` （LINK）获取该error。



::: warning 🚨

如果你没有使用 [createBrowserRouter](../routers/createBrowserRouter) 类似的 **数据路由**，上面操作无效

:::



```jsx {10,18}
<Route
  path="/invoices/:id"
  // 如果这里抛出异常
  loader={loadInvoice}
  // 或这里
  action={actionInvoice}
  // 又或渲染抛出异常
  element={<Invoice />}
  // 则会渲染errorElement
  errorElement={<ErrorBoundary />}
/>

function Invoice() {
  return <div>Happy {path}</div>
}

function ErrorBoundary() {
  let error = useRouteError()
  console.error(error)
  // Uncaught ReferenceError: path is not defined
  return <div>Duang~!</div>
}
```



## 冒泡

当路由没有定义 `errorElement`，则错误将冒泡到其 **父路由** 上。这让你可以更精细的控制错误。

把一个`errorElement`放在你的路由树的顶部，在一个地方处理你的应用程序中几乎所有的错误。或者，把它们放在你的所有路由上，并允许应用程序中没有错误的部分继续正常呈现。这为用户提供了更多从错误中恢复的选项，而不是硬刷新和🤞。



## 默认Error Element

::: warning

我们建议在将应用程序发布到生产环境之前，始终至少提供一个根级别的`errorElement`，因为默认的`errorElement`的UI很难看，不适合最终用户使用。

:::



如果你没有在路由树中提供`errorElement`来处理给定的错误，错误将冒泡并由默认的`errorElement`处理，它将打印错误消息和堆栈跟踪。有些人质疑为什么堆栈跟踪会出现在生产产物中。通常，出于安全原因，你不希望在生产站点上公开堆栈跟踪。但是，这更适用于服务器端错误(Remix确实从服务器端loader/action响应中剥离了堆栈跟踪)。在客户端react-router-dom应用程序的情况下，代码已经在浏览器中可用，所以任何隐藏都只是通过隐藏来实现安全。此外，我们仍然希望在控制台中公开错误，因此从UI显示中删除它仍然没有隐藏有关堆栈跟踪的任何信息。不将其显示在UI中，也不将其记录到控制台，这意味着应用程序开发人员完全没有关于生产错误的信息，这也带来了一系列问题。因此，我们再次建议你在将站点部署到生产环境之前，始终添加根级别的`errorElement`!💡





## 手动抛出错误

`errorElement` 可以处理异常错误，它也可用于处理你期望的异常。

特别是在actions和loaders中，它们处理的外部数据并不在你的掌控中，你不能总是假设能得到期望的数据，或者服务可访问，亦或用户有权限可以访问它。这种情况，你可以抛出自定义异常。

下面是一个 [loader](./loader) 中 `Not Found`的情况：

```jsx {4,7-9}
<Route
  path="/properties/:id"
  element={<PropertyForSale />}
  errorElement={<PropertyError />}
  loader={async ({ params }) => {
    const res = await fetch(`/api/properties/${params.id}`)
    if (res.status === 404) {
      throw new Response('Not Found', { status: 404 })
    }
    const home = await res.json()
    const descriptionHtml = parseMarkdown(data.descriptionMarkdown)
    return { home, descriptionHtml }
  }}
/>
```

当你知道不能使用加载的数据渲染路由时，你可以抛出错误中断调用栈。这样，当数据不存在时，你无需担心loader中其余的工作（比如解析用户markdwon）。抛出错误，跳出loader即可😎 。

::: tip

这也意味着，你不再需要在你的路由组件中写一堆错误分支代码了，如果你在actions或actions中抛出异常，它甚至不会渲染路由组件，而是会去渲染 `errorElement`。

:::
你可以在loaders或actions中返回任何东西：响应，错误，或者普通对象😎。





## 抛出响应

你可以抛出任何东西，然后它会通过 `useRouterError` （LINK） 提供给你，如果你抛出了一个 [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)，React Router在返回给你的组件之前会自动解析响应数据📚。

另外，`isRouteErrorResponse` （LINK）允许你在错误边界中检测这一特殊类型。💡结合 `json` (LINk) ，你可以很容易得抛出包含某些数据的响应，然后在错误边界中渲染不同的内容。

```jsx
import { json, useRouteError } from 'react-router-dom'

function loader() {
  const stillWorksHere = await userStillWorksHere()
  if (!stillWorksHere) {
    throw json(
      {
        sorry: 'You have been fired',
        hrEmail: 'hr@bigco.com'
      },
      { status: 401 }
    )
  }
}

function ErrorBoundary() {
  const error = useRouteError()
  
  if (isRouteErrorResponse(error) && error.status === 401) {
    // 响应json自动解析为 `error.data`，你也可以访问status
    return (
      <div>
        <h1>{error.status}</h1>
        <h2>{error.data.sorry}</h2>
        <p>
          Go ahead and email {error.data.hrEmail} if you
          feel like this is a mistake.
        </p>
      </div>
    )
  }
  
  // 如果不是这个路由的特殊的情形
  // 则重新抛出错误，让父路由错误边界处理它
  throw error
}
```

🌰这使得创建一个通用的错误边界处理多种情形成为了可能，通常在你的根路由上：

```jsx
function RootBoundary() {
  const error = useRouteError()
  
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <div>该页面不存在！</div>
    }
    if (error.status === 401) {
      return <div>你没有权限访问</div>
    }
    if (error.status === 503) {
      return <div>API挂了😅</div>
    }
    if (error.status === 418) {
      return <div>🫖</div>
    }
    return <div>多少有点毛病</div>
  }
}
```



## 抽象

当你知道无法继续数据加载然后抛出错误的模式使得异常处理变得很简单。

假设某个函数用于获取用户token来确认是否有权访问某些资源：

```jsx
async function getUserToken() {
  const token = await getTokenFromWebWorker()
  if (!token) {
    throw new Response('', { status: 401 })
  }
  return token
}
```

无论哪个loader或action使用这个函数，它都将在当前调用栈中停止代码执行，并将应用发送到错误路径上。

🌰现在我们添加一个函数来获取某个project:

```js
function fetchProject(id) {
  const token = await getUserToken()
  const response = await fetch(`/projects/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  
  if (response.status === 401) {
    throw new Response('Not Found', { status: 404 })
  }
  
  // fetch 失败
  if (!response.ok) {
    throw new Error('Could not fetch project')
  }
}
```

感谢 `getUserToken`，这段代码能断定能获取到 `token`。如果不存在，则渲染错误路径。然后就是如果project不存在，无论是哪个loader调用这个函数，它将抛出404给 `errorElement`。最后，如果fetch彻底失败，它将发送一个错误。

::: tip

任何时候，如果你意识到 `我得不到我想要的`，你就可以简单的 `throw`，知道你仍然在为终端用户呈现一些有用的东西。

:::



我们将其放在一个路由中：

```jsx
<Route
  path="/"
  element={<Root />}
  errorElement={<RootBoundary />}
>
  <Route
    path="project/:projectId"
    loader={({params}) => fetchProject(params.projectId)}
    element={<Project />}
  />
</Route>
```

`Project`路由完全不需要考虑错误。当出现异常时，loader工具中的函数（比如 `fetchProject` & `getUserToken` ） 抛出异常，然后 `RootBoundary` 处理所有情形，project路由只需要关注正确的情形即可😎。





createAt: 2023年02月02日11:48:45

