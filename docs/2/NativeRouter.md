---
title: NativeRouter
---

类型定义：

```typescript {5}
declare function NativeRouter(
	props: NativeRouterProps
): React.ReactElement

// 💡 可以看出其扩展的是 MemoryRouterProps
interface NativeRouterProps extends MemoryRouterProps {}
```

`<NativeRouter>` 推荐在 [React Native](https://reactnative.dev/) 项目中使用。

- `<NativeRouter initialEntries>` 默认是 `['/']` (在根URL `/` 处单一的条目) 
- `<NativeRouter initialIndex>` 默认是 `initialEntries` 最后一个索引



```jsx
import * as React from 'react'
import { NativeRouter } from 'react-router-native'

function App() {
  return (
    <NativeRouter>
      {/* 项目中其余部分放这里 */}
    </NativeRouter>
  )
}
```



2022年08月02日15:51:34

