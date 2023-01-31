---
title: useParams
---

类型定义：
```typescript
declare function useParams<
  K extends string = string
>(): Readonly<Params<K>>;
```

`useParams` 钩子返回一个由 `<Route path>` 匹配的当前URL的`动态参数`的键/值对组成的对象。*`子路由继承所有它们父路由的参数。`*

```jsx {6,15}
import * as React from 'react'
import { Routes, Route, useParams } from 'react-router-dom'

function ProfilePage() {
  // 从URL获取 userId
  let { userId } = useParams()

  // ...
}

function App() {
  return (
    <Routes>
      <Route path="users">
        <Route path=":userId" element={<ProfilePage />} />
        <Route path="me" element={...} />
      </Route>
    </Routes>
  )
}
```

2022年08月02日23:26:43
