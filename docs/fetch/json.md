---
title: json (data APIs)
---
`json` 其实是下面形式的简写：

```js
new Response(JSON.stringify(someValue), {
  headers: {
    'Content-Type': 'application/json'
  }
})
```

一般用于loaders中：

```js
import { json } from 'react-router-dom'

const loader = async () => {
  const data = getSomeData()
  return json(data)
}
```

可查看：

- [在loaders中返回Responses](../route/loader#返回响应)



createAt: 2023年02月02日15:09:49
