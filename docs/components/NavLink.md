---
title: NavLink
---

::: details 类型声明

```typescript
type function NavLink(
	props: NavLinkProps
): React.ReactElement

interface NavLinkProps
  extends Omit<
    LinkProps,
    'className' | 'style' | 'children'
  > {
    caseSensitive?: boolean;
    children?:
    	| React.ReactNode
    	| ((props: { isActive: boolean }) => React.ReactNode);
    className?:
    	| string
    	| ((props): { isActive: boolean }) => string | undefined);
		end?: boolean;
    style?:
    	| React.CSSProperties
	    | ((props: { isActive: boolean }) => React.CSSProperties);
  }
```

:::

`<NavLink>` 是一种特殊类型的 [Link](./Link)，它知道是否处于 **激活** 状态。这对类似面包屑或一组tabs选中某个这种导航菜单很有用。它还为屏幕阅读器等辅助技术提供了有用的上下文。

📚默认情况下，当组件激活时，会给 `<NavLink>` 添加一个 `active` 类。这为从v5升级的大多数用户提供了相同的简单样式机制。从`v6.0.0-beta3`开始有一个不同是`actieveClassName`和 `activeStyle` 已经从`NavLinkProps`中移除。相反，你可以将函数传递给 `style` 或 `className`，这将允许你根据组件的激活状态自定义内联样式或类字符串。 你也可以传递一个函数作为 `children` 来自定义 `<NavLink>` 组件的内容，基于它们激活状态，这对改变内部元素样式特别有用。



```jsx {36-40}
import * as React from 'react'
import { NavLink } from 'react-router-dom'

function NavList() {
  // 当链接的路由当前被选中时
  // 样式会添加到 <NavLink>
  let activeStyle = {
    textDecoration: 'underline'
  }
  
  let activeClassName = 'underline'
  
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="message"
            style={({ isActive }) => isActive ? activeStyle : undefined }
            >
            Messages
          </NavLink>
        </li>
        <li>
          <NavLink
            to="tasks"
            className={
              ({ isActive }) => isActive ? activeClassName : undefined 
            }
          >
            Tasks
          </NavLink>
        </li>
        <li>
          <NavLink to="tasks">
            {({ isActive }) => (
              <span className={isActive ? activeClassName : undefined}>
                Tasks
              </span>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
```



如果你更喜欢V5 API，你可以创建你自己的 `<NavLink />` 作为包装器组件😎：

```jsx
import * as React from 'react'
import { NavLink as BaseNavLink } from 'react-router-dom'

const NavLink = React.forwardRef(
  ({ activeClassName, activeStyle, ...props }, ref) => {
    return (
      <BaseNavLink
        ref={ref}
        {...props}
        className={({ isActive }) =>
          [
            props.className,
            isActive ? activeClassName : null,
          ]
            .filter(Boolean)
            .join(' ')
        }
        style={({ isActive }) => ({
          ...props.style,
          ...(isActive ? activeStyle : null),
        })}
      />
    )
  }
)
```

如果使用了 `end` 属性，它将确保组件在其后代路径匹配时不会匹配为 **激活**。比如，要渲染一个只在网站根目录激活的链接，而不是任何其他url，你可以使用:

```jsx
<NavLink to="/" end>
  Home
</NavLink>
```



2022年08月02日17:25:19

