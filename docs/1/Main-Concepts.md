---
title: 主要概念
---
目录:
[[toc]]

:::warning
本文档深入探讨了React Router实现的路由背后的核心概念。
:::

你可能会疑惑React Router到底做了些什么。它如何帮助你构建你的应用呢？另外，到底什么是 **路由（`router`）** 呢？

如果你曾有这些疑惑，或者想更深入了解路由，这里便是正确的地方。这篇文档将包含React Router幕后所有核心概念详细的解释。🚀

不要被这篇文档吓到了！对日常使用，React Router是相当简单的。仅仅使用的话，不需要这么深入了解它。

React Router不仅仅是将url匹配到函数或组件：它是关于构建一个映射到URL的完整用户界面，所以它可能比你使用到的有更多的概念。我们将深入React Router的3个主要职责：

1. 订阅和操作 `history栈`
2. 匹配 `URL` 到你的 `路由`
3. 根据 `路由匹配` 渲染嵌套UI



## 1️⃣ 定义（Definitions）

首先，先看看一些定义！**对于前后端路由导航框架存在很多不同的思想。** 有时某个 **词** 在不同的语境下会存在不同的含义。

下面是我们再谈论React Router时常用的一些 **词**。后面的文档会对每个词进行更深入的讲解：

1. `URL` - 在地址栏中的URL。很多人将名词 `URL` 和 `route` 交替使用，但它不是React Router中的路由（`route`），它仅仅就是URL；
2. `Location` - 这是React Router基于浏览器 `window.location` 而来的特定的对象。它表示 *用户在哪里😎*。它基本上是URL的对象表示形式，但包含更多数据；
3. `Location State` - 一个值，它与`URL`中未编码的 `Location` 一起持久存在。很像hash或者搜索参数（在URL中被编码的数据），**但是对浏览器不可见的被存储**；
4. `History Stack` - 当用户导航时，浏览器会追踪栈中每个 `Location`。如果你对浏览器的后退按钮你点击，一直按着，就会看到浏览器的历史栈；
5. `Client Side Routing(CSR)` - 一个纯HTML文档可以链接到其他文档，浏览器自己处理历史堆栈。**客户端路由使得开发者能够自己操作浏览器历史栈，而不需要向服务器发送请求😎**；
6. `History` - 一个对象，它允许React Router订阅URL的变化，另外还提供了编程性操控 `History Stack` 的接口；
7. `History Action` - `POP | PUSH | REPLACE` 其中的一个；用户可以通过以下三种原因之一访问URL。
   1. `PUSH`: 当先的条目进入历史栈中（一般是点击链接或者开发者强制导航）
   2. `REPLACE`: 和push类似，只不过它会替代当前历史栈中的条目，而不是添加一条新的
   3. `POP`: 当用户点击浏览器的前进或者后退按钮时
8. `Segment` - `URL | path pattern` 在 `/` 之间的部分，比如 `/users/123` 有2个片段；
9. `Path Pattern` - 📚（路径模式）这些看起来像url，但可以有特殊字符来匹配url到路由，比如 **动态片段（`/users/:userId`）** 或者星号片段（`/docs/*`）。他们不是URLs，它们是React Router将匹配的模式；
10. `Dynamic Segment` - 路径模式的一段，它是动态的，这意味着它可以匹配段中的任何值。比如，`/users/:userId` 模式将匹配类似 `/users/123` 这样的URLs；
11. `URL Params` - 从匹配了动态片段的URL中解析出来的值
12. `Router` - 🤩有状态的，最上层使其它所有组件和hooks运作的的组件；
13. `Router Config` - 一棵**路由对象树**，它将根据当前位置进行排名和匹配(嵌套)，以创建一个**路由匹配**分支；
14. `Route` - 📚一个对象或者Route Element，通常包含 `{path, element}` 或者 `<Route path element >` 结构。其中 `path` 是一种路径模式。当路径模式匹配上了当前URL，元素将会被渲染；
15. `Route Element` - 或 `<Route>` 。🤩元素的属性将被 `<Routes>` 读取创建 `route`；否者什么也不做；
16. `Nested Routes` - 🤩因为路由可以包含子路由，每个路由通过片段只定义URL的一部分，一个URL可以匹配树的一个嵌套“分支”中的多个路由。*这提供了通过 `outelet` 或 相对链接 等方式创建自动布局嵌套*；
17. `Relative links` - 不以 `/` 开头的链接将继承它们被渲染时最近的路由。这使得链接更深层次的URLs变得简单，而不需要知道整个路径；
18. `Match` - 📚当路由与URL匹配时保存信息的对象，比如匹配的URL参数和路径名；
19. `Matches` - 匹配当前location的路由数组（或路由配置分支）。此结构启用嵌套路由；
20. `Parent Route` - 包含子路由的路由；
21. `Outlet` - 🤩 渲染一组匹配中的下一个匹配的组件；
22. `Index Route` - 一种没有路径的子路由，在父路由的URL处的父路由outlet中渲染
23. `Layout Route` - 没有路径的**父路由**，仅用于将子路由组合到特定的布局中





