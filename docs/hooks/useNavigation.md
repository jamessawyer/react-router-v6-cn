---
title: useNavigation (data APIs)
---

这个钩子会告诉你所有你需要知道的关于页面导航的信息，以便在数据突变时构建待定导航指示器和乐观的UI。比如：

1. 全局加载指示器
2. 当突变发生时，禁用表单
3. 给提交按钮添加繁忙指示器
4. 在服务端创建的同时，乐观的显示一个新的记录
5. 当更新时，乐观的显示记录的新状态



```jsx
import { useNavigation } from 'react-router-dom'

function SomeComponent() {
  const navigation = useNavigation()
  navigation.state;
  navigation.location;
  navigation.formData;
  navigation.formAction;
  navigation.formMethod;
}
```



## navigation.state

- `idle` - 不存在pending中的导航
- `submitting` - 由于使用 `POST | PUT | DELETE | PATCH` 表单提交导致的路由action正在被调用
- `loading` - 下个路由的loaders正在被调用，用于渲染下个页面

正常的导航和GET表单提交过渡经历如下状态：

```bash
idle -> loading -> idle
```

使用 `POST | PUT | DELETE | PATCH` 表单提交经历如下状态：

```bash
idle -> submitting -> loading -> idle
```

这是一个简单的提交按钮，当导航状态发生变化时，它会改变文本:

```jsx
function SubmitButton() {
  const navigation = useNavigation()
  
  const text =
        navigation.state === 'submitting'
  			? '保存中...'
  			: navigation.state === 'loading'
  			? '保存成功！'
  			: 'Go'

  return <button type="submit">{text}</button>
}
```

而 `navigation.state` 提供了激活导航的高级状态，你可以通过将其与其他导航方面结合来推断出更多粒度信息:

```jsx
// 是否是正常加载？
let isNormalLoad = 
    navigation.state === 'loading' && navigation.formData == null

// action之后是否重新加载？
let isReloading = 
    navigation.state === 'loading' &&
    navigation.formData != null &&
    navigation.formAction === navigation.location.pathname

// action之后是否重定向
let isRedirecting =
    navigation.state === 'loading' &&
    navigation.formData != null &&
    navigation.formAction !== navigation.location.pathname
```



## navigation.formData

任何来自 `<Form>` 或 `useSubmit` 的  `POST | PUT | DELETE | PATCH` 导航都将付加上你的表单提交数据。这主要对通过 `submission.formData`的 [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) 对象构建乐观UI有用。

对于 `GET` 表单提交，`formData` 将为空，数据则通过 `navigation.location.search` 进行获取。



## navigation.location

这将告诉你导航到的下一个 [location](../utilities/Location) 是什么。请注意，如果表单被提交到链接指向的URL，这个链接将不会显示为 `pending`，因为我们只在 `loading` 状态下这样做。当状态为 `submitting` 时，表单将包含挂起的UI，一旦操作完成，那么链接将挂起。





createAt: 2023年02月08日13:54:27
