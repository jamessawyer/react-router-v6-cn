---
title: useOutletContext
---

类型定义：
```typescript
declare function useOutletContext<
  Context = unknown
>(): Context
```
📚通常父路由会管理共享给子路由的状态或其他值。如果你喜欢的话，你也可以创建自己的 [Context Provider](https://reactjs.org/docs/context.html)，但这是一个很常见的情形，它内置在了 `<Outlet />` 中了😎
```jsx {3}
function Parent() {
  const [count, setCount] = React.useState(0)
  return <Outlet context={[count, setCount]} />
}
```
子路由元素使用：
```jsx {4}
import { useOutletContext } from 'react-router-dom'

function Child() {
  const [count, setCount] = useOutletContext()

  const increament = () => setCount(c => c + 1)
  return <button onClick={increament}>{count}</button>
}
```
🚀🚀 如果你使用TypeScript，我们推荐父组件提供一个自定义钩子用于访问context值。这使得消费者能很轻易的获取很好的类型，控制消费者，并且知道谁在消费context值。
这是一个更现实的例子：
父路由：`src/routes/dashboard.tsx`
```tsx {5,13,18-20}
import * as React from 'react'
import type { User } from './types'
import { Outlet, useOutletContext } from 'react-router-dom'

type ContextType = { user: User | null }

export default function Dashboard() {
  const [user, setUser] = React.useState<User | null>(null)

  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet context={{ user }} />
    </div>
  )
}

export function useUser() {
  return useOutletContext<ContextType>()
}
```
子路由：`src/routes/dashboard/messages.tsx`
```tsx {1,3}
import { useUser } from '../dashboard'

export default function DashboardMessages() {
  const { user } = useUser()

  return (
    <div>
      <h2>Messages</h2>
      <p>Hello, {user.name}</p>
    </div>
  )
}
```

2022年08月02日23:18:11