## 2️⃣ History 和 Locations

在React Router运作前，它必须能够订阅浏览器历史栈（`history stack`） 的变化。

当用户导航时，浏览器会维护自己的历史栈。这正是前进和后台按钮能工作的原因。在传统网站中（不包含JS的HTML文档），每当用户点击链接或者前进后退时，浏览器都会向服务器发送请求，提交表单。

🌰 比如，假设用户：

1. 点击链接到 `/dashboard`
2. 点击链接到 `/accounts`
3. 点击链接到 `/customers/123`
4. 点击后退按钮
5. 点击链接到 `/dashboard`

历史栈变化如下，加粗部分表示当前URL:

1. **`/dashboard`**
2. /dashboard, **`/accounts`**
3. /dashboard, /accounts, **`/customers/123`**
4. /dashboard, **`/accounts`**, /customers/123
5. /dashboard, /accounts, **`/dashboard`**



### 2.1 History对象

👩🏻‍🏫使用客户端路由，开发者能够编程性的操控浏览器的 **历史栈**。

比如，我们可以使用下面代码改变URL，而无需像浏览器默认行为那样向服务器发送请求：

```html
<a
   href="/contact"
   onClick={(event) => {
    // 阻止浏览器改变URL和请求新文档
  	event.preventDefault()
    // 将新的条目压入浏览器历史栈中，并改变URL
    window.history.pushState({}, undefined, "/contact")
  }}
/>
```

::: warning

这里仅做演示目的，在React Router中我们并不会直接使用 `window.history.pushState`

:::

上面代码改变了URL，但是对UI什么也没做。我们需要编写更多的代码来改变某个地方的某些状态，以使UI改变到contact页面。**问题是，浏览器并没有给我们任何方式监听URL和订阅变化😅**。

上面说法也不完全正确，我们可以通过 `pop` 事件监听URL的变化：

```js
window.addEventListener('popstate', () => {
  // URL 改变了！
})
```

💡但这个事件只在用户点击前进或后退按钮时才会触发。当编程者调用 `window.history.pushState` & `window.history.replaceState` 时，不存在这样的事件。

这正是React Router定义的 `history` 对象发挥作用的动机。它对 `push | pop | replace` 任意动作都提供了监听URL变化的能力。🎉

```js {2-5}
let history = createBrowserHistory()
history.listen(({ location, action}) => {
  // 当出现新的location时，回调被触发
  // 动作为 `POP | PUSH | REPLACE`
})
```

📚应用无需设置它们自己的history对象 - 这是 `<Router>` 的工作😎。它会设置某个这些对象，并订阅历史栈的变化，最终在URL发生变化时更新状态。这导致应用重新渲染，并显示正确的UI。它唯一需要放上状态的东西是一个 `location`，其他一切都从那个单一的对象工作。



### 2.2 Locations

浏览器有一个location对象 `window.location`。它告诉你关于URL的信息，也提供了一些方法改变URL:

```js
window.location.pathname // 路径信息 /getting-started/concepts/
window.location.hash // #locations
window.location.reload() // 强制刷新（向服务器发送请求）
// 等等
```

::: warning

在React Router应用中，一般不会直接使用 `window.location`

:::

React Router存在一个类似 `window.location` 的 `location` 概念，它更加的简洁，它看起来如下：📒

