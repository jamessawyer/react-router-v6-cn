---
title: 选择路由器
---

## 1️⃣ 选择Router
当你的应用只需要一个路由器时，根据你的应用运行的环境可以选择不同的路由器。本文帮助你选择合适的router。

## 2️⃣ 使用v6.4 APIs
在 `v6.4` 版本中，新的routers被引入，用于支持你的data APIs:
- [createBrowserRouter](./createBrowserRouter)
- [createMemoryRouter](./createMemoryRouter)
- [createHashRouter](./createHashRouter)

下面routers不支持data APIs:

- [\<BroswerRouter>](../router-components/BrowserRouter)
- [\<MemoryRouter>](../router-components/MemoryRouter)
- [\<HashRouter>](../router-components/HashRouter)
- [\<NativeRouter>](../router-components/NativeRouter)
- [\<StaticRouter>](../router-components/StaticRouter)

我们推荐使用v6.4+版本。data APIs目前还不支持React Native，但最终会支持的😅。

升级到v6.4最简单的方式就是用 [createRoutesFromElements](../utilities/createRoutesFromElements)，这样你不需要将 `<Route></Route>` 元素转换为路由配置。
```jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="dashboard" element={<Dashboard />} />
      {/* ... etc. */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
```

## 3️⃣ Web项目
我们推荐所有的web项目都使用 [createBrowserRouter](./createBrowserRouter)👍。

它使用完整URL，而不是hash urls(`#this/stuff`)，hash url是在 `window.pushState` 规范化之前比较流行。完整URL更利用SEO，以及更好的服务端渲染，并和其他web平台更加的兼容。

如果你把你的应用托管在一个静态文件服务器上，你需要配置它，将所有请求发送到你的`index.html`，以避免得到404。

如果因为某些原因，你无法使用完整URL，[createHashRouter](./createHashRouter) 才是次优选择。

如果你对data APIs不感兴趣，你也可以继续使用 [\<BroswerRouter>](../router-components/BrowserRouter) 或 [\<HashRouter>](../router-components/HashRouter)。



## 4️⃣ 测试

测试组件可以使用 [createMemoryRouter](./createMemoryRouter) 或 [\<MemoryRouter>](../router-components/MemoryRouter)，而不是你应用中使用的router（应用需要DOM history接口）。

某些React Router APIs内部使用了 `fetch`，只支持Node.js `v18+`。如果Node版本过低，则可以在测试配置中使用 [whatwg-fetch](https://www.npmjs.com/package/whatwg-fetch) 垫片：

```js
// jest.config.js
module.exports = {
  setupFiles: ['whatwg-fetch'],
  // 其余配置
}
```



## 5️⃣ React Native

React Native项目你需要使用 [\<NativeRouter>](../router-components/NativeRouter)。

data APIs目前还不支持React Native，但最终会支持的😅。



2023年01月31日17:52:41

