---
title: HistoryRouter
---

类型定义：

```typescript
declare function HistoryRouter(
	props: HistoryRouterProps
): React.ReactElement

interface HistoryRouterProps {
  basename?: string;
  children?: React.ReactNode;
  history: History
}
```

`<unstable_HistoryRouter>` 接收 [history](https://github.com/remix-run/history) 库的实例作为属性。这使你可以再非React上下文使用该实例，或者作为全局变量。

```jsx {4,9}
import * as React from 'react'
import * as ReactDOM from 'react-doom'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { createBrowserHisotry } from 'history'

const history = createBrowserHistory({ window })

ReactDOM.render(
  <HistoryRouter history={history}>
    {/* 应用的其余部分放在这里 */}
  </HistoryRouter>,
  root
)
```

::: warning

这个API目前添加了 `unstable_` 前缀，因为你可能不小心在项目中添加2个版本的 `history` 库：一个是你自己添加到 `package.json` 中的，一个是React Router内部使用的版本。如果你的工具允许这样做，建议不要将history添加为直接依赖项，而是依赖于来自`react-router`包的嵌套依赖项。一旦我们有了检测不匹配版本的机制，这个API将删除它的`unstable_`前缀。

:::



2022年08月02日15:29:39