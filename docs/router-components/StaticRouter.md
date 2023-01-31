---
title: StaticRouter
---

类型定义：

```typescript
declare function StaticRouter(
	props: StaticRouterProps
): React.ReactElement

interface StaticRouterProps {
  basename?: string;
  children?: React.ReactNode;
  location?: Path | LocationPieces;
}
```

`<StaticRouter>` 用于在Node环境渲染React Router web应用（译者注：即服务端渲染😎）。通过 `location` 属性提供当前location。

- `<StaticRouter location>` 默认是 `"/"`

```jsx {7-10}
import * as React from 'react'
import * as ReactServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import http from 'http'

function requestHandler(req, res) {
  let html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      {/* 应用的其余部分放这里 */}
    </StaticRouter>
  )
  
  res.write(html)
  res.end()
}

http.createServer(requestHandler).listen(3000)
```

译者注：

- 随着React18发布，现在服务端一般会使用 `ReactDOMServer.renderToPipeableStream()` 接口提升性能，以及服务端组件
- [ReactDOMServer](https://reactjs.org/docs/react-dom-server.html#gatsby-focus-wrapper)


createAt: 2022年08月02日16:09:34

updateAt: 2023年01月31日18:19:29
