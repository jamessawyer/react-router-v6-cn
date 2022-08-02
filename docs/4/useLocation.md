---
title: ⚡useLocation
---

类型定义：
```typescript
declare function useLocation(): Location;

interface Location extends Path {
  state: unknown;
  key: Key;
}
```
这个钩子返回当前 [location](../5/location) 对象。如果当前location发生变化，你想执行一些副作用时，这很有用。
```jsx {5,10}
import * as React from 'react'
import { useLocation } from 'react-router-dom'

function App() {
  let location = useLocation()

  React.useEffect(() => {
    // google数据收集
    ga('send', 'pageview')
  }, [location]) // 订阅location变化

  return (
    // ...
  )
}
```

2022年08月02日22:19:13
