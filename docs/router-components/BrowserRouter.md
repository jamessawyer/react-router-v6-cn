---
title: BrowserRouter
---

类型定义：

```typescript
declare function BrowserRouter(
	props: BrowserRouterProps
): React.ReactElement

interface BrowserRouterProps {
  basename?: string;
  children?: React.ReactNode,
  window?: Window;
}
```

`<BroswerRouter>` 使用干净的URL将当前位置（`Location`）存储在浏览器的地址栏中，并使用浏览器内置的历史栈（`history stack`）进行导航。

`<BrowserRouter window>` 默认使用当前 [document defaultView](https://developer.mozilla.org/en-US/docs/Web/API/Document/defaultView)，但它可能被用于追踪其它某个 `<iframe>` 中的window URL的变化，比如：

```jsx
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-dom-router'

const root = createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
    {/* 应用的其余部分放在这里 */}
  </BrowserRouter>
)
```

createAt: 2022年08月02日15:06:19

updateAt: 2023年01月31日18:07:02