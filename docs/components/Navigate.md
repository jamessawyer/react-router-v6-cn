---
title: Navigate
---

::: details 类型声明

```typescript
declare function Navigate(props: NavigateProps): null

interface NavigateProps {
  to: To,
  replace?: boolean;
  state?: any;
}
```

:::



`<Navigate>` 元素在它被渲染时会改变当前location。它是围绕 `useNavigation` 的组件包装器，它接收相同的参数作为属性。



::: tip

添加一个 `useNavigate` 钩子基于组件的版本，使在无法使用hooks的类组件使用它，提供了便利

:::



```jsx {23}
import * as React from 'react'
import { Navigate } from 'react-router-dom'

class LoginForm extends React.Component {
  state = { user: null, error: null }
  
  async handleSubmit(event) {
    event.preventDefault()
    try {
      let user = await login(event.target)
      this.setState({ user })
    } catch (error) {
      this.setState({ error })
    }
  }
  
  render() {
    let { user, error } = this.state
    return (
      <div>
        {error && <p>{error.message}</p>}
        {user && (
          <Navigate to="/dashboard" replace />
        )}
        <form onSubmit={event => this.handleSubmit(event)}>
          <input type="text" name="username" />
          <input type="password" name="password" />
        </form>
      </div>
    )
  }
}
```

