---
title: createMemoryRouter
---

## 1️⃣ createMemoryRouter
memory router在内存中管理自己的history栈，而不是使用浏览器history。它主要用于测试和组件开发工具（比如，Storybook），但它还可以用于在非浏览器环境允许你React Router😎。



```jsx {3,24-27}
import {
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom'
import * as React from 'react'
import {
  render,
  waitFor,
  screen,
} from '@testing-library/react'
import '@testing-library/jest-dom'
import CalendarEvent from './routes/event'

test("event route", async () => {
  const FAKE_EVENT = { name: "test event" };
  const routes = [
    {
      path: "/events/:id",
      element: <CalendarEvent />,
      loader: () => FAKE_EVENT,
    },
  ]

  const router = createMemoryRouter(routes, {
    initialEntries: ["/", "/events/123"],
    initialIndex: 1,
  })

  render(<RouterProvider router={router} />);

  await waitFor(() => screen.getByRole("heading"));
  expect(screen.getByRole("heading")).toHaveTextContent(
    FAKE_EVENT.name
  )
})
```



## 2️⃣ 类型定义

```typescript
function createMemoryRouter(
  routes: RouteObject[],
  opts?: {
    basename?: string;
    initialEntries?: InitialEntry[];
    initialIndex?: number;
    window?: Window;
  }
): RemixRouter;
```



## 3️⃣ initialEntries

history栈中初始的条目。这允许你在历史堆栈中已经有多个locations的情况下启动测试(或应用程序)(用于测试导航返回等)。

```jsx {2}
createMemoryRouter(routes, {
  initialEntries: ["/", "/events/123"],
});
```



## 4️⃣ initialIndex

渲染history栈中的初始索引。这允许你在一个特定的条目开始测试。它默认为initialEntries中的最后一个条目。

```jsx {3}
createMemoryRouter(routes, {
  initialEntries: ["/", "/events/123"],
  initialIndex: 1, // 从 "/events/123" 开始
});
```



## 5️⃣ 其它属性

其余属性，可参考 [createBrowserRouter](./createBrowserRouter)



2023年01月31日18:04:12