```js
{
  pathname: '/bbq/pig-pickins',
  search: '?campaign=instagram',
  hash: '#menu',
  state: null,
  key: 'aefz24ie'
}
```

前3个属性 `{pathname, search, hash}` 和 `window.location` 完全相似。

如果你将3者加起来，你将得到用户在浏览器上看到的URL：

```js
location.pathname + location.search + location.hash
// /bbq/pig-pickins?campaign=instagram#menu
```

最后2个属性 `{state, key}` 则是React Router特有的。



#### 2.2.1 Location Hash

*URL中的Hash表示当前页面滚动的位置。* 在 `window.history.pushState` 接口被引入前，网页开发者只能通过hash方式做客户端导航，它是唯一我们避免向服务端发送请求的一种方式😅。但是，今天我们可以使用它的设计目的。



#### 2.2.2 Location State

你可能疑惑为什么 `window.history.pushState()`  方法称之为 `push state`。 状态？难道我们不仅仅改变的是URL？那不应该是 `history.push` 吗？好吧，我们并不在API设计现场，因此我们也不清楚为什么关注点是 `state`，但它仍是浏览器很棒的一个接口。😂

浏览器允许我们通过给 `pushState` 传值的方式保存跳转信息。当用于点击返回时，`history.state` 的值将变回我们之前 `pushed` 的值。

```js {3,5}
window.history.pushState('look ma!', undefined, '/contact')
window.history.state // 'look ma!'
// 用户点击返回 ⬅️
window.history.state // undefined
// 用户点击前进 ➡️
window.history.state // 'look ma!'
```

::: warning

🚨 在React Router应用中，我们并不会直接使用 `window.history.state` 

:::

React Router利用了浏览器的这个功能，对其进行抽象。并将值显示在 `location` 而不是 `history` 上🚨。

你可以认为 `location.state` 和 `location.hash | location.search` 类似，只不过它没有把值放到 `URL` 上，它是隐藏的，只让程序员知道。

`location.state` 的一些比较好的使用场景：

- 告诉下个页面，用户来自哪里和UI分支。最常见的实现是，如果用户点击了栅格中的某个item，弹出modal，显示记录，但是如果它直接在URL中显示，则显示record自己的布局(printerest和老版instagram)。
- 将列表中的部分记录发送给下一个页面。因此可以立即渲染部分数据，之后再取回剩余数据。

💡你可以通过2种方式设置location state：在 `<Link>` 上或 `navigate`:

```jsx
<Link to="/pins/123" state={{ fromDashboard: true }} />

let navigate = useNavigate()
navigate('/users/123', { state: partialUser })
```

下个页面通过 `useLocation` 获取location state:

```jsx
let location = useLocation()
location.state
```

::: tip

Location state值会被序列化，因此像 `new Date()` 会变为字符串

:::



#### 2.2.3 Location Key

📚 **每个Location都会得到一个唯一的Key**。这对基于location的滚动管理，客户端缓存等这类高级场景很有用。因为每个location都有唯一的key，你可以构建抽象，将信息存储在普通对象、`new Map()`甚至`locationStorage`中。

🌰一个通过location key（和获取的URL）实现的一个很简单的客户端数据缓存，当用户点击返回时，跳过数据获取：

```jsx
let cache = new Map()

function useFakeFetch(URL) {
  let location = useLocation()
  let cacheKey = location.key + URL
  let cached = cache.get(cacheKey)
  
  let [data, setData] = useState(() => {
    // 从缓存初始化
    return cached || null
  })
  
  let [state, setState] useState(() => {
    // 如果缓存了，避免获取 😎
    return cached ? 'done' : 'loading'
  })
  
  useEffect(() => {
    if (state === 'loading') {
      let controller = new AbortController()
      fetch(URL, { signal: controller.signal })
      	.then(res => res.json)
      	.then(data => {
        	if (controller.signal.aborted) return
          // 设置缓存
          cache.set(cacheKey, data)
          setData(data)
      	})
     return () => controller.abort()
    }
  }, [state, cacheKey])
  
  useEffect(() => {
    setState('loading')
  }, [URL])
  
  return data
}
```



## 3️⃣ 匹配（Matching）

