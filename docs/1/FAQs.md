---
title: FAQs
---

[[toc]]

下面是关于React Router V6人们常见的一些问题。

## 1️⃣ withRouter去哪里了？我需要它

这个问题一般来自于你使用了React Class组件，它不支持Hooks。在React Router V6中，我们全面拥抱了Hooks，并使用它们共享所有路由器（`router`）内部状态。但是这并不意味着你不能使用该路由器。假设你实际上是能使用Hooks的（React v16.8+）,你只需要一个包装器即可。

```jsx
import {
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation()
    let navigate = useNavigate()
    let params = useParams()

    return <Component 
      {...props}
      router={{ location, navigate, params }}
    />
  }

  return ComponentWithRouterProp
}
```

## 2️⃣ 为什么\<Route>使用 `element` 属性，而不是 `render` 或 `component` 属性？

在React Router V6中，我们从V5的 `<Route component>` & `<Route render>` APIs变为了 `<Route element>`。为什么这样呢？
对于初学者，我们发生React率先使用了 `<Suspense fallback={<Spinner />}>` API。`fallback` 属性接受一个 **`React Element`**，而不是一个 `Component`。这使得我们可以很轻易的从渲染 `<Spinner>` 元素的组件中传递任意属性。🚀🚀

使用元素而不是组件意味着我们不需要提供 `passProps` 风格的API，因此你的元素可以得到想要的属性。例如，在一个基于组件的API中，当 `<Route path=":userId" component={Profile} />` 匹配上，渲染 `<Profile />` 元素时，没有好的方式给它传递属性。大多数使用了这种方式的React库，最终都提供了类似 `<Route component={Profile} passProps={ { animate: true } }>` 的API 或者 使用 `render` 属性 或者 高阶组件的形式。

另外，`Route` 的渲染API在V5中相当的大。当我们制作`v4/5`版时，对话是这样的:
```jsx
// ah, 这很好很简洁 😎
<Route path=":userId" component={Profile} />

// 但是等一下，我怎么将自定义属性传递给<Profile>元素呢？😥
// 嗯，也许我们这种情况可以使用一个 `render` 属性？ 🤔
<Route
  path=":userId"
  render={routeProps => (
    <Profile routeProps={routeProps} animate={true} />
  )}
/>

// 好吧，我们对一个 route 有了2种渲染方式 😅

// 当等一等，假如我们想当 `没有匹配上URL` 也想渲染一点东西时，
// 类似 Not Found 页面 该怎么办？
// 也许我们可以使用另一个有稍微语义差异的渲染属性？🙄
<Route
  path=":userId"
  children={({ match }) => (
    match ? (
      <Profile match={match} animate={true} />
    ) : (
      <NotFound />
    )
  )}
/>

// 那假设我想访问路由匹配，或者重定向路由树的更深层的路由？
function DeepComponent(routeStuff) {
  // 获取 routeStuff 😮‍💨
}
export default withRouter(DeepComponent)

// 好吧，我们至少覆盖了所有的场景 😂
```
至少这种API扩展的部分原因是React没有为我们提供任何方法来获取`<Route>` 到你的路由元素的信息，因此我们必须创造聪明的方式让路由数据和你的自定义属性传递到你的元素上： `component`，`render`属性，`passProps` 高阶组件...直到Hooks的出现！

现在，上面的对话可能是这样的：
```jsx
// Ah 友好简洁的API。这就像 <Suspense> API一样
// 不用学更多知识了 😎
<Route path=":userId" element={<Profile />} />

// 但是等一下，我怎么将自定义属性传递给<Profile>元素呢？
// 没错，它就是一个元素。简单 🤩
<Route path=":userId" element={<Profile animate={true} />} />

// 好吧，但我们如何访问router数据呢，比如URL参数或当前location?
function Profile({ animate }) {
  let params = useParams()
  let location = useLocation()
}

// 但更深层次的组件怎么办？
function DeepComponent() {
  // 没错，和任何地方一样 😎
  let navigate = useNavigate()
}

// haha 都结束了 🚀
```
V6中使用 `element` 属性的另一个原因是， `<Route children>` 为嵌套路由保留。

## 3️⃣ 在V6中如何添加没有匹配（404）？
在 `v4` 中我们不在route中添加 `path` 属性。在 `v5` 中，我们在Route中包裹我们的404元素并使用 `path="*"` 。在 `v6` 中，我们使用新的 `element` 元素，并传递 `path="*"`:
```jsx
<Route path="*" element={<NoMatch />} />
```

