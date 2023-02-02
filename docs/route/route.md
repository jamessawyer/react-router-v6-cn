---
title: Route
---

## 1️⃣ Route
路由可能是React Router应用中最重要的部分了。它将URL片段和组件，数据加载和数据突变耦合起来。通过路由嵌套，负载应用的布局和数据依赖变得简单和具有声明式。

**📚 路由是传递给router创建函数的对象**：

```jsx {3,6,9,17,22}
const router = createBrowserRouter([
  {
    // 将渲染该函数
    element: <Team />,
    
    // 当URL匹配到该片段时
    path: '/teams/:teamId',
    
    // 在渲染前使用进行数据加载
    loader: async ({ request, params }) => {
      return fetch(
      	`/fake/api/teams/${params.teamId}.json`,
        { signal: request.signal }
      )
    },
    
    // 当数据提交时，执行突变
    action: async ({ request }) => {
      return updateFakeItem(await request.formData())
    },
    
    // 出错时，渲染该元素
    errorElement: <ErrorBoundary />
  }
])
```

你也可以通过JSX形式 + [createRoutesFromElements](../utilities/createRoutesFromElements) 方式声明路由，元素的属性等同于路由对象中的属性：

```jsx
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<Team />}
      path="team/:teamId"
      loader={async ({ params }) => {
        return fetch(
          `/fake/api/teams/${params.teamId}.json`,
          { signal: request.signal }
        )
      }}
      action={async ({request}) => {
        return updateFakeItem(await request.formData())
      }}
      errorElement={<ErrorBoundary />}
    />
  )
)
```

这两种风格没有优劣，行为也完全相同。对于本文档的大部分内容，我们将使用JSX风格，因为这是大多数人在React Router上下文中习惯使用的风格。



## 2️⃣ 类型定义

```typescript
interface RouteObject {
  path?: string;
  index?: boolean;
  children?: React.ReactNode;
  caseSensitive?: boolean;
  id?: string;
  loader?: LoaderFunction;
  action?: ActionFunction;
  element?: React.ReactNode | null;
  errorElement?: React.ReactNode | null;
  handle?: RouteObject['handle'];
  shouldRevalidate?: ShouldRevalidateFunction;
}
```





## 3️⃣ path

匹配URL的路径模式，决定是否该路由匹配某个URL，link href或表单action。



### 3.1 动态片段

📚如果某个路径以 `:` 开头，则它将变为一个动态片段（`dynamic segments`）。当路由匹配URL时，该动态片段会从该URL上进行解析，并且以 `params` 提供给其它路由器APIs。

```jsx {5,7,11,19}
<Route
  // 这个路径将匹配如下类似URLs
  // - /teams/hotspur
  // - /teams/real
  path="/teams/:teamId"
  // 匹配的参数将在loader中可以访问到
  loader={({ params }) => {
    console.log(params.teamId) // 'hotspur'
  }}
  // action也一样
  action={({ params }) => {
    console.log(params.teamId) // 'hotspur'
  }}
  element={<Team />}
/>

// 该元素通过 `useParams()` 获取该参数
function Team() {
  let params = useParams()
  console.log(params.teamId) // 'hotspur'
}
```

一个路由路径可以存在多个动态参数：

```jsx
<Route path="/c/:categoryId/p/:productId" />
// 2个动态参数都可以访问到
params.categoryId;
params.productId;
```

动态参数不变是 `部分的`：

- 🚫 `/teams-:teamId`
- ✅ `/teams/:teamId`
- 🚫 `/:category--:productId`
- ✅ `/:productSlug`

你仍然可以支持这样的URL模式，你只需要做一些自己的解析😅:

```jsx
function Product() {
  const { productSlug } = useParams()
  const [category, product] = productSlug.split('--')
}
```



### 3.2 ⭐ 可选片段

📚你可以通过在路由片段后面添加 `?` 方式使其变为可选

