---
title: useNavigationType
---

类型定义：
```typescript
declare function useNavigationType(): NavigationType;

type NavigationType = 'POP' | 'PUSH' | 'REPLACE';
```

这个钩子用于返回当前导航的类型或用户如何来到当前页面的；通过历史栈中 `pop | push | replace` 3个动作中的某一个。

2022年08月02日22:57:56