## 4️⃣ \<Route>不渲染？那我如何进行组合？


在 `v5` 中，`<Route>` 组件就是一个普通组件，就好比 `if` 语句，当URL匹配了其路径时，它就会渲染。

🚀🚀 而 `v6` 中，`<Route>` 元素实际上不进行渲染，它仅仅为了让 `Routes` 生成配置。
在 `v5` 中，因为routes就是组件，因此当路径为 `/my-route` 时，`MyRoute` 就会被渲染：
```jsx
// V5版本
let App = () => (
  <div>
    <MyRoute />
  </div>
)

let MyRoute = ({ element, ...rest }) => {
  return (
    <Route path="/my-route" children={<p>Hello!</p>} />
  )
}
```
然而，在 `v6` 中，只有 `<Route>` 上的属性会被使用到，因此下面代码永远不会渲染 `<p>Hello!</p>`，因为 `<MyRoute>` 上不存在 `path` 属性，因此无法被 `<Routes>` 发现：
```jsx {10}
// V6 错误写法
let App = () => (
  <Routes>
    <MyRoute />
  </Routes>
)

let MyRoute = () => {
  return (
    // 不会渲染 因为 path 写在这里了
    <Route path="/my-route" children={<p>Hello!</p>} />
  )
}
```
💡可以使用下面方式得到正确的渲染：
 - 只在 `<Routes>` 中使用 `<Route>` 元素
 - 将组合移到 `element` 属性上
```jsx
let App = () => (
  <div>
    <Routes>
      <Route path="/my-route" element={<MyRoute />} />
    </Routes>
  </div>
)

let MyRoute = () => (
  <p>Hello!</p>
)
```
在`<Routes>`中静态地提供完整的嵌套路由配置将使`v6`中的许多特性成为可能。所以我们鼓励你把你的路由放在一个顶层配置中。如果你真的喜欢组件独立于任何其他组件来匹配URL的想法，你可以写一个行为类似于v5 `Route` 的组件:
```jsx {2}
function MatchPath({ path, Comp }) {
  let match = useMatch(path)
  return match ? <Comp /> : null
}

// 需放在 `<Routes>` 中
<MatchPath path="/accounts/:id" Comp={Account} />
```

## 5️⃣ 如何深层嵌套路由？
在 `v5` 中，你可以在任何地方渲染 `<Route>` 或 `<Switch>`。你可以继续这样做，但是你需要使用 `<Routes>`(`<Route>` 没有 `s` 是不行的)。我们称之为 **后代 `<Routes>`**。

`v5` 可能看着如下：
```jsx {11-13}
// v5.jsx
<Switch>
  <Route path="/users" component={Users} />
</Switch>

// 在更深的路由
function Users() {
  return (
    <div>
      <h1>Users</h1>
      <Switch>
        <Route path="/users/account" component={Account} />
      </Switch>
    </div>
  )
}
```
💡 `V6` 基本相同：
 - 注意在祖先路由中的 `*` 使其能匹配更深层的URLs，即使它没有直接的children
 - 你不再需要知道整个子路由路径，你可以使用相对路由了🎉

```jsx {13-15}
// v6.jsx

// 路由树上层某个地方
<Routes>
  <Route path="/users/*" element={<Users />} />
</Routes>

// 路由树下层某个地方
function Users() {
  return (
    <div>
      <h1>Users</h1>
      <Routes>
        <Route path="account" element={<Account />} /> {/* 使用相对路径😎 */}
      </Routes>
    </div>
  )
}
```
如果你在 `v5` 中有 **“浮动路由”**（没被 `<Switch>` 包裹），可以使用 `<Routes>` 对其简单包裹：
```jsx
// v5
<Route path="/contact" component={Contact} />

// v6
<Routes>
  <Route path="contact" element={<Contact />} />
</Routes>
```

## 6️⃣ Regexp Routes Paths发生了什么？
正则路由路径被移除有2个原因：
1. 在路由中的正则表达式路由对 `v6` 的排名路由匹配会引发很多问题。我们怎么对正则进行排名？
2. 我们可以彻底摆脱 `path-to-regexp` 的依赖，并显著的缩减了发送给用户浏览器包的尺寸。如果我们再将其添加回来，则表示React Router会增加 `1/3` 尺寸。

