---
title: Await (data APIs)
---

用于渲染 [deferred values](../utilities/defer)，并包含自动错误处理。确保先阅读 [Deferred Data指南](../guides/deferred-data)，里面包含与此组件一起协作的APIs。

```jsx {1,10-18}
import { Await, useLoaderData } from 'react-router-dom'

function Book() {
  const { book, reviews } = useLoaderData()
  
  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <React.Suspense fallback={<ReviewSkeleton />}>
        <Await
          resolve={reivews}
          errorElement={<div>加载reviews失败😥</div>}
          children={(resolvedReviews) => {
            <Reviews items={resolvedReviews} />
          }}
        />
      </React.Suspense>
    </div>
  )
}
```

::: warning

`<Await>` 需要再 `<React.Suspense>` 或 `<React.SuspenseList>` 中被渲染，并开启fallback UI。

:::



## 类型定义

```typescript
declare function Await(
  props: AwaitProps
): React.ReactElement

interface AwaitProps {
  children: React.ReactNode | AwaitResolveRenderFunction;
  errorElement?: React.ReactNode;
  resolve: TrackedPromise | any;
}

interface AwaitResolveRenderFunction {
  (data: Awaited<any>): React.ReactElement;
}
```



## children

可以是React元素或者一个函数。

当为函数时，提供的值作为唯一的参数：

```jsx {2}
<Await resolve={reviewsPromise}>
  {(resolvedReviews) => <Reviews items={resolvedReviews} />} 
</Await>
```

当为React元素时，通过 [useAsyncValue](../hooks/useAsyncValue) 提供该数据：

```jsx {2,6}
<Await resolve={reviewsPromise}>
  <Reviews />
</Await>

function Reviews() {
  const resolvedReviews = useAsyncValue()
  return <div>{/* ... */}</div>
}
```



## errorElement

当Promise rejects时，会渲染errorElement，而不是children。可以通过 [useAsyncError](../hooks/useAsyncError) 访问错误。

如果Promises rejects了，你可以提供一个可选的 `errorElement` 来处理该错误：

```jsx {3,9}
<Await
  resolve={reviewsPromises}
  errorElement={<ReviewsError />}
>
  <Reviews />
</Await>

function ReviewsError() {
  const error = useAsyncError()
  return <div>{error.message}</div>
}
```

如果你没有提供errorElement，被rejected的值将冒泡到最近的路由层级的 `errorElement`，并通过 [useRouteError](../hooks/useRouteError) 可访问该rejected的值。



## resolve

接收从 [deferred](../utilities/defer) [loader](../route/loader) 中返回的 `promise`，用于resolve该promise，然后渲染元素：

```jsx {11,14,23,32-33}
import {
  defer,
  Route,
  useLoaderData,
  Await,
} from 'react-router-dom'

<Route
  loader={async () => {
    let book = await getBook()
    let reviews = getReviews() // 没有await
    return defer({
      book,
      reviews // 这是一个promise
    })
  }}
  element={<Book />}
/>
    
function Book() {
  const {
    book,
    reviews // 这是和上面一样的promise
  } = useLoaderData()
  
  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <React.Suspense fallback={<ReviewSkeleton />}>
        <Await
          // 这就是传递给Await组件的promise
          resolve={reivews}
          errorElement={<div>加载reviews失败😥</div>}
          children={(resolvedReviews) => {
            <Reviews items={resolvedReviews} />
          }}
        />
      </React.Suspense>
    </div>
  )
}
```





createAt: 2023年02月06日11:11:30