```jsx {6}
<Route
  // 这个路径将匹配如下类似URLs
  // - /categories
  // - /en/categories
  // - /zh/categories
  path="/:lang?/categories"
  // 匹配的参数可能在loader中可以访问到
  loader={({ params }) => {
    console.log(params.lang)
  }}
  // action也一样
  action={({ params }) => {
    console.log(params.lang)
  }}
  element={<Categories />}
/>

// 该元素通过 `useParams()` 获取该参数
function Categories() {
  let params = useParams()
  console.log(params.lang)
}
```

::: tip

对静态片段也可以使用可选片段（`optional segments`）:

```jsx
<Route path="/project/task?/:taskId"
```

:::





### 3.3 Splats

📚也称之为 `catchall` 或 `star` 片段。如果一个路由路径模式以 `/*` 结尾，它将匹配任何的跟在 `/` 之后除了 `/` 之外的字符😎。

```jsx {1,4,9,12}
// 假设当前URL是 `/files/one/two`

<Route
  // 这个路径将匹配如下类似URLs
  // - /files
  // - /files/one
  // - /files/one/two
  // - /files/one/two/three
  path="/files/*"
  // 匹配的参数将在loader中可以访问到
  loader={({ params }) => {
    console.log(params["*"]) // 'one/two'
  }}
  // action也一样
  action={({ params }) => {
    console.log(params["*"]) // 'one/two'
  }}
  element={<Team />}
/>

// 该元素通过 `useParams()` 获取该参数
function Team() {
  let params = useParams()
  console.log(params["*"]) // 'one/two'
}
```

::: tip

你可以结构出 `*`， 只需要给它赋予一个新的名字。通常名字为 `splat`:

```jsx
let { org, '*': splat } = params
```

:::





### 3.4 布局路由

忽略路径将使该路由变为 **布局路由（`layout route`）**。它期望UI进行嵌套，但是它不会添加任何片段到URL中。





## 4️⃣ index

决定某个路由是否是索引路由。索引路由在父路由URL时，渲染到父路由的 [Outlet](../components/Outlet)  中（**类似默认子路由**）：

```jsx {2}
<Route path="/teams" element={<Teams />}>
  <Route index element={<TeamsIndex />} />
  <Route path=":teamId" element={<Teams />} />
</Route>
```



## 5️⃣ children

::: warning

(TODO: 需要讲到嵌套，可能需要一个单独的文档😅)

:::



## 6️⃣ caseSensitive

指示路由是否匹配大小写：

```jsx
<Route path="/wEll-aCtive" caseSensitive element={<Teams />} />
```

- 将匹配 `/wEll-aCtive`
- 无法匹配 `/well-active`



## 7️⃣ loader

路由loader会在路由渲染元素和通过 `useLoaderData` 提供数据给元素之前被调用：

```jsx {3-5,10}
<Route
  path="/teams/:teamId"
  loader={({params}) => {
    return fetchTeam(params.teamId)
  }}
  element={<Teams />}
/>

function Team() {
  let team = useLoaderData()
}
```

::: warning 🚨

如果你没有使用 [createBrowserRouter](../routers/createBrowserRouter) 类似的 **数据路由**，上面操作无效

:::



- 更多细节参考 [loader](./loader)





## 8️⃣ action

当提交通过 `Form` 或 `fetcher` 或 `submission` 发送给路由时，路由action会被调用。

```jsx {3-5}
<Route
  path="/teams/:teamId"
  action={async ({ request }) => {
    const formData = await request.formData()
    return updateItem(formData)
  }}
/>
```

::: warning 🚨

如果你没有使用 [createBrowserRouter](../routers/createBrowserRouter) 类似的 **数据路由**，上面操作无效

:::



- 更多细节参考 [action](./action)





## 9️⃣ element

当路由匹配到URL时渲染的元素：

```jsx
<Route path="/for-sale" element={<Properties />} />
```





## 🔟 errorElement

当渲染时路由抛出异常，在 `loader` 或者 `action` 中，这个元素将替代 `element` 被渲染。



::: warning 🚨

如果你没有使用 [createBrowserRouter](../routers/createBrowserRouter) 类似的 **数据路由**，上面操作无效

:::



- 更多细节参考 [errorElement](./errorElement)



## 1️⃣1️⃣ handle

任意应用特定的数据，可参考 `useMatches` 文档。





createAt: 2023年01月31日20:23:00

