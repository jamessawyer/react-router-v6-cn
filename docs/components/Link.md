---
title: Link
---

::: warning

这是web版本的 \<Link>。React Native 版本在下一章 [Link(React Native)](./Link-React-Native)

:::



::: details 类型声明

```typescript
declare function Link(props: LinkProps): React.ReactElement;

interface LinkProps	
  extends Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    'href'
	> {
  replace?: boolean;
  state?: any; 
  to: To;
  reloadDocument?: boolean;
  preventScrollReset?: boolean;
  relative?: 'route' | 'path';
}

type To = string | Partial<Path>
```
:::



`<Link>` 是一个允许用户点击或tap跳转到其它页面的元素。在 `react-router-dom` 中，`<Link>` 会渲染一个带有指向它链接资源的真实 `href` 的可访问的 `<a>` 元素。这意味着，像右键单击`<Link>`这样的事情会像你预期的那样工作。你可以使用 `<Link reloadDocument>` 跳过客户端路由，让浏览器正常的处理过度（就好像一个 `<a href>` 一样）。

```jsx {11}
import * as React from 'react';
import { Link } from 'react-router-dom'

function UsersIndexPage({ users }) {
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link to={user.id}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

💡 一个相对 `<Link to>` 的值（不以 `/` 开头）会相对父路由进行解析，这意味着它建立在与渲染该 `<Link>` 的路由匹配的URL路径上。它可以包含 `..` 用于链接上一层级。这种情况，`..` 类似CLI中的 `cd` 命令；每个 `..`会移除父路径的一个片段（`segment`）。



::: warning

使用 `..` 的 \<Link to> 当前URL以 `/`结尾的， 行为不同于普通的 \<a herf> 。 \<Link to> 会忽略尾部 `/`,并且对每个 `..` 都移除一个URL片段。但是 \<a herf> 值处理 `..` 当前URL以`/`结尾和不以`/`结尾是不同的。

:::

## relative

默认情况下，链接是相对于路由层级的，因此 `..` 会向上一个路由层级。偶尔，你可能会发现匹配的URL模式无法嵌套，因此更倾向于使用相对路径路由。你可以通过 `relative` 属性选择这种行为。

```jsx {11,12,14}
// Contact 和 EditContact 不共享额外的UI布局
<Route path="/" element={<Layout />}>
  <Route path="contacts/:id" element={<Contact />} />
  <Route
    path="contacts/:id/edit"
    element={<EditContact />}
  />
</Route>

function EditContact() {
  // 因为Contact不是EditContact的父路由
  // 我们需要`路径上`向上一个层级，而不是在`路由层级上`上一个层级📚
  return (
    <Link to=".." relative>
      Cancel
    </Link>
  )
}
```



## preventScrollReset

如果你正在使用 ScrollRestoration组件（LINK），这个属性允许你在点击链接后阻止滚动位置被重置到窗口的顶部。

```jsx
<Link to="?tab=one" preventScrollReset={true} />
```

::: warning

这并不会在用户点击返回或者前进按钮的情况下阻止滚动位置重置，只有用户点击该链接时才会阻止。

:::

你可能需要这种行为的一个场景是，一组不再页面顶部的tabs通过操控url搜索参数。你不可能希望用户切换tabs突然跳转到顶部位置😅。

```bash
      ┌─────────────────────────┐
      │                         ├──┐
      │                         │  │
      │                         │  │ scrolled
      │                         │  │ out of view
      │                         │  │
      │                         │ ◄┘
    ┌─┴─────────────────────────┴─┐
    │                             ├─┐
    │                             │ │ viewport
    │   ┌─────────────────────┐   │ │
    │   │  tab   tab   tab    │   │ │
    │   ├─────────────────────┤   │ │
    │   │                     │   │ │
    │   │                     │   │ │
    │   │ content             │   │ │
    │   │                     │   │ │
    │   │                     │   │ │
    │   └─────────────────────┘   │ │
    │                             │◄┘
    └─────────────────────────────┘
```



## replace

如果你想要通过 [history.replaceState](https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState) 替换当前历史栈中的记录，而不是使用默认的 [history.pushState](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState) 时，使用这个属性。



## state

`state`属性可以给下一个location设置一些状态值，它被存储在 [history.state](https://developer.mozilla.org/en-US/docs/Web/API/History/state) 中。这个值后续可以通过 [useLocation()](../hooks/useLocation) 获取到。

```jsx
<Link to="new-path" state={{ some: 'value '}} />
```

你可以在 `new-path` 路由中访问到该状态值：

```jsx
let { state } = useLocation()
```

::: tip

💡一个使用场景就是，用户访问某个没有权限的页面，跳转到登录页，可以将没有权限的页面的路径作为 `state` 传递给登录页，等登录成功后，再跳转到该页面。

:::





createAt: 2022年08月02日16:36:50

updateAt: 2023年02月09日10:01:11

