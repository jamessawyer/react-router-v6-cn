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

在浏览器中使用React Router 推荐使用 `<BrowserRouter>` 接口。`<BroswerRouter>` 使用干净的URL将当前位置（`Location`）存储在浏览器的地址栏中，并使用浏览器内置的历史栈（`history stack`）进行导航。

`<BrowserRouter window>` 默认使用当前 [document defaultView](https://developer.mozilla.org/en-US/docs/Web/API/Document/defaultView)，但它可能被用于追踪其它某个 `<iframe>` 中的window URL的变化，比如：

```jsx
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-dom-router'

ReactDOM.render(
  <BrowserRouter>
    {/* 应用的其余部分放在这里 */}
  </BrowserRouter>,
  root
)
```

2022年08月02日15:06:19