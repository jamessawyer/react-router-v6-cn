---
title: ⚡useNavigate
---

类型定义：
```typescript
declare function useNavigate(): NavigateFunction;

// 包含2个方法
interface NavigateFunction {
  // 1️⃣
  (
    to: To,
    options?: { replace?: boolean, state?: any }
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

`useNavigate` 返回一个函数，让你可以编程性的导航，比如在表单提交后，如果使用 `replace: true`，导航会直接取代历史栈中的当前条目，而不是添加一个新的条目。
```jsx {4,9}
import { useNavigate } from 'react-router-dom'

function SignupForm() {
  let navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()
    await submitForm(event.target)
    navigate('../success', { replace: true })
  }

  return <form onClick={handleSubmit}>{/* ... */}</form>
}
```

2022年08月02日22:53:56
