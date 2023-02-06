---
title: defer (data APIs)
---

这个工具允许你在 `loader` 中通过传递promises，而不是resolved值的方式延迟该loader的返回值。



```jsx
function loader() {
  // 有 `await`， 等待promise resolved
  let product = await getProduct() 
  // 没有 `await` 表示一个promise
  let reviews = getProductReviews()
  return defer({ product, reviews })
}
```

- 更多可查看 [Deferred Data](../guides/deferred-data)

