---
title: useFetcher (data APIs)
---

在HTML/HTTP中，数据突变和加载是用导航建模的: `<a href>` & `<form action>`。二者都会在浏览器中引发导航。React Router中相同组件为 [Link组件](../components/Link) 和 [Form组件](../components/Form)。

但是有时你想要在导航之外调用 [loader](../route/loader)，或者在不改变URL的前提下调用 [action](../route/action)（以使页面中的数据重新生效）。又或者你想要同时有多个突变（mutations）。

很多与服务端的交互不是导航事件。这个钩子可以让你把你的UI插入到你的actions和loaders中，而不需要导航😎。

对以下场景，这是十分有用的：

1. 获取与UI路由不相关的数据（比如ppovers,动态forms等等）
2. 不需要导航的前提下提交数据到actions（共享组件，比如新闻注册）
3. 处理列表中多个并发提交（典型的 `TODO App` 列表，你可以点击多个按钮，所有的按钮都应该在同一时间挂起）
4. 无限滚动容器
5. 以及更多。。。

如果你构建一个高交互，”应用类似“的UI，则你将经常使用到 `useFetcher`。

```jsx {19}
import { useFetcher } from 'react-router-dom'

function SomeComponent() {
  const fetcher = useFetcher()
  
  // 在useEffect中调用submit或load
  React.useEffect(() => {
    fetcher.submit(data, options)
    fetcher.load(href)
  }, [fetcher])
  
  // 可使用如下属性构建你的UI🎉
  fetcher.state;
  fetcher.formData;
  fetcher.formMethod;
  fetcher.formAction;
  fetcher.data;
  
  // 渲染一个不会导航的表单😏
  return <fetcher.Form />
}
```

Fetchers有很多内置的行为：

1. 自动处理fetch中断时的取消
2. 当使用 `POST | PUT | DELETE | PATCH` 提交时，`action`首先被调用：
   - action完成后，页面上的数据被重新验证，以捕捉可能发生的任何变化，自动保持UI与服务器状态同步
3. 当多个fetchers一次性同时进行，它将：
   - 每次land时提交最新的可用数据
   - 确保不存在不新鲜的数据覆盖最新的数据，无论响应返回的顺序😎
4. 通过渲染最近的 `errorElement` 处理未捕获的错误（和来自 `<Link> | <Form>` 正常导航一样）
5. 如果你的 `action/loader` 被调用返回一个redirect，它将对应用重定向（和来自 `<Link> | <Form>` 正常导航一样）



## fetcher.state

可以通过 `fetcher.state` 知道fetcher的状态：

- `idle` - 不存在fetch
- `submitting` - 由于使用 `POST | PUT | DELETE | PATCH` fetcher提交导致的路由action正在被调用
- `loading` - fetcher正在调用某个loader(从某个 `fetcher.load`) 或者在单独的提交或`useRevalidator`调用后重新验证



## fetcher.Form

和 `<Form>` 组件类似，就是不会导致导航的出现。

```jsx
function SomeComponent() {
  const fetcher = useFetcher()
  
  return (
    <fetcher.Form method="post" action="/some/route">
      <input type="text" />
    </fetcher.Form>
  )
}
```



## fetcher.load()

从路由loader中加载数据：

```jsx {8}
import { useFetcher } from 'react-router-dom'

function SomeComponent() {
  const fetcher = useFetcher()
  
  useEffect(() => {
    if (fetcher.state === 'idle' && !fetcher.data) {
      fetcher.load('/some/route')
    }
  }, [fetcher])
  
  return <div>{fetcher.data | 'Loading...'}</div>
}
```

尽管一个URL可能匹配多个嵌套路由，`fetcher.load()` 调用只会对叶子匹配调用loader（或者父路由的索引路由）。

如果你发现自己在点击事件handler中调用这个函数，你可以使用 `<fetcher.Form>` 形式简化你的代码。



::: warning

当前页面中任何活跃的 `fetcher.load` 调用都将作为重新验证的一部分而重新执行（要么在导航提交或fetcher提交之后，要么调用了 `useRevalidator()`）

:::



## fetcher.submit()

`<fetcher.Form>` 命令式版本。如果用户交互要发起fetch,则你应该使用 `<fetcher.Form>`。但是如果你 - 程序员需要发起fetch（不响应用户点击按钮等等）- 则可使用这个函数。

🌰比如你想在用户闲置一段时间后退出用户登录：

```jsx {10-13}
import { useFetcher } from 'react-router-dom'
import { useFakeUserIsIdle } from './fake/hooks'

export function useIdleLogout() {
  const fetcher = useFetcher()
  const userIsIdle = useFakeUserIsIdle()
  
  useEffect(() => {
    if (userIsIdle) {
      fetcher.submit(
        { idle: true },
        { method: 'post', action: '/logout' }
      )
    }
  }, [userIsIdle])
}
```

如果你想提交到某个索引路由，请使用 `?index` 参数（LINK）

如果你发现自己在点击事件handler中调用这个函数，你可以使用 `<fetcher.Form>` 形式简化你的代码。



## fetcher.data

从loader或action中返回的数据存在 `fetcher.data` 中。一旦数据被设置了，它将持久化在fetcher上，即使重新加载或者重新提交。

```jsx {10,17}
function ProductDetails({ product }) {
  const fetcher = useFetcher()
  
  return (
    <details
      onToggle={(event) => {
        if (
          event.currentTarget.open &&
          fetcher.state === 'idle' &&
          !fetcher.data
        ) {
          fetcher.load(`/product/${product.id}/details`)
        }
      }}
    >
      <summary>{product.name}</summary>
      {fetcher.data ? (
        <div>{fetcher.data}</div>
      ) : (
        <div>Loading product details...</div>
      )}
    </details>
  )
}
```



## fetcher.formData

当使用 `<fetcher.Form> | fetcher.submit()` 时，表单数据可用于构建乐观UI。

```jsx
function TaskCheckbox({ task }) {
  const fetcher = useFetcher()
  
  // 尽管数据仍在传输中，使用它立即渲染表单提交完成时期望任务处于的状态😎
  // 而不是等待网络响应完成
  // 💡 当网络响应后，formData将变为undefined，UI将使用重新验证后的 `task.status`
  let status = fetcher.formData?.get('status') || task.status
  
  let isComplete = status === 'complete'
  
  return (
    <fetcher.Form method="post">
      <button
        type="submit"
        name="status"
        value={isComplete ? 'incomplete' : 'complete'}
        >
        {isComplete ? 'Mark Incomplete' : 'Mark Complete'}
      </button>
    </fetcher.Form>
  )
}
```



## fetcher.formAction

告诉你提交的action url是什么：

```jsx
<fetcher.Form action="/mark-as-read" />

// 当表单提交时
fetcher.formAction // "/mark-as-read"
```



## fetcher.formMethod

告诉你正在提交的表单的提交的方法：`get | post | put | patch | delete`:

```jsx
<fetcher.Form method="post" />

// 当表单提交时
fetcher.formMethod // "post"
```



createAt: 2023年02月08日14:51:42

