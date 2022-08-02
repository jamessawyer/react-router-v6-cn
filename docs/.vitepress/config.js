export default {
  title: 'React Router V6',
  description: 'React Router V6中文版',
  lastUpdated: true,
  base: '/react-router-v6-cn/', // 非常重要这个属性！！！
  
  head:[
    ['link', { rel: 'icon', href: '/react-router-v6-cn/favicon.ico' }]
  ],
  
  themeConfig: {
    logo: '/react.svg',
    editLink: {
      text: '在GitHub编辑此页',
      pattern: 'https://github.com/jamessawyer/react-router-v6-cn/edit/main/docs/:path'
    },
    sidebar: [
      {
        text: 'Ⅰ.Getting Started',
        collapsible: true,
        items: [
          {
            text: '⚡主要概念',
            link: '/1/Main-Concepts'
          },
        ]
      },
      {
        text: 'Ⅱ.Routers',
        collapsible: true,
        items: [
          {
            text: 'BrowserRouter',
            link: '/2/BrowserRouter'
          },
          {
            text: 'HashRouter',
            link: '/2/HashRouter'
          },
          {
            text: 'HistoryRouter',
            link: '/2/HistoryRouter'
          },
          {
            text: 'MemoryRouter',
            link: '/2/MemoryRouter'
          },
          {
            text: 'NativeRouter',
            link: '/2/NativeRouter'
          },
          {
            text: 'Router',
            link: '/2/Router'
          },
          {
            text: 'StaticRouter',
            link: '/2/StaticRouter'
          },
        ]
      },
      {
        text: 'Ⅲ.Components',
        collapsible: true,
        items: [
          {
            text: 'Link',
            link: '/3/Link'
          },
          {
            text: 'Link(React Native)',
            link: '/3/Link-React-Native'
          },
          {
            text: 'NavLink',
            link: '/3/NavLink'
          },
          {
            text: 'Navigate',
            link: '/3/Navigate'
          },
          {
            text: 'Outlet',
            link: '/3/Outlet'
          },
          {
            text: 'Route & Routes',
            link: '/3/Route-and-Routes'
          },
        ]
      },
      {
        text: 'Ⅶ.Hooks',
        collapsible: true,
        items: [
          {
            text: 'useHref',
            link: '/4/useHref'
          },
          {
            text: 'useInRouterContext',
            link: '/4/useInRouterContext'
          },
          {
            text: 'useLinkClickHandler',
            link: '/4/useLinkClickHandler'
          },
          {
            text: 'useLinkPressHandler',
            link: '/4/useLinkPressHandler'
          },
          {
            text: 'useRoutes',
            link: '/4/useRoutes'
          },
        ]
      }
    ]
  },
  markdown: {
    // lineNumbers: true, // 是否显示行号
    // options for markdown-it-toc-done-right
    toc: { level: [1, 2, 3] },
  }
}
