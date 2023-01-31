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
            link: '/1/FAQs'
          },
          {
            text: '⚡主要概念',
            link: '/1/Main-Concepts'
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
            text: '⚡useLocation',
            link: '/4/useLocation'
          },
          {
            text: '⚡useMatch',
            link: '/4/useMatch'
          },
          {
            text: '⚡useNavigate',
            link: '/4/useNavigate'
          },
          {
            text: 'useNavigationType',
            link: '/4/useNavigationType'
          },
          {
            text: 'useOutlet',
            link: '/4/useOutlet'
          },
          {
            text: '⚡useOutletContext',
            link: '/4/useOutletContext'
          },
          {
            text: 'useParams',
            link: '/4/useParams'
          },
          {
            text: 'useResolvedPath',
            link: '/4/useResolvedPath'
          },
          {
            text: 'useRoutes',
            link: '/4/useRoutes'
          },
          {
            text: 'useSearchParams',
            link: '/4/useSearchParams'
          },
          {
            text: 'useSearchParams(React Native)',
            link: '/4/useSearchParams-React-Native'
          },
        ]
      },
      {
        text: 'V.Utilities',
        collapsible: true,
        items: [
          {
            text: '⚡createRoutesFromChildren',
            link: '/5/createRoutesFromChildren'
          },
          {
            text: 'createSearchParams',
            link: '/5/createSearchParams'
          },
          {
            text: 'generatePath',
            link: '/5/generatePath',
          },
          {
            text: 'Location',
            link: '/5/Location'
          },
          {
            text: 'matchPath',
            link: '/5/matchPath'
          },
          {
            text: '⚡matchRoutes',
            link: '/5/matchRoutes'
          },
          {
            text: 'renderMatches',
            link: '/5/renderMatches'
          },
          {
            text: 'resolvePath',
            link: '/5/resolvePath'
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
