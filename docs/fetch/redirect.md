---
title: redirect (data APIs)
---

因为你可以在loaders和actions中返回或抛出响应，你能使用 `redirect` 重定向到另一个路由。

```jsx {6}
import { redirect } from 'react-router-dom'

const loader = async () => {
  const user = await getUser()
  if (!user) {
    return redirect('/login') // 如果用户不存在，则重定向到login路由
  }
  return { user }
}
```

💡它只是下面形式的一种简写形式：

```js
new Response('', {
  status: 302,
  headers: {
    Location: someUrl,
  }
})
```

::: tip

当重定向用于响应数据时，相比在组件中使用 `useNavigate`, 更推荐在loaders和actions中使用 `redirect` 方式。

- [在loaders中返回Responses](../route/loader#返回响应)

:::



## 类型定义

```typescript
type RedirectFunction = (
  url: string,
  init?: number | ResponseInit
) => Response
```



## url

重定向的URL

```js
redirect('/login')
```



## init

用于response中的 [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response/Response) 配置。



createAt: 2023年02月02日15:20:05

