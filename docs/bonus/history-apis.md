---
title: History库
---

这是 [history](https://github.com/remix-run/history) 库的API参考。

History库使用包含了URLs和state的 `location` 对象，提供了用于追踪应用history的API。这个手册包含了库中接口的类型签名和返回值。如果你想知道如何使用这个库，完成特定的任务，请阅读 [开始指南部分](https://github.com/remix-run/history/blob/main/docs/getting-started.md)。

## 环境（Environments）
history库支持3种不同的环境，或操作模式：
 - `Browser history` 用于web应用
 - `Hash history` 用于web应用，但由于某些原因你不想或不能发送URL给服务器的场景
 - `Memory history` 用于原生应用（React Native）或测试

对你目标环境选择合适的模式即可。

## 监听（Listening）
为了读取当前location和action，分别使用 `history.location` 和 `history.action`。**这两个属性都是可变和随着location变化而自动变化的**。

## 导航（Navigation）
为了改变当前location，你可以使用下面某一个操作：
- `history.push` : 推送一个新的location到history栈中
- `history.replace` : 使用另一个location替换当前location
- `history.go` : 通过给定偏移量（`delta`）改变history栈当前索引
- `history.back` : 在history栈中向后导航一个条目
- `history.forward` : 在history栈中向前导航一个条目

## 确认导航（Confirming Navigation）
为了阻止当前location发生变化，使用 `history.block`。这个API允许你阻止location发生变化，因此你可以在页面跳转前向用户提出请求。

## 创建`href`值（Creating href values）
如果你构建一个链接，你将使用 `history.createHref` 获取一个URL，它可以用作是 `<a href>` 的值。

# Reference
[history](https://github.com/remix-run/history/tree/main/packages/history) 的源码是通过TypeSript写的，但在发布前编译成JS了。参考手册中某些函数签名会包含它们的TS注解，但是你也可以参考源代码。

## 动作（Action）
一个 `Action` 表示history栈中一种改变类型。`Action` 是一个枚举值，包含3个枚举成员：
1. `Action.Pop`: 在栈中对任意索引的变化，比如后退或前进导航。**它没有描述导航的方向，只表示索引发生了变化🚨。** 这是新创建的history对象的默认动作。
2. `Action.Push`: 表示一个新的条目添加到history栈中了，比如当你点击一个链接，一个新页面加载时。当这发生时，栈中所有后续的条目都会丢失。
3. `Action.Replace`: 表示在history中一个新的条目替换了当前条目

## History接口
`History` 对象表示对 `BrowserHistory` & `HashHistory` & `MemoryHistory` 共享的接口。
类型声明：
```typescript
interface History {
  readonly action: Action;
  readonly location: Location;
  createHref(to: To): string;
  push(to: To, state?: any): void;
  replace(to: To, state?: any): void;
  go(delta: number): void;
  back(): void;
  forward(): void;
  listen(listener: Listener): () => void;
  block(blocker: Blocker): () => void;
}
```

## createBrowserHistory
类型声明：
```typescript
function createBrowserHistory(
  options?: { window?: Winddow }
): BrowserHistory

interface BrowserHistory extends History {}
```
📚浏览器history对象使用浏览器内置的history栈追踪应用的浏览历史。它被设计用于运行在支持HTML5 history接口的现代web浏览器，包括 `pushState`, `replaceState`和`popstate`事件。

`createBrowserHistory` 返回一个 `BrowserHistory` 实例。`window` 默认是 [当前document的defaultView](https://developer.mozilla.org/en-US/docs/Web/API/Document/defaultView)。
```js
import { createBrowserHistory } from 'history'

let history = createBrowserHistory()
```

## createPath 和 parsePath
类型声明：
```typescript
function createPath(partialPath: Partial<Path>): string;
function parsePath(path: string): Partial<Path>;

interface Path {
  pathname: string;
  search: string;
  hash: string;
}
```
`createPath` 和 `parsePath` 分别用于创建和解析一个URL的路径。

```js {5,8}
createPath({
  pathname: '/login',
  search: '?next=home'
})
// '/login?next=home'

parsePath('/login?next=home')
// {pathname: '/login', search: '?next=home'}
```

## createHashHistory
类型声明：
```typescript
createHashHistory({ window?: Window }): HashHistory;

interface HashHistory extends History {}
```
hash history 对象使用浏览器内置的history栈追踪应用浏览历史。它被设计用于运行在支持HTML5 history接口的现代web浏览器，包括 `pushState`, `replaceState`和`popstate`事件。

`createHashHistory` 返回一个 `HashHistory` 实例。`window` 默认是 [当前document的defaultView](https://developer.mozilla.org/en-US/docs/Web/API/Document/defaultView)。

它和 `BrowserHistory` 主要差别是：hash history将当前location存储在 [URL的hash部分中](https://developer.mozilla.org/en-US/docs/Web/API/Location/hash#:~:text=The%20hash%20property%20of%20the,an%20empty%20string%2C%20%22%22%20.)，这意味着它永远不会发送到服务器。如果你将站点托管在一个不能完全控制服务器路由的域上，这将非常有用，或者，在Electron应用中，你不想对同一页面中不同的URLs配置不同的服务器。
```js
import { createHashHistory } from 'history'
let history = createHashHistory()
```

## createMemoryHistory
类型声明：
```typescript
function createMemoryHistory({
  initialEntries?: InitialEntry[],
  initialIndex?: number
}): MemoryHistory;

type InitialEntry = string | Partial<Location>;

interface MemoryHistory extends History {
  readonly index: number;
}
```
📒内存history对象使用内部数组追踪应用浏览历史。这很适用于你要完全控制history栈的场景，比如React Native和测试。
`createMemoryHistory` 返回 `MemoryHistory` 实例。你可以通过 `initialEntries` 属性给history实例提供初始条目，默认是 `['/']` （一个单一的在根 `/` URL处的location）。`initialIndex` 默认是 `initialEntries` 中最后一项。
```js
import { createMemoryHistory } from 'history'
let history = createMemoryHistory()

// 或者，预先为history实例添加一些urls
let history = createMemoryHistory({
  initialEntries: ['/home', '/proffile', '/about']
})
```

## history.action
表示当前（最近）修改了history栈的 `Action`。这个属性是可变的，并且自动随着当前location变化而更新。
也可以查看上面的 `history.listen`。

## history.back()
📚返回上一个历史记录。它是 `history.go(-1)` 的别名。

可查看[Navigation指南](https://github.com/remix-run/history/blob/main/docs/navigation.md)了解更多。

## history.block(blocker: Blocker)
类型声明：
```typescript
interface Blocker {
  (tx: Transition): void;
}

interface Transition {
  action: Action;
  location: Location;
  retry(): void;
}
```
阻止history栈发生改变。当你想阻止用户离开当前页面时很有用😎，比如，当用户在当前页面有些未保存的数据时。
```js
// 开始阻止location发生变化
let unblock = history.block(({ action, location, retry })) => {
  // 跳转被阻止！
}

// 之后，可以调用上面返回的函数，再次允许页面跳转
unblock()
```

## history.createHref(to: To)
返回一个可用作 `<a href>` 的字符串值，用于导航到目的地址。

## history.forward()
📚向前跳转。它是 `history.go(1)` 的别名。

## history.go(delta: number)
向前或向后导航 `delta` 条目。

## history.index
history栈当前索引。
::: warning
这个属性只存在于 `MemoryHistory` 实例上
:::

## history.listen(listener: Listener)
类型声明：
```typescript
interface Listener {
  (update: Update) => void;
}

interface Update {
  action: Action;
  location: Location;
}
```
开始监听 `location` 的变化。当变化发生时，使用给定的 `Update` 类型回调。
```js
// 开始监听location的变化
let unlisten = history.listen(({ action, location }) => {
  // 当前location发生了变化
})

// 当不想再监听，可取消监听
unlisten()
```
::: tip
译者注：这是一个很典型的发布订阅模式（或观察者模式）
:::

## history.location
当前 `location`。这个属性是可变的，并且随着当前loation发生变化而自动更新。

## history.push(to: To, state?: any)
向history栈中添加一条新的条目（`entry` 。译者注：每条entry都是一个 `location` 对象。）

## history.replace(to: To, state?: any)
使用新的entry取代当前entry。

## ⭐ Location
类型声明：
```typescript
interface Location {
  pathname: string;
  search: string;
  hash: string;
  state: unknown;
  key: string;
}
```
👩🏻‍🏫 `location` 是history栈中特殊的entry，通常相当于你应用中的 `page` 或者 `screen`。当用户点击链接机型跳转时，当前location随之发生变化。

### location.pathname
`location.pathname` 属性是一个以 `/` 开头，直到 `?` 结束的的URL部分字符串。

另可查看 [URL.pathname](https://developer.mozilla.org/en-US/docs/Web/API/URL/pathname)

### location.search
`location.search` 属性是一个以 `?` 开头，后面跟着 `key=value` 对的查询字符串。如果不存在参数，则值可能是空字符串（即 `''`）。

另可查看 [URL.search](https://developer.mozilla.org/en-US/docs/Web/API/URL/search)

### location.hash
`location.hash` 属性是一个以 `#` 开头，后面跟着URL片段标识符的字符串，值可能是空字符串（即 `''`）。

另可查看 [URL.hash](https://developer.mozilla.org/en-US/docs/Web/API/URL/hash)

### location.state

`location.state` 属性是用户提供的 `State` 对象，它和当前location相关。**这里可以用来存储任何你不想显示在URL的信息，比如 `session` 相关的数据🚀**。
::: tip
💡在web浏览器中，state使用浏览器内置的 `pushState`，`replaceState` & `popstate` APIs管理
:::

### location.key
`location.key` 属性是和当前location相关联的 **`唯一性的`** 字符串。在最初始的location，它是字符串值为 `default`。后续的locations，字符串为唯一标识符。😎

🌰这对相同URL但是你需要追踪不同状态的情形下很有用。比如，你可以用它当做某些网络或者设备存在API的key。

## State
`State` 是一个任意值，用来持有和当前`Location`相关的额外信息，但是又不出现在URL上。**这个值总是和该location相关联。**

## To
类型定义：
```typescript
type To = string | Partial<Path>

interface Path {
  pathname: string;
  search: string;
  hash: string;
}
```
`To` 值表示目的地location,但是不同于一个 `location`对象那样，它不包含所有信息。它主要用作 `history.push()` & `history.replace()` 的第一个参数。


2022年08月04日21:33:54
