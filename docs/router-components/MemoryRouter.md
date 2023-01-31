---
title: MemoryRouter
---

类型定义：

```typescript
declare function MemoryRouter(
	props: MemoryRouterProps
): React.ReactElement

interface MemoryRouterProps {
  basename?: string;
  children?: React.ReactNode;
  initialEntries?: InitialEntry[];
  initialIndex?: number;
}
```

`<MemoryRouter>` 内部用一个数组存储位置（`locations`）。不同于 `<BrowserHistory>` 和 `<HashHistory>`，它不会绑定外部源（`external source`），如同浏览器中history stack。这意味着，它适用于你需要完全控制整个历史栈的场景，比如测试😎。

- `<MemoryRouter initialEntries>` 默认为 `['/']` (在根URL `/` 处单一的条目) 
- `<MemoryRouter initialIndex>` 默认是 `initialEntries` 最后一个索引



::: tip

大多数React Router的测试都是使用 `<MemoryRouter>` 编写，这是千真万确的，因此你可以查看这些好的示例：[browsing through our tests](https://github.com/remix-run/react-router/tree/main/packages/react-router/__tests__)

:::



```jsx {12}
import * as React from 'react'
import { create } from 'react-test-renderer'
import {
  MemoryRouter,
  Routes,
  Route,
} from 'react-router-dom'

describe('My App', () => {
  it('renders correctly', () => {
    let renderer = create(
      <MemoryRouter initialEntries={['/users/mjackson']}>
        <Routes>
          <Route path="users" element={<Users />}>
            <Route path=":id" element={<UserProfile />} />
          </Route>
        </Routes>
      </MemoryRouter>
    )
    
    expect(renderer.toJSON()).toMatchSnapshot()
  })
})
```

2022年08月02日15:44:47

