---
title: useMatches (data APIs)
---

返回对当前页面的路由匹配。这对于在父布局中创建抽象以访问其子路由数据非常有用😎。

## 类型定义：

```typescript
function useMatches(): {
  id: string;
  pathname: string;
  params: Params<string>;
  data: unknown;
  handle: unkwown;
}
```



```jsx
import { useMatches } from 'react-router-dom'

function SomeComponent() {
	const matches = useMatches()
  // [match1, match2, ...]
}
```

`match`对象包含如下格式：

```js
{
  // 路由id
  id,
  // 路由匹配到的部分URL
  pathname,
  // loader中获取的data
  data,
  // 从URL中解析的参数
  params,
  // <Route handle> 可包含任何数据，类似vue-router中的 `meta` 属性
  handle,
}
```

::: tip

💡 `useMatches` 与 `<Route handle>` 搭配使用会十分强大，因为你可以在 `handle` 中存放任何数据，然后通过 `useMatches` 访问。

:::



::: warning 🚨

`useMatches`只在数据路由模式下才有效，比如 [createBrowserRouter](../routers/createBrowserRouter)，因为它们预先知道完整的路由树，并可以提供所有当前匹配😎。此外，`useMatches`不会向下匹配到任何后代路由树，因为路由器不知道后代路由。

:::



## Breadcrumbs

🌰这里常见的用例是将面包屑添加到使用子路由数据的父布局中。

::: code-group

```jsx [App.jsx]
<Route element={<Root />}>
  <Route
    path="messages"
    element={<Messages />}
    loader={loadMessages}
    handle={{
      // 你可以在handle中放任何数据
      // 这里我们使用 `crumb`并返回一些元素
      // 这也是我们将对此路由面包屑中渲染的元素
      crumb: () => <Link to="/messages">Messages</Link>
    }}
    >
    <Route
      path="conversation/:id"
      element={<Thread />}
      loader={loadThread}
      handle={{
        // `crumb` 是你自己的抽象
        // 我们决定将其设置为一个函数，这样可以将loader中的数据传递给函数
        // 这样我们的面包屑可以包含动态的内容🎉
        crumb: (data) => <span>{data.threadName}</span>
      }}
    />
  </Route>
</Route>
```

:::

现在我们便可以创建一个 `Breadcrumbs` 组件，利用我们自己生成的 `crumb` 抽象，结合`useMatches`和 `handle`。

::: code-group

``` jsx [components/breadcrumbs.jsx]
function Breadcrumbs() {
  let matches = useMatches()
  let crumbs = matches
    // 首先过滤掉不存在handle和crumb的matches
  	.filter(match => Boolean(match.handle?.crumb))
    // 然后将其映射为元素数组，将loader data传入
  	.map(match => match.handle.crumb(match.data))
 
  return (
    <ol>
      {crumbs.map((crumb, index) => (
        <li key={index}>{crumb}</li>
      ))}
    </ol>
  )
}
```

:::



现在我们便可以在任何地方渲染 `<Breadcrumb />` 组件了，也可能在根组件中。



createAt: 2023年02月03日11:39:21

