---
title: Deferred Data指南
---

## 问题

想象一个场景，你的某个路由的loaders需要取回的数据非常的慢。比如，假设你要展示用户快递位置：

```jsx
import { json, useLoaderData } from 'react-router-dom'
import { getPackageLocation } frp=om './api/packages'

async function loader({ params }) {
  // getPackageLocation 接口很慢
  const packageLocation = await getPackageLocation(params.packageId)
  
  return json({ packageLocation })
}

function PackageRoute() {
  const data = useLoaderData()
  const { packageLocation } = data
  
  return (
    <main>
      <h1>你包裹的位置：</h1>
      <p>
        lat: {packageLocation.latitude}
        long: {packageLocation.langitude}
      </p>
    </main>
  )
}
```

我们假定 `getPackageLocation` 接口很慢。这会导致出事页面加载时间和过渡到该路由的时间由最慢数据决定。可以通过下面几种方式提升用户体验：

1. 加速慢的东西（比如上面接口😅）
2. 使用 `Promise.all()` 并行数据请求（本例子没有并发请求，但是其余一些场景可能有用）
3. 添加一个全局的过度spinner（对UX有点帮助）
4. 添加一个局部的骨架UI（对UX有点帮助）



如果这些方法都不能很好地工作，那么你可能会被迫将缓慢的数据从loader移出到组件获取中(并在加载时显示一个骨架 fallback UI)。在这种情况下，将在挂载时渲染 fallback UI，然后再开始数据的获取。这从开发体验的角度来讲，因为有 [useFetcher](../hooks/useFetcher) 的帮助，可能并不那么糟糕。并且从UX角度，这也可以同时对客户端过度以及初始页面加载提升加载体验。这看起来似乎解决了这一问题。

但😅在大多数情况下，它仍然不是最优的(特别是如果你是代码拆分路由组件)，原因有两个:

1. 客户端获取导致你的数据获取呈现瀑布流：`document -> js -> 懒加载的路由 -> 数据获取`
2. 你的代码也不能很容易的从组件获取（component fetching）切换到路由获取（route fetching）



## 解决方案

React Router利用React18的Suspense数据获取，使用 [defer响应](../utilities/defer) 和 `<Await>` 组件 + [useAsyncValue](../hooks/useAsyncValue) 钩子。通过这些APIs，你可以同时解决这2个问题😎:

1. 你的数据不再呈现瀑布流：`document -> js -> 懒加载路由 & 数据获取（并发）`
2. 很容易从渲染fallback和等待数据之间进行切换

下面我们深入看看如何实现这一方式的。



## 使用`defer`

通过对缓慢的数据请求添加 `<Await />` ，你可以先渲染一个fallback UI：

```jsx {23-33}
import {
  Await,
  defer,
  useLoaderData
} from 'react-router-dom'
import { getPackageLocation } frp=om './api/packages'

async function loader({ params }) {
  // getPackageLocation 接口很慢
  const packageLocation = await getPackageLocation(params.packageId) // [!code --]
  const packageLocationPromise = getPackageLocation(params.packageId) // [!code ++]
  
  return json({ packageLocation }) // [!code --]
  return defer({ packageLocation: packageLocationPromise }) // [!code ++]
}

function PackageRoute() {
  const data = useLoaderData()
  
  return (
    <main>
      <h1>你包裹的位置：</h1>
      <React.Suspense fallback={<p>包裹位置信息加载中...</p>}>
        <Await
          resolve={data.packageLocation}
          errorElement={<p>包裹位置信息加载失败😥</p>}
        >
          {(packageLocation) => (
            <p>
              lat: {packageLocation.latitude}
              long: {packageLocation.langitude}
            </p>
          )}
        </Await>
      </React.Suspense>
    </main>
  )
}
```



::: details 另外你也可以使用 [useAsyncHook](../hooks/useAsyncHook)

如果你不喜欢render props的方式，你可以使用 `useAsyncHooks`，但这样会将数据分散开来：

```jsx {12,20}
function PackageRoute() {
  const data = useLoaderData()
  
  return (
    <main>
      <h1>你包裹的位置：</h1>
      <React.Suspense fallback={<p>包裹位置信息加载中...</p>}>
        <Await
          resolve={data.packageLocation}
          errorElement={<p>包裹位置信息加载失败😥</p>}
        >
          <PackageLocation />
        </Await>
      </React.Suspense>
    </main>
  )
}

function PackageLocation() {
  const packageLocation = useAsyncValue()
  return (
    <p>
      lat: {packageLocation.latitude}
      long: {packageLocation.langitude}
    </p>
  )
}
```

:::



## 评估解决方案

因此，在触发获取请求之前，我们不是等待组件，而是在用户开始转换到新路由时立即启动对慢数据的请求。

此外，React路由器为此暴露的API是非常符合人体工程学的。你可以根据是否包含`await`关键字在是否延迟之间进行切换🚀:



```jsx
return defer({
  // 不defer
  packageLocation: await packageLocationPromise,
  // defer
  packageLocation: packageLocationPromise
})
```

因此，你可以A/B测试延迟，甚至根据用户或被请求的数据来决定是否defer:

```jsx {7-9}
async function loader({ request, params }) {
  const packageLocationPromise = getPackageLocation(params.packageId)

  const shouldDefer = shouldDeferPackageLocation(request, params.packageId)
  
  return defer({
    packageLocation: shouldDefer
    	? packageLocationPromise
    	: await packageLocationPromise
  })
}
```

可以实现`shouldDeferPackageLocation`来检查发出请求的用户，包裹位置数据是否在缓存中，A/B测试的状态，或者其他任何你想要的。这是非常贴心的🍭



## FAQ

> 为什么不默认defer所有请求？

React路由器 `defer` API是React路由器提供的另一个杠杆，让你可以很好地在权衡之间进行选择。

- 你想页面渲染更快？那么使用defer
- 你想要更低的CLS(内容布局变动)？不要使用defer
- 你想要更快的渲染，并且希望更低的CLS? 只对对慢的和不重要的部分defer



> \<Suspense fallback /> 的fallback什么时候渲染？

`<Await >` 组件只会在`<Await >`组件初始渲染时将未确定（unsettle）的promise抛出到`<Suspense>`边界。如果属性发生了变化，是不会重新渲染fallback的。📚实际上，这意味着当用户提交表单并重新验证loader数据时，不会渲染fallback。当用户使用不同的参数导航到相同的路由时(在上面示例的上下文中，如果用户从左边的包裹列表中选择，以找到它们在右边的位置)，将渲染fallback。

这一开始可能会让人觉得违反直觉，但请相信我们，我们真的想过这个问题，它以这种方式工作是很重要的。让我们想象一个没有延迟API的世界。对于这些场景，你可能希望实现用于表单提交/重新验证的乐观UI。

当你决定尝试 `defer` 的权衡时，我们不希望你必须更改或删除这些优化，因为我们希望你能够轻松地在延迟某些数据和不延迟数据之间切换。因此，我们确保你现有的乐观状态以同样的方式工作。如果我们不这么做，那么你可能会体验到所谓的“爆米花UI”，即数据提交触发fallback加载状态，而不是你努力工作的乐观UI。

::: tip

所以请记住:`Deferred`是100%只关于路由和它的参数的初始加载。

:::



createAt: 2023年02月06日12:39:11