在初始渲染时，当历史栈发生变化时，React Router会将 `location` 与你的路由配置进行匹配，得出一组`匹配`来渲染。



### 3.1 定义路由

路由配置是一颗路由树，看起来如下：

```jsx
<Routes>
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="teams" element={<Teams />}>
      <Route path=":teamId" element={<Team />} />
      <Route path=":teamId/edit" element={<EditItem />} />
      <Route path="new" element={<NewTeamForm />} />
      <Route index element={<LeagueStandings />} />
    </Route>
  </Route>
  <Route element={<PageLayout />}>
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/tos" element={<Tos />} />
  </Route>
  <Route path="contact-us" element={<Contact />} />
</Routes>
```

👩🏻‍🏫 组件 `<Routes>` 通过其 `props.children` 递归，提取它们的属性，最终生成如下对象：

```js
let routes = [
  {
    element: <App />,
    path: '/',
    children: [
      {
        index: true, // 是否 Index Route
        element: <Home />,
      },
      {
        path: 'teams',
        element: <Teams />,
        children: [
          {
            index: true,
            element: <LeagueStandings />,
          },
          {
            path: ':teamId',
            element: <Team />,
          },
          {
            path: ':teamId/edit',
            element: <EditItem />,
          },
          {
            path: 'new',
            element: <NewTeamForm />,
          },
        ]
      }
    ]
  },
  {
    element: <PageLayout />, // 布局路由
    children: [
      {
        path: '/privacy',
        element: <Privacy />,
      },
      {
        path: '/tos',
        element: <Tos />,
      },
    ]
  },
  {
    path: 'contact-us',
    element: <Contact />,
  }
]
```

::: tip

🚀🚀 实际上，除了使用 `<Routes>`, 你可以使用 `useRoutes(routesGoHere)` 钩子。这正是 `<Routes>` 内部所做的。

:::

如你所见，路由可以定义为多个片段，比如 `:teamId/edit`，或只一个片段 `:teamId`。**路由配置** 分支下的所有片段被添加在一起，为路由创建一个最终的 **路径模式**。



### 3.2 匹配参数（Match Params）

注意 `:teamId` 片段，这就是我们所说的`路径模式`的`动态片段`，这意味着它不会静态匹配URL（实际字符），而是动态匹配它。任何值能满足 `:teamId`。`/teams/123` 或 `/teams/cupcakes` 都能够匹配上。我们成被解析的值为 **URL参数（`URL Params`）**。因此在这种情形下，`teamId` 参数可能是 `"123"` 或 `"cupcakes"`。我们将在 **Rendering** 部分看看如果使用它们。



### 3.3 路由排序（Ranking Routes）

如果我们将我们 **路由配置** 中的所有分支的片段都加起来，我们会得到如下路径模式来响应app：

```js
[
  "/",
  "/teams",
  "/teams/:teamId",
  "/teams/:teamId/edit",
  "/teams/new",
  "/privacy",
  "/tos",
  "/contact-us"
]
```

现在事情变得有趣起来，URL `/teams/new` 会匹配上面哪个模式？

没错，会匹配到2个路径模式：

```
/teams/new
/teams/:teamId
```

📚**React Router必须在这里做出抉择，因为只能有一个路径模式被匹配。** 很多客户端和服务端的路由器，会简单的通过模式定义的先后顺序来处理这一问题。第一个匹配的获胜。在这里，我们会将匹配到 `/` ，并渲染 `<Home />` 组件。这绝对不是我们想要的。这类路由器需要我们特别小心的定义路由顺序以获得期望的结果😅。这正是React Router V6之前的工作方式，但现在一切变得智能多了🤩。

看看这些模式，你很直接的知道，我们想要 `/teams/new` 匹配URL `/teams/new`。这是一个完美匹配！React Router也知道这一点。当匹配时，它会依据片段数量，静态片段，动态片段，星号模式等对路由进行排序，然后挑选最佳匹配🚀。你不再需要考虑路由定义的顺序了。



### 3.4 无路径路由（Pathless Routes）

你可能之前已经主要到了一些奇怪的路由：

```jsx
<Route index element={<Home />} />
<Route index element={<LeagueStanding />} />
<Route element={<PageLayout />} />
```
它们甚至连 `path` 也没有，它们是怎么是一个路由呢？这也是为什么React Router中的 **路由（`route`）** 这个词使用得相当松散的地方。

