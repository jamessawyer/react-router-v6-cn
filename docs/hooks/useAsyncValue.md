---
title: useAsyncValue (data APIs)
---

从最近的 `<Await>` 祖先组件中返回的解决值（resolved value）。

```jsx {2}
function ProductVariants() {
  const variabts = useAsyncValue()
  return <div>{/* ... */}</div>
}

// Await组件给该值创建上下文
<Await resolve={somePromiseFroProductVariants}>
  <ProductVariants />
</Await>
```

- 更多请参考 [Deferred Data Guide ](../guides/deferred-data) 和 [Await组件](../components/await)



createAt: 2023年02月06日10:44:35

