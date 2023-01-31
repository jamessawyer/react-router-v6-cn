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
    outlineTitle: '目录',
    outline: [2, 3],
    editLink: {
      text: '在GitHub编辑此页',
      pattern: 'https://github.com/jamessawyer/react-router-v6-cn/edit/main/docs/:path'
    },
    sidebar: [
      {
        text: 'Getting Started',
        collapsible: true,
        items: [
          {
            text: 'FAQs',
            link: '/getting-started/FAQs'
          },
          {
            text: '⚡主要概念',
            link: '/getting-started/Main-Concepts'
          },
        ]
      },
      {
        text: 'Routers',
        collapsible: true,
        items: [
          { text: 'Picking a Router 🆕', link: '/routers/picking-a-router' },
          { text: 'createBrowserRouter 🆕', link: '/routers/createBrowserRouter' },
          { text: 'createHashRouter 🆕', link: '/routers/createHashRouter' },
          { text: 'RouterProvider 🆕', link: '/routers/RouterProvider' },
        ],
      },
      {
        text: 'Router Components',
        collapsible: true,
        items: [
          {
            text: 'BrowserRouter',
            link: '/router-components/BrowserRouter'
          },
          {
            text: 'HashRouter',
            link: '/router-components/HashRouter'
          },
          {
            text: 'HistoryRouter',
            link: '/router-components/HistoryRouter'
          },
          {
            text: 'MemoryRouter',
            link: '/router-components/MemoryRouter'
          },
          {
            text: 'NativeRouter',
            link: '/router-components/NativeRouter'
          },
          {
            text: 'Router',
            link: '/router-components/Router'
          },
          {
            text: 'StaticRouter',
            link: '/router-components/StaticRouter'
          },
        ]
      },
      {
        text: 'Components',
        collapsible: true,
        items: [
          {
            text: 'Link',
            link: '/components/Link'
          },
          {
            text: 'Link(React Native)',
            link: '/components/Link-React-Native'
          },
          {
            text: 'NavLink',
            link: '/components/NavLink'
          },
          {
            text: 'Navigate',
            link: '/components/Navigate'
          },
          {
            text: 'Outlet',
            link: '/components/Outlet'
          },
          {
            text: 'Route & Routes',
            link: '/components/Route-and-Routes'
          },
        ]
      },
      {
        text: 'Hooks',
        collapsible: true,
        items: [
          {
            text: 'useHref',
            link: '/hooks/useHref'
          },
          {
            text: 'useInRouterContext',
            link: '/hooks/useInRouterContext'
          },
          {
            text: 'useLinkClickHandler',
            link: '/hooks/useLinkClickHandler'
          },
          {
            text: 'useLinkPressHandler',
            link: '/hooks/useLinkPressHandler'
          },
          {
            text: '⚡useLocation',
            link: '/hooks/useLocation'
          },
          {
            text: '⚡useMatch',
            link: '/hooks/useMatch'
          },
          {
            text: '⚡useNavigate',
            link: '/hooks/useNavigate'
          },
          {
            text: 'useNavigationType',
            link: '/hooks/useNavigationType'
          },
          {
            text: 'useOutlet',
            link: '/hooks/useOutlet'
          },
          {
            text: '⚡useOutletContext',
            link: '/hooks/useOutletContext'
          },
          {
            text: 'useParams',
            link: '/hooks/useParams'
          },
          {
            text: 'useResolvedPath',
            link: '/hooks/useResolvedPath'
          },
          {
            text: 'useRoutes',
            link: '/hooks/useRoutes'
          },
          {
            text: 'useSearchParams',
            link: '/hooks/useSearchParams'
          },
          {
            text: 'useSearchParams(React Native)',
            link: '/hooks/useSearchParams-React-Native'
          },
        ]
      },
      {
        text: 'Utilities',
        collapsible: true,
        items: [
          {
            text: '⚡createRoutesFromChildren',
            link: '/utilities/createRoutesFromChildren'
          },
          {
            text: 'createSearchParams',
            link: '/utilities/createSearchParams'
          },
          {
            text: 'generatePath',
            link: '/utilities/generatePath',
          },
          {
            text: 'Location',
            link: '/utilities/Location'
          },
          {
            text: 'matchPath',
            link: '/utilities/matchPath'
          },
          {
            text: '⚡matchRoutes',
            link: '/utilities/matchRoutes'
          },
          {
            text: 'renderMatches',
            link: '/utilities/renderMatches'
          },
          {
            text: 'resolvePath',
            link: '/utilities/resolvePath'
          },
        ]
      },
      {
        text: 'Bonus',
        collapsible: true,
        collapsed: true,
        items: [
          {
            text: 'History APIs',
            link: '/bonus/history-apis'
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