- `<Home />` & `<LeagueStanding />` 是首路由（`index routes`）
- `<PageLayout />` 是布局路由（`layout route`）

我们将在 `渲染` 部分讨论它是如何工作的。它们都和匹配没有太大的关系。





### 3.5 路由匹配（Route Matches）

📒当一个路由匹配上URL，它会被一个 `match` 对象表示。对 `<Route path=":teamId" element={<Team />} />` 的匹配对象看起来如下：

```js
{
  pathname: '/teams/firebirds',
  params: {
    teamId: 'firebirds'
  },
  route: {
    element: <Team />,
    path: ':teamId'
  }
}
```

`pathname` 包含与此路由匹配的URL部分(我们这里的情况是，URL的所有部分)。`params` 包含从匹配的 `动态片段` 解析的值。注意，param的对象keys直接映射该片段的名字：`:teamId` 变为 `params.teamId`。

因为我们的路由是一棵树🌲，单一URL可以匹配树的整个分支。`/teams/firebirds` 为例，它可能是下面路由分支：

```jsx {2,4-5}
<Routes>
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="teams" element={<Teams />}>
      <Route path=":teamId" element={<Team />} />
      <Route path=":teamId/edit" element={<EditTeam />} />
      <Route path="new" element={<NewTeamForm />} />
      <Route index element={<LeagueStanding />} />
    </Route>
  </Route>
  <Route element={<PageLayout />}>
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/tos" element={<Tos />} />
  </Route>
  <Route path="contact-us" element={<Contact />} />
</Routes>
```
::: tip
**💡React Router会从这些路由和url创建一个`匹配数组`，因此它可以渲染与路由嵌套匹配的嵌套UI。**
:::

```js
[
  {
    pathname: '/',
    params: null,
    route: {
      element: <App />,
      path: '/'
    },
  },
  {
    pathname: '/teams',
    params: null,
    route: {
      element: <Teams />,
      path: 'teams',
    },
  },
  {
    pathname: '/teams/firebirds',
    params: {
      teamId: 'firebirds'
    },
    route: {
      element: <Team />,
      path: ':teamId'
    },
  },
]
```



## 4️⃣ 渲染（Rendering）

最后的概念是渲染。假设下面是你应用的入口文件：

```jsx
const root = ReactDOM.createRoot(
  document.getElementById('root')
)

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="teams" element={<Teams />}>
          <Route path=":teamId" element={<Team />} />
          <Route path="new" element={<NewTeamForm />} />
          <Route index element={<LeagueStandings />} />
        </Route>
      </Route>
      <Route element={<PageLayout />}>
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/tos" element={<Tos />} />
      </Route>
      <Route path="contact-us" element={<Contact />} />
    </Routes>
  </BrowserRouter>
)
```

我们再用 `/teams/firebirds` URL作为示例。`<Routes>` 将匹配你 **路由配置（`route config`）** 中的 `location`，得到一组 **匹配（`matches`）** 🚀🚀，然后渲染如下React元素树：

```jsx
<App>
  <Teams>
    <Team />
  </Teams>
</App>
```

在父路由元素中渲染的每一个匹配都是一个非常强大的抽象。大多数网站和应用共享这种特点：盒子嵌套盒子，盒子再嵌套盒子，每个都有一个导航部分，用于更改页面的一个child部分。



### 4.1 出口（Outlets）

嵌套元素树不会自动发生。`<Routes>` 将给你渲染第一个匹配的元素（这里即 `<App />`）。下一个匹配元素是 `<Teams />`。为了渲染它，`App` 需要渲染一个 **出口（`Outlet`）**。

```jsx {5}
function App() {
  return (
    <div>
      <GlobalNav />
      <Outlet />
      <GlobalFooter />
    </div>
  )
}
```

👩🏻‍🏫 `Outlet` 组件总是渲染下**一个匹配**。这意味着 `<Teams>` 也需要一个outlet用来渲染 `<Team />`。

如果URL是 `/contact-us`，元素树将变为：

```jsx
<ContactForm />
```

因为contact表单并不在主 `<App>` 路由下。

