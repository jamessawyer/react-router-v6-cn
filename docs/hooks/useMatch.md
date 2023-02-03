---
title: ⚡useMatch
---
类型定义：
```typescript
declare function useMatch<
  ParamKey extends ParamParseKey<Path>,
  Path extends string
>(
  pattern: PathPattern<Path> | Path,
  pathname: string
): PathMatch<ParamKey> | null;
```
::: details 其它类型
// 译者添加
```typescript
type ParamParseKey<Segment extends string> = 
  [PathParam<Segment>] extends [never] ? string : PathParam<Segment>;

interface PathMatch<ParamKey extends string = string> {
  // URL中动态参数的names和values
  params: Params<ParamKey>;
  // 匹配的URL路径名的部分
  pathname: string;
  // 在子路由之前匹配的URL路径名的部分
  pathnameBase: string;
  // 用于匹配的模式
  pattern: PathPattern;
}

interface PathPattern<Path extends string = string> {
  // 匹配URL pathname的字符串
  // 可能包含 `:id`风格的片段，表示动态参数的占位符
  // 也可能以 `/*` 结尾，表示匹配URL pathname 其余部分
  path: Path;
  caseSensitive?: boolean;
  end?: boolean;
}
```
:::

返回给定路径上相对于当前位置(`location`)的路由的匹配数据。

🌰

```js
const match = useMatch('/post/:postId')

// 假设访问 `/post/123`
// match为
const obj ={
  params: {
    postId: '123'
  },
  pathname: '/post/123',
  pathnameBase: 'post/123',
  pattern: {
    path: '/post/:postId',
    caseSensitive: false,
    end: true
  }
}
```





查看 [matchPath](../utilities/matchPath) 了解更多。


createAt: 2022年08月02日22:32:54

updateAt: 2023年02月03日13:50:16
