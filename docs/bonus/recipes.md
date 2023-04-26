---
title: Recipes for React Router
---

介绍一些常见的RR技巧

## 认证和鉴权
1. [🚀 Complete guide to authentication with React Router v6 - @LogRocket](https://blog.logrocket.com/complete-guide-authentication-with-react-router-v6/#using-react-rounter-v64-data-library-apis)
   - 包含 `<BrowserRouter>` 版本和 `v6.4+` 之后 Data APIs写法的认证写法👍
2. [2023：React 路由、鉴权以及网页标题 - @掘金](https://juejin.cn/post/7185897452862439485)
   - Data APIs写法
   - 如何使用 `handle` 属性（类似vue-router中的 `meta` 属性） + 然后使用 `useMatches()` 获取路由配置对象，动态改变标题
   - `<AuthRoute>` 的封装，实现认证
   - 自定义懒加载hook😎
3. [时隔一年，react-router 终于重新加回了这个功能-跳转拦截 - 马格纳斯@掘金](https://juejin.cn/post/7193909961305358394)
   - Data Router 如何使用文档中没有写出来的 `unstable_useBlocker` 进行路由拦截跳转的例子
4. [Protected Routes and Authentication with React Router - @uidev](https://ui.dev/react-router-protected-routes-authentication)
   - 虽然没有使用Data Router的APIs，但是整个思路十分的清晰明了，有很多值得学习的点👍



## 性能

1. [🎉 React Router Data APIs 如何进行代码拆分 - @infoxicator](https://www.infoxicator.com/react-router-6-4-code-splitting)
1. [React Router 6 Deferred Fetch - @infoxicator](https://www.infoxicator.com/react-router-6-deferred-fetch) 如何使用 `defer` 对于不重要数据延迟加载，不阻塞页面的跳转。





## 博客

1. [A Complete Guide to React Router: Everything You Need to Know - @uidev](https://ui.dev/react-router-tutorial#pass-props-to-router-components)
   - `v6.4` 版本之前用法全面的总结，可以看看