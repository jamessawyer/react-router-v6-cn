---
title: useSearchParams(React Native)
---

::: warning
这是React Native版本的 `useSearchParams`。对web版本，请看上一章 [useSearchParams](./useSearchParams)
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

```jsx {6,8,12}
import * as React from 'react'
import { View, SearchForm, TextInput } from 'react-native'
import { useSearchParams } from 'react-router-native'

function App() {
  let [searchParams, setSearchParams] = useSearchParams();
  let [query, setQuery] = React.useState(
    searchParams.get('query') // 💡 读取数据
  )

  function handleSubmit() {
    setSearchParams({ query })
  }

  return (
    <View>
      <SearchForm onSubmit={handleSubmit}>
        <TextInput value={query} onChangeText={setQuery} />
      </SearchForm>
    </View>
  )
}
```

2022年08月03日00:08:10
