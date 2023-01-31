---
title: useLinkPressHandler
---
类型定义：
```typescript
declare function useLinkPressHandler(
  to: To,
  options?: {
    replace?: boolean;
    state?: any;
  }
): (event: GestureResponderEvent) => void;
```
`react-router-native` 对应 `useLinkPressHandler`，它返回按压事件处理程序用用于自定义 `<Link>` 导航。
```jsx
import { TouchableHighlight } from 'react-native'
import { useLinkPressHandler } from 'react-router-native'

function Link({
  onPress,
  replace = false,
  state,
  to,
  ...rest
}) {
  let handlePress = useLinkPressHandler(to, {
    replace,
    state,
  })

  return (
    <TouchableHighlight
      {...rest}
      onPress={(event) => {
        onPress?.(event)
        if (!event.defaultPrevented) {
          handlePress(event)
        }
      }}
    />
  )
}
```

2022年08月02日22:11:35
