---
title: loader (data APIs)
---

每个路由都可以定义一个 `loader` 函数给路由元素在其渲染前提供数据。


::: warning 🚨
如果你没有使用 [createBrowserRouter](../routers/createBrowserRouter) 类似的 **数据路由**，上面操作无效
:::

```jsx {5-7,12-14}
createBrowserRouter([
  {
    element: <Teams />,
    path: 'teams',
    loader: async () => {
      return fakeDb.from('teams').select('*')
    },
    children: [
      {
        element: <Team />,
        path: ':teamId',
        loader: async ({ params }) => {
          return fetch(`/api/teams/${params.teamId}.json`)
        }
      }
    ]
  }
])
```

当用户在应用间导航时，下一个匹配到的分支的路由 `loaders` 将 **`并行`** 被调用😎，它们的数据通过 `useLoaderData`（LINK）对组件可用。





## params

路由参数从 [动态片段](./route#_3-1-动态片段) 中解析，然后传递给你的loader。这对找出需要加载哪个资源很有用：

```jsx {5}
createBrowserRouter([
  {
    element: <Team />,
    path: 'teams/:teamId',
    loader: async ({ params }) => {
      return fakeGetTeam(params.teamId)
    },
  }
])
```

**注意**，path上的 `:teamId` 被解析以 `params.teamId` 的形式作为参数进行提供。



## request

这是一个发送到你路由的 [Fetch Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) 实例。

```js
function loader({ request }) {}
```

> 一个请求？

初看之下，loader接收 `request` 参数可能有点奇怪。假设 `<Link>` 有如下操作，你问一下你自己：`这里什么样的默认行为被阻止了？`

```jsx {4}
<a
  href={props.to}
  onClick={(event) => {
    event.preventDefault()
    navigate(props.to)
  }}
/>
```

📚如果不使用React Router，浏览器可能向你的服务器发送一个 _`Request`_，但是React Router阻止了这种行为的发生。React Router将请求发送给你的loaders，而不是发送到服务器。



最常见的使用场景是，创建一个 [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL)，然后从url中读取 [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams):

```js
function loader({ request }) {
  const url = new URL(request.url)
  const searchTerm = url.searchParams.get('q')
  return searchProducts(searchTerm)
}
```

::: tip

**注意：** 这些APIs并不是React Router规范，而是一些标准的web对象：

- [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request)
- [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL)
- [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)

:::



## 返回响应

你可以在loader中返回任何值，然后通过 `useLoaderData` (LINK) 获取loader返回的值。当然，你也可以返回一个 [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)。

这可能看起来没有立即的用处，但是考虑`fetch`。由于`fetch`的返回值是一个Response，而loader理解响应，许多loaders可以返回一个简单的fetch!

```js
// HTTP REST API
function loader({ request }) {
  return fetch('/api/team.json', {
    signal: request.signal
  })
}

// graphql
function loader({ request, params }) {
  return fetch("/_gql", {
    signal: request.signal,
    method: "post",
    body: JSON.stringify({
      query: gql`...`,
      params: params,
    }),
  });
}
```

同样你也可以构建自己的响应：

```js {3-8}
function loader({ request, params }) {
  const data = { some: 'thing' }
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; utf-8'
    }
  })
}
```

React Router将自动调用 `response.json()`，因此你的组件在渲染时不需要再解析了：

```js {2}
function SomeRoute() {
  const data = useLoaderData()
  // ...
}
```

使用 `json` （LINK）工具可以简化这一流程，因此你可以不需要自己构建。下面代码等同于上面代码：

```js {5}
import { json } from 'react-router-dom'

function loader({ request, params }) {
  const data = { some: 'thing' }
  return json(data, { status: 200 })
}
```

如果你计划升级到Remix，那么从每个loader返回响应将使迁移更加顺利。



## Loaders中抛出异常

你可以在你的loader中抛出（`throw`）来打破当前的调用堆栈(停止运行当前代码)，React Router将沿着“错误路径”重新开始。

```js {4}
function loader({ request, params }) {
  const res = await fetch(`/api/properties/${params.id}`)
  if (res.status === 404) {
    throw new Response('Not Found', { status: 404 })
  }
  return res.json()
}
```

- 更多细节和用例，可参考 [errorElement](./errorElement)



createAt: 2023年02月01日10:18:43

