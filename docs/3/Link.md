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
}
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



2022年08月02日16:36:50