如果URL是 `/teams/firebirds/edit`，元素树将变为：

```jsx
<App>
  <Teams>
    <EditTeam />
  </Teams>
</App>
```

Outlet会当前子元素交换为新匹配的子元素，而父元素布局保持不变😎。这很微妙但是对清理组件很高效。



### 4.2 首路由（Index Routes）

还记得对 `/teams` URL的路由配置：

```jsx
<Route path="teams" element={<Teams />}>
  <Route path=":teamId" element={<Team />} />
  <Route path="new" element={<NewTeamForm />} />
  <Route index element={<LeagueStanding />} />
</Route>
```

如果URL是 `/teams/firebirds`，元素树变为：

```jsx
<App>
  <Teams>
    <Team />
  </Teams>
</App>
```

但如果URL是 `/teams`，元素树则为：

```jsx
<App>
  <Teams>
    <LeagueStanding />
  </Teams>
</App>
```

LeagueStanding？为什么会是 `<Route index element={<LeagueStanding />} />` 出现在这里？**它连个 `path` 都没有！** 理由是它是一个 **首路由（`index route`）**。📚当路径为父路由路径时，首路由会在它父路由的 **出口（`outlet`）** 处被渲染。

可以这样理解，如果你不在你的子路由路径，`<Outlet>` 将在UI中什么都不渲染：

```jsx
<App>
  <Teams />
</App>
```

👩🏻‍🏫假设所有teams列表在左侧，则一个空的 **出口（`outlet`）** 意味着你将在右边得到一个空白页!你的UI需要填充该空白部分：**首路由便是来做这个事情的🤩**。

另一种理解首路由的方式是，**它是默认子路由，当父路由匹配了，但是它的所有子路由都没匹配上。**

取决于UI，你可能并不需要首路由，但是，如果父路由中有任何类型的持久导航，你很可能希望当用户还没有点击其中一个条目时，首路由来填充空间。



### 4.3 布局路由（Layout Routes）

这是我们路由配置的一部分，我们还没有匹配的：`/privacy`。让我们再看看我们的路由配置，高亮匹配的路由：

```jsx {2,11-12}
<Routes>
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="teams" element={<Teams />}>
      <Route path=":teamId" element={<Team />} />
      <Route path=":teamId/edit" element={<EditTeam />} />
      <Route path="new" element={<NewTeamForm />} />
      <Route index element={<LeagueStanding />} />
    </Route>
  </Route>
  <Route element={<PageLayout />}>
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/tos" element={<Tos />} />
  </Route>
  <Route path="contact-us" element={<Contact />} />
</Routes>
```

渲染的元素树为：

```jsx
<PageLayout>
  <Privacy />
</PageLayout>
```

📚显然，`PageLayout` 路由很奇怪。我们诚挚为 **布局路由（`layout route`）**，因为它完全不参与到匹配中（*尽管它的子元素会*）。它的存在只是为了简化在同一个布局中包装多个子路由。如果我们不能这样做，那么我们通过2种不同的方式处理布局：有时你的路由帮你做这些，有时你需要在应用中手动的重复很多布局组件。

::: danger

你可以这样做，但是我们推荐使用布局组件实现

:::



```jsx
<Routes>
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="teams" element={<Teams />}>
      <Route path=":teamId" element={<Team />} />
      <Route path=":teamId/edit" element={<EditTeam />} />
      <Route path="new" element={<NewTeamForm />} />
      <Route index element={<LeagueStanding />} />
    </Route>
  </Route>
  <Route 
    path="/privacy" 
    element={
      <PageLayout>
        <Privacy />
      </PageLayout>
    }
  />
  <Route 
    path="/tos" 
    element={
      <PageLayout>
        <Tos />
      </PageLayout>
    }
  />
  <Route path="contact-us" element={<Contact />} />
</Routes>
```

是的，布局 *路由* 这个名字语义有点愚蠢，因为它和URL匹配实际上没有半毛钱关系，但是它实在是太方便了，因此没有办法😅。





## 5️⃣ 导航（Navigating）

当URL发生变化时，我们称之为 **导航（`navigation`）**。React Router中有2种方式导航：

- `<Link>`
- `navigate`



### 5.1 Link

