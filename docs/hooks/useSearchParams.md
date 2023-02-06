---
title: useSearchParams
---
::: warning
这是web版本的 `useSearchParams`。对React Native版本，请看下一章 [useSearchParams(React Native)](./useSearchParams-React-Native)
:::

类型定义：
```typescript
declare function useSearchParams(
  defaultInit?: URLSearchParamsInit
): [URLSearchParams, SetURLSearchParams];

type ParamKeyValuePair = [string, string];

type URLSearchParamsInit =
 | string
 | ParamKeyValuePair[]
 | Record<string, string | string[]>
 | URLSearchParams;

type SetURLSearchParams = (
  nextInit?: 
    | URLSearchParamsInit
    | ((prev: URLSearchParams) => URLSearchParamsInit),
  navigateOpts?: NavigateOptions
) => void;

interface NavigateOptions {
  replace?: boolean;
  state?: any;
  preventScrollReset?: boolean;
}
```
📒 `useSearchParams` 钩子用于读取或者修改当前location URL中的查询字符串（`query string`）。 像React自己的 [useState](https://reactjs.org/docs/hooks-reference.html#usestate) 钩子一样，`useSearchParams` 返回包含2个值的数组😎：当前location的 [search params](https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams) 和一个用于更新搜索参数的函数。

```jsx {5,12}
import * as React from 'react'
import { useSearchParams } from 'react-router-dom'

function App() {
  let [searchParams, setSearchParams] = useSearchParams()

  function handleSubmit(event) {
    event.preventDefault()
    // 这里的serialize函数将负责从构成查询的表单中的字段
    // 创建一个包含{key: value}对的对象。
    let params = serializeFormQuery(event.target)
    setSearchParams(params)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>{/* ... */}</form>
    </div>
  )
}
```

::: tip
`setSearchParams` 函数和 [navigate](./useNavigate) 工作类似，但是只针对URL的 [search部分](https://developer.mozilla.org/en-US/docs/Web/API/Location/search)。
同样注意 `setSearchParams` 第二个参数和 `navigate` 的第二个参数类型相同，都为 `{ replace?: boolean; state?: any }`。
:::

2022年08月02日23:59:20
