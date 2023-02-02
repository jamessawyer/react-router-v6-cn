---
title: action (data APIs)
---

📚 路由actions相对于路由 [loader](./loader) 的读（`reads`）数据， 它是 写 （`writes `）数据。它们为应用程序提供了一种通过简单的HTML和HTTP语义执行数据突变的方法，而React Router抽象了异步UI和重新验证的复杂性。这为你提供了具有现代spa的行为和UX功能的HTML + HTTP(其中浏览器处理异步和重新验证)的简单心理模型🚀。



::: warning 🚨

如果你没有使用 [createBrowserRouter](../routers/createBrowserRouter) 类似的 **数据路由**，上面操作无效

:::



```jsx {4-6}
<Route
  path="/song/:songId/edit"
  element={<EditSong />}
  action={async ({ params, request }) => {
    let formData = await request.formData();
    return fakeUpdateSong(params.songId, formData);
  }}
  loader={({ params }) => {
    return fakeGetSong(params.songId);
  }}
/>
```

📚当应用给路由发送一个 `non-get` 提交（比如 `post | put | patch | delete`） 时，actions会被调用。有如下几种方式触发actions：

```jsx
// 表单
<Form method="post" action="/songs" />
<fetcher.Form method="put" action="/songs/123/edit" />

// 命令式提交
let submit = useSubmit()
submit(data, {
  method: 'delete',
  action: '/songs/123'
})

fetcher.submit(data, {
  method: 'patch',
  action: '/songs/123/edit'
})
```



## params

路由参数从 [动态片段](./route#_3-1-动态片段) 中解析，然后传递给你的action。这对找出哪个资源发生了突变很有用：

```jsx
<Route
  path="/projects/:projectId/delete"
  action={({ params }) => {
    return fakeDeleteProject(params.projectId)
  }}
/>
```



## request

这是一个发送到你路由的 [Fetch Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) 实例。 最常见的用例是解析来自request的[FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)。

```jsx
<Route
  path="/projects/:projectId/delete"
  action={async ({ request }) => {
    let formData = await request.formData()
    // ...
  }}
/>
```



> 一个请求？

初看之下，actions接收 `request` 参数可能有点奇怪。你有没有写过这样一行代码😅？

```jsx {3}
<form
  onSubmit={(event) => {
    event.preventDefault()
    // ...
  }}
/>
```

::: tip

**🤔那么你阻止的到底是什么呢？**

没有JavaScript，只有普通的HTML和HTTP web服务器，这个被阻止的默认事件实际上是非常棒的。浏览器将表单中的所有数据序列化为 [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)，并将其作为新请求的主体发送到服务器。和上面代码一样，React Router的 `<Form>` 阻止浏览器发送该request，而是将请求发送给你的路由action📚!这使得使用简单的HTML和HTTP模型的高度动态web应用成为可能。

:::

记住，`formData` 中的值是从表单提交中自动序列化的，因此你的inputs需要一个 `name` 属性。

```jsx
<Form method="post">
  <input name="songTitle" />
  <textarea name="lyrics" />
  <button type="submit">Save</button>
</Form>
```

- 关于 `formData` 可查看 [Working with FormData](https://reactrouter.com/en/main/guides/form-data)



## 返回响应

你可以在action中返回任何值，然后通过 `useActionData` (TODO) 获取action返回的值。当然，你也可以返回一个 [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)。

- 更多可参考 [loader response](./loader#返回响应) 文档



## Actions中抛出异常

你可以在你的action中抛出（`throw`）来打破当前的调用堆栈(停止运行当前代码)，React Router将沿着“错误路径”重新开始。

```jsx
<Route
  action={({requst, params}) => {
    const res = await fetch(
      `/api/properties/${params.id}`,
      {
        method: 'put',
        body: await request.formData()
      }
    )
    if (!res.ok) throw res
    return { ok: true }
  }}
```

- 更多细节和用例，可参考 [errorElement](./errorElement)



createAt: 2023年02月01日09:45:44