这是主要的导航手段。渲染 `<Link>` 允许用户通过点击改变URL.React Router将组织浏览器默认的行为，告诉 `history` 推送一个新的条目到 `history stack` 中。 `location` 改变， 新的 **匹配（`matches`）** 将被渲染。

然而，可以访问链接，因为它们：

- 仍旧渲染 `<a href>`，因此默认可访性问题也得以支持（比如键盘，聚焦，SEO等）
- 不阻止浏览器默认行为，如果右键点击或者Command/Ctrl点击 `open in new tab`

**嵌套路由（`Nested Layout`）** 不仅关于渲染布局；他们也开启 **相对链接（`relative links`）**。看看我们先前的 `teams` 路由：

```jsx
<Route path="teams" element={<Teams />}>
  <Route path=":teamId" element={<Team />}
</Route>
```

`<Teams>` 组件中可以如下链接：

```jsx
<Link to="psg" />
<Link to="new" />
```

完整路径分别为 `/teams/psg` & `/teams/new`。它们 **继承了** 它们被渲染的路由。这使得你的路由组件不需要真的知道你应用中的其余路由。大量链接只需添加一个segment即可。你可以重新安排你整个路由配置，这些链接可能仍然可以正常工作。这对于刚开始建立一个网站，设计和布局不断变化的时候是非常有价值的。



### 5.2 导航函数（Navigate Function）

`useNavigate` 钩子返回的函数，允许你无论什么时候改变URL都可以。

```jsx
let navigate = useNavigate()

useEffect(() => {
  setTimeout(() => {
    navigate('/logout')
  }, 30000)
}, [])
```

或在表单提交之后：

```jsx
<form onSubmit={event => {
  event.preventDefault()
  let data = new FormData(event.target)
  let urlEncoded = new URLSearchParams(data)
  navigate('/create', { state: urlEncoded })
}}>
```

类似 `Link`, `navigate` 也具有嵌套的 `to` 值：

```jsx
navigate('psg')
```

你需要有个好的理由用 `navigate` 替代 `<Link>`。这使我们很伤心：

```jsx
<li onClick={() => navigate("/somewhere")} />
```

除了链接和表单之外，很少有交互需要改变URL，因为它会引入关于可访问性和用户期望的复杂性。



## 6️⃣ 数据访问（Data Access）

最后，应用为了构建完整的UI，将向React Router索要一些信息。针对这，React Router有一些钩子：

```jsx
let location = useLocation()
let urlParams = useParams()
let [urlSearchParams] = useSearchParams()
```



## 7️⃣ 🔥回顾（Review）

让我们将上面内容整理在一起

1. 你渲染你的app

   ```jsx
   const root = ReactDOM.createRoot(
     document.getElementById('root')
   )
   
   root.render(
     <BrowserRouter>
       <Routes>
         <Route path="/" element={<App />}>
           <Route index element={<Home />} />
           <Route path="teams" element={<Teams />}>
             <Route path=":teamId" element={<Team />} />
             <Route path="new" element={<NewTeamForm />} />
             <Route index element={<LeagueStandings />} />
           </Route>
         </Route>
         <Route element={<PageLayout />}>
           <Route path="/privacy" element={<Privacy />} />
           <Route path="/tos" element={<Tos />} />
         </Route>
         <Route path="contact-us" element={<Contact />} />
       </Routes>
     </BrowserRouter>
   )
   ```

2. `<BrowserRouter>` 创建一个 `history`，将初始的 `location` 到其state中，并订阅该 `URL`

3. `<Routes>` 递归其 **子路由（`child routes`）** 构建一个 **路由配置（`route config`）**，匹配当前 `location`，创建一些路由 **匹配（`matches`）**，并渲染第一个匹配的路由元素

4. 你在每个 **父路由（`parent route`）** 中渲染一个 **出口组件（`<Outlet />`）**

5. outlets会渲染路由匹配（`matches`）中的下一个匹配

6. 用户点击一个链接

7. 链接调用 `navigate()`

8. `history` 改变URL，并通知 `<BrowserRouter>`

9. `<BrowserRouter>` 重现渲染，然后从第2步开始重复

就是这些了！我们希望本指南能帮助你更深入地理解React Router的主要概念。
