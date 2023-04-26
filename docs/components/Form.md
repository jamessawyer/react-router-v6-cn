---
title: Form (data APIs)
---

Form组件是一个普通HTML[表单](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)的包装器，它模拟浏览器进行客户端路由和数据突变。它并不是一个你在React生态中使用到的表单验证或者状态管理库（针对这些，推荐使用浏览器内置的 [Form验证](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation) 和服务端数据验证）。



::: warning 🚨

如果你没有使用 [createBrowserRouter](../routers/createBrowserRouter) 类似的 **数据路由**，上面操作无效

:::

```jsx
import { Form } from 'react-router-dom'

function NewEvent() {
  return (
    <Form method="post" action="/events">
      <input type="text" name="title" />
      <input type="text" name="description" />
      <button type="submit">创建</button>
    </Form>
  )
}
```

::: warning

请确保inputs包含 `name` 属性，否则 `FormData` 将不会包含该字段值。

:::

📚所有这些都将触发任何渲染的 [useNavigation](../hooks/useNavigation) 钩子的状态更新，因此当异步操作正在进行中时，你可以构建pending指示器和乐观UI。

如果表单不用操作不用跳转（比如在当前页面添加一个TODO Item），你可以需要使用 [useFetcher](../hooks/useFetcher)

## action

表单将提交的URL，和 [HTML form action](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-action) 类似。唯一差别就是默认动作。

- 使用HTML forms，它默认是完整的URL
- 使用 `<Form>` 组件，它默认为上下文中最近路由的相对URL

🌰假设下面路由和组件：

```jsx
function ProjectsLayout() {
  return (
    <>
    	<Form method="post" />
    	<Outlet />
    </>
  )
}

function ProjectsPage() {
  return <Form method="post" />
}

<DataBrowserRouter>
  <Route
    path="/projects"
    element={<ProjectsLayout />}
    action={ProjectsLayout.action}
  >
    <Route
      path=":projectId"
      element={<ProjectsPage />}
      action={ProjectsPage.action}
    />
  </Route>
</DataBrowserRouter>
```

如果当前URL是 `/projects/123`，在子路由 `ProjectsPage` 中的表单将有一个你所期望的默认的action - `/projects/123`。在本例中，路由是最深匹配的路由，`<Form>`和普通HTML表单都有相同的结果。

但是 `ProjectsLayout` 中的表单将指向 `/projects`，而不是完整的URL。换句话说，它指向渲染表单的路由的URL的匹配到的片段。

当你在路由模块周围添加一些约定时，这有助于可移植性以及表单及其action handlers的共存。

如果你想post到一个不同的路由，则添加一个 `action` 属性：

```jsx
<Form method="post" action="/projects/new" />
```

- 可参考 `Index Search Params` (索引 vs 父路由) （LINK）



## method

默认method是 `get`, GET提交将不会调用action📚。GET提交和普通导航（用户点击链接）一样，除了用户能从表单向URL中提供搜索参数外。

```jsx
<Form method="get" action="/products">
  <input
    aria-label="搜索产品"
    type="text"
    name="q"
  />
  <button type="submit">搜索</button>
</Form>
```

假设用户输入了 `running shoes`，然后提交了表单。React Router模拟浏览器，然后将表单序列化为 [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)，并将用户导航到 `/products?q=running+shoes`。就好像给开发者渲染了一个 `<Link to="/products?q=running+shoes">`，但是却是让用户动态的提供查询字符串😎。

你的路由loader可通过很方便的从 `request.url` 中创建一个新的 [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL)，然后加载数据：

```jsx
<Route
  path="/products"
  loader={async ({ request }) => {
    const url = new URL(request.url) // [!code focus]
    let searchTerm = url.searchParams.get('q') // [!code focus]
    return fakeSearchProducts(searchTerm)
  }}
/>
```



## 突变提交

除 `GET` 之外的所有方法都是突变提交（`mutation submissions`），意味着你通过 `PUT | POST | DELETE | PATCH` 改变你的数据。注意，普通HTML表单只支持 `post` & `get`，我也更倾向坚持这2个方法。

当用户提交表单时，React Router将匹配应用路由中的 `action`，并调用 `<Form action>`，`action` 中可访问序列化后的 [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)。当action完成后，页面中所有的loader数据豆浆自动重新生效，以使得UI与数据同步🚀🚀。

