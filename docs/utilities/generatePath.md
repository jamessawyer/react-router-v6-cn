---
title: generatePath
---

类型声明：
```typescript
declare function generatePath<Path extends string>(
  path: Path,
  params?: {
    [key in PathParams<Path>]: string;
  }
): string;
```
`generatePath` 用 `:id` 和 `*` 占位符将一组参数插入到路由路径字符串中。当你想要从路由路径中消除占位符以便静态匹配而不是使用动态参数时，这可能很有用。🚀

```js
generatePath('/users/:id', { id: '42' }) // '/users/42'

generatePath('/files/:type/*', {
  type: 'img',
  '*': 'cat.jpg',
})
// '/files/img/cat.jpg'
```

2022年08月03日09:50:15
