---
title: useAsyncError (data APIs)
---

返回最近的 `<Await>` 组件返回的rejected value。

```jsx {4,12}
import { useAsyncError, Await } from 'react-router-dom'

function ErrorElement() {
  const error = useAsyncError()
  return (
    <p>出错了😥 {error.message}</p>
  )
}

<Await
  resolve={promiseThatRejects}
  errorElement={<ErrorElement />}
/>
```
- 更多可参看 [Deferred Data指南](../guides/deferred-data) 和 [Await组件](../components/await)

createAt: 2023年02月06日11:17:24