方法也可以在你调用的action中通过 [request.method](https://developer.mozilla.org/en-US/docs/Web/API/Request/method) 访问到。你可以使用它来指示数据抽象提交的意图。

```jsx {28,36}
<Route
  path="/projects/:id"
  element={<Project />}
  loader={async ({ params }) => {
    return fakeLoadProject(params.id)
  }}
  action={async ({ request, params }) => {
    switch (request.method) {
      case 'PUT': {
        let formData = await request.formData()
        let name = formData.get('projectName')
        return fakeUpdateProject(name)
      }
      case 'DELETE': {
        return fakeDeleteProject(params.id)
      }
      default: {
        throw new Response('', { status: 400 })
      } 
    }
  }}
/>

function Project() {
  let project = useLoaderData()
  return (
    <>
      <Form method="put">
      	<input 
          type="text" 
          name="projectName" 
          defaultValue={project.name}
        />
      	<button type="submit">更新Project</button>
      </Form>
      <Form method="delete">
      	<button type="submit">删除Project</button>
      </Form>
    </>
  )
}
```

::: tip

💡 如你所见，2个表单都是对相同的路由进行提交，但是你可以根据 `request.method` 对不同意图进行分支。Actions完成后，`loader` 将重新生效，UI自动与新的数据进行同步。

:::



## replace

指示表单替换历史栈当前记录，而不是添加一条新的记录。

```jsx
<Form replace />
```

默认行为会更具表单行为而定：

1. `method="get"` 表单，默认是 `false`
2. 提交方法依赖 `formAction` 和 `action` 行为：
   - 如果 `action` 抛出错误，则默认为 `false`
   - 如果 `action` 重定向到当前location，默认为 `true`
   - 如果 `action` 重定向到别的location，则默认为 `false`
   - 如果 `formAction` 是当前location，默认为 `false`
   - 其余情况都为 `false`

当发现是 `method="get"` 时，你通常想要用户能够点击返回查看先前搜索结果或过滤结果，等等。但是其余方法默认是 `true`，避免出现 `你确认你想重新提交表单吗？` 的请求。注意，当返回按钮被点击，或者method是 `post | put | patch | delete` 时，即使设置了 `replace={false}`，React Router也不会重新提交表单。

📚换而言之，这实际上只对GET提交有用，并且你希望避免返回按钮显示以前的结果。



## relative

默认情况下，路径是相对于路由层级的，因此 `..` 将往上一层级。偶尔，你可能会发现匹配的URL模式无法嵌套，因此你更倾向于使用相对路径路由。你可以通过 `<Form to="../some/where" relative="path">` 来选择这一行为。



## reloadDocument

指示表单跳过React Router，直接使用浏览器内置的行为提交表单，

```jsx
<Form reloadDocument />
```

建议使用`<form>`，这样可以获得默认和相对action的好处，但除此之外与普通HTML表单相同。

如果不使用Remix这样的框架的话，或者你自己的服务器处理post到路由，这不是很有用。

可参考：

- [useNavigation](../hooks/useNavigation)
- [useActionData](../hooks/useActionData)
- [useSubmit](../hooks/useSubmit)



## preventScrollReset

如果你使用了 `<ScrollRestoration>` （LINk）的话，这个属性允许你在表单action重定向到新的loaction时，阻止滚动到窗口的最上面。

```jsx
<Form method="post" preventScrollReset={true} />
```

可参考：

- `<Link preventScrollReset>` (LINK)



## 大列表过滤

`GET提交`一个很常见的使用场景是 - 过滤大列表，比如电商或者旅游订票网站：

```jsx
function FilterForm() {
  return (
    <Form method="get" action="/slc/hotels">
      <select name="sort">
        <option value="price">价格</option>
        <option value="stars">评分</option>
        <option value="distance">距离</option>
      </select>
      
      <fieldset>
        <legend>星级</legend>
        <label>
          <input type="radio" name="stars" value="5" />{" "}
          ★★★★★
        </label>
        <label>
          <input type="radio" name="stars" value="4" /> ★★★★
        </label>
        <label>
          <input type="radio" name="stars" value="3" /> ★★★
        </label>
        <label>
          <input type="radio" name="stars" value="2" /> ★★
        </label>
        <label>
          <input type="radio" name="stars" value="1" /> ★
        </label>
      </fieldset>
      
      <fieldset>
        <legend>设施</legend>
        <label>
          <input
            type="checkbox"
            name="amenities"
            value="pool"
          />{" "}
          泳池
        </label>
        <label>
          <input
            type="checkbox"
            name="amenities"
            value="exercise"
          />{" "}
          健身房
        </label>
      </fieldset>
    </Form>
  )
}
```

当用户提交这个表单时，表单会根据用户选择序列化到URL中：

```bash
/slc/hotels?sort=price&stars=4&amenities=pool&amenities=exercise
```

你可以通过 `request.url` 获取到这些值：

```jsx
<Route
  path="/:city/hotels"
  loader={async ({ request }) => {
    let url = new URL(request.url)
    let sort = url.searchParams.get('sort')
    let stars = url.searchParams.get('stars')
    let amenities = url.searchParams.get('amenities')
    return fakeGetHotels({ sort, stars, amenities })
  }}
/>
```

可参考：

- [useSubmit](../hooks/useSubmit)



createAt: 2023年02月08日13:00:06

