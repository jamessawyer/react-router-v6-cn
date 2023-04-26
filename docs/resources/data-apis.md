---
title: Data APIs
---
从React Router `v6.4+` 版本，推出了Data APIs，逐步向Remix路由靠齐，和之前的用法有很大的差别，下面介绍相关的一些资源。

## 视频

入门：
1. [React Router v6.4 ( v6.4.1 ) Fetch data with loaders - Weibenfal(https://www.youtube.com/@Weibenfalk)@youtube](https://www.youtube.com/watch?v=6xqh2f-sV6E)
   - 简单的介绍新版本React Router的组织结构，以宝可梦API作为介绍
   - JSX形式和路由对象形式的写法的差异
   - 使用 `loader` + `useLoadData()` 获取路由数据
   - `errorElement` 处理错误
   - 使用TypeScript 😎
2. [👍React Router 6.4 - Getting Started - Academind@youtube](https://www.youtube.com/watch?v=L2kzUg6IzxM)
   - 通过具体的例子介绍新特性
   - 包含 `loader` +  `defer` + `<Await>` 的写法，先跳转到页面，然后再加载数据



## TypeScript

1. [How to write the correct type for useLoaderData() ? (Typescript)](https://github.com/remix-run/react-router/discussions/9792#discussioncomment-4809811)
2. [useRouteError return type](https://github.com/remix-run/react-router/discussions/9628)
3. [useMatches and TypeScript - @github issues](https://github.com/remix-run/react-router/discussions/9534)





## Authentication

认证：

1. [👍Authentication with new createBrowserRouter failed with Context API, but working fine with BrowserRouter - @githb issues](https://github.com/remix-run/react-router/discussions/9927)
2. [How to place AuthProvider - @github issues](https://github.com/remix-run/react-router/discussions/9856#discussioncomment-4638721)
3. [useMatches hook not returning data from my route handle - @github issues](https://github.com/remix-run/react-router/discussions/9710)
4. [Authorization redirects fail using createBrowserRouter loaders - @github issues](https://github.com/remix-run/react-router/discussions/9332)
5. [React-router-auth-plus](https://github.com/linxianxi/react-router-auth-plus) 一个路由权限库，待研究



## 常见问题

1. [Is it possible to render errorElement inside the outlet ? - @github issues](https://github.com/remix-run/react-router/discussions/9553)
2. [Check if you can go back - @github issues](https://github.com/remix-run/react-router/discussions/8782)
3. [Allow NavLink to receive a children function - @github issues](https://github.com/remix-run/react-router/pull/8164)
4. [What's the benefit of upgrading to React Router v6 ](https://github.com/remix-run/react-router/discussions/8599) 关于V6版本的争议



