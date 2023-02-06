---
title: ⚡useNavigate
---

::: warning
在loaders和actions中使用 [redirect](../fetch/redirect) 要比使用这个钩子要更好。
:::

`useNavigate` 返回一个函数，让你可以编程性的导航，比如在一个effect中：
```jsx
import { useNavigate } from 'react-router-dom'

function useLogouTimer() {
  const userIsInactive = useFakeInactiveUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (userIsInactive) {
      fake.logout()
      navigate('/session-timed-out')
    }
  }, [userIsInactive])
}
```

类型定义：
```typescript
declare function useNavigate(): NavigateFunction;

// 包含2个方法
interface NavigateFunction {
  // 1️⃣
  (
    to: To,
    options?: { 
      replace?: boolean;
      state?: any;
      relative?: RelativeRoutingType;
    },
  ): void;

  // 2️⃣ 直接传入数字，可以为负数
  (delta: number): void;
}

// 译者添加
type To = string | Partial<Path>

// 译者添加
interface Path {
  pathname: string;
  search: string;
  hash: string;
}
```
`navigate` 函数有2个签名：
1. 要么传入一个 `To` 值（和 `<Link to>` 一样的类型），还可以添加一个可选的配置，比如 `{ replace: true }`
2. 传入一个历史栈中的delta值。比如，`navigate(-1)` 相当于点击返回按钮

createAt: 2022年08月02日22:53:56

updateAt: 2023年02月06日14:01:25
