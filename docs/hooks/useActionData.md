---
title: useActionData (data APIs)
---

该钩子提供了来自前一个导航的 [action](../route/action) 结果的返回值，如果不存在提交（`submission`）则返回 `undefined`。

这个钩子最常见的用法就是表单验证错误。如果表单不对，你可以返回错误，让用户进行重试：

```jsx {2,8,46}
import {
  useActionData,
  Form,
  redirect,
} from 'react-router-dom'

export default function SignUp() {
  const errors = useActionData() // 🎉

  return (
    <Form method="post">
      <p>
        <input type="text" name="email" />
        {errors?.email && <span>{errors.email}</span>}
      </p>

      <p>
        <input type="text" name="password" />
        {errors?.password && <span>{errors.password}</span>}
      </p>

      <p>
        <button type="submit">Sign up</button>
      </p>
    </Form>
  )
}

export async function action({ request }) {
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')
  const errors = {}

  // 验证字段
  if (typeof email !== "string" || !email.includes("@")) {
    errors.email = "That doesn't look like an email address";
  }

  if (typeof password !== "string" || password.length < 6) {
    errors.password = "Password must be > 6 characters";
  }

  // 如果存在错误，则返回该错误数据
  if (Object.keys(errors).length) {
    return errors;
  }

  // 否则创建用户，并重定向
  await createUser(email, password)
  return redirect('/dashboard')
}
```



createAt: 2023年02月02日15:40:23

