---
title: useSubmit (data APIs)
---

它是 `<Form>` 的命令式版本，允许你（程序员）提交表单，而不是用户。

::: warning 🚨
如果你没有使用 [createBrowserRouter](../routers/createBrowserRouter) 类似的 **数据路由**，上面操作无效
:::
🌰 比如，每当表单中的值发生变化时提交改表单：
```jsx {4,9}
import { useSubmit, Form } from 'react-router-dom'

function SearchField() {
  let submit = useSubmit()
  
  return (
    <Form
      onChange={(event) => {
        submit(event.currentTarget)
      }}
    >
      <input type="text" name="search" />
      <button type="submit">Search</button>
    </Form>
  )
}
```

这也可用于将一段时间不活跃的用户自动登出网站。本例中，我们将5分钟没有导航到其它页面的用户定义为不活跃用户。

```jsx {15}
import { useSubmit, Form } from 'react-router-dom'
import { useEffect } from 'react'

function AdminPage() {
  useSessionTimeout()
  return <div>{/* ... */}</div>
}

function useSessionTimeout() { // 自定义hook
  const submit = useSubmit()
  const location = useLocation()
  
  useEffect(() => {
    const timer = setTimeout(() => {
      submit(null, { method: 'post', action: '/logout' })
    }, 5 * 60_000)
    
    return () => clearTimeout(timer)
  }, [submit, location])
}
```



## submit target

`submit()`的第一个参数可以接收很多种值。

你可以提交任何表单或者表单input元素：

```jsx {7}
// input元素事件
<input onChange={event => submit(event.currentTarget)} />

// React refs
let ref = useRef()
<button ref={ref} />
submit(ref.current)
```

你也可以提交 `FormData`:

```jsx
let formData = new FormData()
formData.append('cheese', 'gouda')
submit(formData)
```

## submit options

submit()第二个参数是直接映射到表单提交属性的一组配置项：

```jsx
submit(null, {
  action: '/logout',
  method: 'post'
})

// 等价于
<Form action="/logout" method="post" />
```

createAt: 2023年02月09日10:22:50

