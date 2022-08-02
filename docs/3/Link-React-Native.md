---
title: Link(React Native)
---

::: warning

这是React Native版本的 \<Link>。Web版本在上一章 [Link](./Link)

:::



::: details 类型声明

```typescript
declare function Link(props: LinkProps): React.ReactElement;

interface LinkProps extends TouchableHighlightProps {
  children?: React.ReactNode;
  onPress?:(event: GestureResponderEvent): void;
  replace?: boolean;
  state?: any; 
  to: To;
}
```

:::



`<Link>` 是一个允许用户tap跳转到其它页面的元素, 类似于web应用中的 `<a>` 元素。在 `react-router-native` 中，`<Link>` 会渲染为 `TouchableHighlight`。如果想覆写默认样式和行为，可参考 [TouchableHighlight](https://reactnative.dev/docs/touchablehighlight#props) 属性文档。

```jsx
import * as React from 'react'
import { View, Text } from 'react-native'
import { Link } from 'react-router-native'

function Home() {
  return (
    <View>
      <Text>Welcome!</Text>
      <Link to="/profile">
        <Text>Visit your profile</Text>
      </Link>
    </View>
  )
}
```



2022年08月02日16:45:56