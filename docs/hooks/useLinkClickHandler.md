---
title: useLinkClickHandler
---

类型定义：
```typescript
declare function useLinkClickHandler<
  E extends Element = HTMLAnchorElement
>(
  to: To,
  options?: {
    target?: React.HTMLAttributeAnchorTarget;
    replace?: boolean;
    state?: any;
    options?: { relative?: RelativeRoutingType };
  }
): (event: React.MouseEvent<E, MouseEvent>) => void
```
`useLinkClickHandler` 在`react-router-dom`中构建自定义`<Link>`时返回用于导航的单击事件处理程序。

```jsx
import { 
  useHref,
  useLinkClickHandler
} from 'react-router-dom'

const StyledLink = styled('a', { color: 'fuchsia' })

const Link = React.forwardRef(
  (
    {
      onClick,
      replace = false,
      state,
      target,
      to,
      ...rest
    },
    ref
  ) => {
    let href = useHref(to)
    let handleClick = useLinkClickHandler(to, {
      replace,
      state,
      target,
    })

    return (
      <StyledLink
        {...rest}
        href={href}
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented) {
            handleClick(event)
          }
        }}
        ref={ref}
        target={target}
      />
    )
  }
)
```

createAt: 2022年08月02日22:02:29

updateAt: 2023年02月03日14:14:27
