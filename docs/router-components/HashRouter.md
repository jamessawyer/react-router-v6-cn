---
title: HashRouter
---

类型定义：

```typescript
declare function HashRouter(
	props: HashRouterProps
): React.ReactElement

interface HashRouterProps {
  basename?: string;
  children?: React.ReactNode;
  window?: Window;
}
```

`<HashRouter>` 用于浏览器中，当URL由于某些原因不该（或者不能）发送给服务器时使用。这可以发生在某些共享宿主机的场景，你对服务器没有完全的控制权。在这种情况下，`<HashRouter>` 使得将当前位置存储在当前URL的 `hash` 部分成为可能，因此它永远不会发送到服务器。



`<HashRouter window>` 默认使用当前 [document defaultView](https://developer.mozilla.org/en-US/docs/Web/API/Document/defaultView)，但它可能被用于追踪其它某个 `<iframe>` 中的window URL的变化，比如：

```jsx
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-dom-router'

const root = createRoot(document.getElementById('root'))

root.render(
  <HashRouter>
    {/* 应用的其余部分放在这里 */}
  </HashRouter>
)
```

::: warning

我们强烈推荐不要使用 `HashRouter` 除非不得以的情况下

:::



createAt: 2022年08月02日15:15:37

updateAt: 2023年01月31日18:12:34