在看过很多使用用例后，我们发现没有正则路径直接的支持，我们仍可以满足场景需求，因此我们通过权衡，移除了它，包体积显著减小，以及避免其对排名引发的问题。

正则路由一次只关心一个URL片段，并做如下2件事中的1件：
1. 匹配多个静态值
2. 验证参数（是数字还是不是数字）

> 匹配通用静态值

很常见的路由是，用正则匹配多语言代码：
```jsx
// v5-lang-route.js
function App() {
  return (
    <Switch>
      <Route path={/(en|es|fr)/} component={Lang} />
    </Switch>
  )
}

function Lang({ params }) {
  let lang = params[0]
  let translations = I18n[lang]
  // ...
}
```
实际上，它们全部都是静态路径，因此在 `v6` 中，你可以添加3个路由，直接给组件传递代码。如果有很多语言，你还可以用一个数组进行映射路由，避免重复：
```jsx
// v6-lang-route.jsx
function App() {
  return (
    <Routes>
      <Route path="en" element={<Lang lang="en" />} />
      <Route path="es" element={<Lang lang="es" />} />
      <Route path="fr" element={<Lang lang="fr" />} />
    </Routes>
  )
}

function Lang({ lang }) {
  let translations = I18n[lang]
  // ...
}
```

> 做某种参数验证

另一种常见场景是，确保参数是一个整数。
```jsx
// v5-userId-route.jsx
function App() {
  return (
    <Switch>
      <Route path={/users\/(\d+)>/>} component={User} />
    </Switch>
  )
}

function User({ params }) {
  let id = params[0]
  // ...
}
```
这种情况，你必须自己在匹配的组件中做一点正则校验的工作：
```jsx {13}
// v6-userId-route.jsx
function App() {
  return (
    <Routes>
      <Route path="/users/:id" element={<ValidateUser />} />
      <Route path="/users/*" element={<NotFound />} />
    </Routes>
  )
}

function ValidateUser() {
  let params = useParams()
  let userId = params.id.match(/\d+/)
  if (!userId) {
    return <NotFound />
  }
  return <User id={params.userId} />
}

function User(props) {
  let id = props.id
  // ...
}
```
在 `v5` 中，如果正则没有匹配上，则 `<Switch>` 将继续尝试匹配下一个路由：
```jsx
// v5-switch.jsx
function App() {
  return (
    <Switch>
      <Route path={/users\/(\d+)/} component={User} />
      <Route path="/users/new" exact component={NewUser} />
      <Route
        path="/users/inactive" 
        exact
        component={InactiveUsers}
      />
      <Route path="/users/*" component={NotFound} />
    </Switch>
  )
}
```
看这个例子，在v6版本中，你可能担心其余的URLs可能不会渲染，因为 `:userId` 路由可能先匹配。但是，**感谢路由排名🎉，这并不是你想的那样**。`"new"` 和 `"inactive"` 路由拥有更高的排名，因此会在各自的URLs渲染：

```jsx
// v6-ranked.jsx
function App() {
  return (
    <Routes>
      <Route path="/users/:id" element={<ValidateUser />} />
      <Route path="/users/new" element={<NewUser />} />
      <Route path="/users/inactive" element={<InactiveUser />} />
    </Routes>
  )
}
```
事实上，*如果你没有将路由顺序摆放正确，`v5` 版本存在各种各样的问题。而 `v6` 版本则彻底消除了这个问题。😎*


> Remix 用户

如果你使用 [Remix](https://remix.run/)，你可以将工作迁移到你的loader的方式给浏览器发送合适的40X响应。这同时也减小了浏览器打包尺寸，因为loader是运行在服务器上的。
```js
// remix-useLoaderData.js
import { useLoaderData } from 'remix'

export async function loader({ params }) {
  if (!params.id.match(/\d+/)) {
    throw new Response('', { status: 400 })
  }

  let user = await fakeDb.user.find({
    where: { id: params.id }
  })

  if (!user) {
    throw new Response('', { status: 404 })
  }
  return user
}

function User() {
  let user = useLoaderData()
  // ...
}
```
remix将渲染最近的[捕获边界](https://remix.run/docs/en/v1/api/conventions#catchboundary)，而不是撕裂组件。

2022年08月03日14:07:59
