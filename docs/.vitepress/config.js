const sidebar_routers = {
  text: 'Routers',
  collapsible: true,
  items: [
    { text: 'Picking a Router 🆕', link: '/routers/picking-a-router' },
    { text: '⚡createBrowserRouter 🆕', link: '/routers/createBrowserRouter' },
    { text: 'createHashRouter 🆕', link: '/routers/createHashRouter' },
    { text: 'createMemoryRouter 🆕', link: '/routers/createMemoryRouter' },
    { text: 'RouterProvider 🆕', link: '/routers/RouterProvider' },
  ],
}

const sidebar_router_components = {
  text: 'Router Components',
  collapsible: true,
  items: [
    { text: 'BrowserRouter', link: '/router-components/BrowserRouter' },
    { text: 'HashRouter', link: '/router-components/HashRouter' },
    { text: 'MemoryRouter', link: '/router-components/MemoryRouter' },
    { text: 'NativeRouter', link: '/router-components/NativeRouter' },
    { text: 'Router', link: '/router-components/Router' },
    { text: 'StaticRouter', link: '/router-components/StaticRouter' },
  ]
}

const sidebar_route = {
  text: 'Route',
  collapsible: true,
  items: [
    { text: '⚡Route 🆕', link: '/route/route' },
    { text: 'action 🆕', link: '/route/action' },
    { text: 'errorElement 🆕', link: '/route/errorElement' },
    { text: 'loader 🆕', link: '/route/loader' },
    { text: 'shouldRevalidate 🆕', link: '/route/shouldRevalidate' },
  ]
}

const sidebar_components = {
  text: 'Components',
  collapsible: true,
  items: [
    { text: 'Await 🆕', link: '/components/Await' },
    { text: 'Form 🆕', link: '/components/Form' },
    { text: 'Link', link: '/components/Link' },
    { text: 'Link(React Native)', link: '/components/Link-React-Native' },
    { text: 'NavLink', link: '/components/NavLink' },
    { text: 'Navigate', link: '/components/Navigate' },
    { text: 'Outlet', link: '/components/Outlet' },
    { text: 'Route & Routes', link: '/components/Route-and-Routes' },
  ]
}

const sidebar_hooks = {
  text: 'Hooks',
  collapsible: true,
  items: [
    { text: 'useActionData 🆕', link: '/hooks/useActionData' },
    { text: 'useAsyncError 🆕', link: '/hooks/useAsyncError' },
    { text: 'useAsyncValue 🆕', link: '/hooks/useAsyncValue' },
    { text: 'useFetcher 🆕', link: '/hooks/useFetcher' },
    { text: 'useHref', link: '/hooks/useHref' },
    { text: 'useInRouterContext', link: '/hooks/useInRouterContext' },
    { text: 'useLinkClickHandler', link: '/hooks/useLinkClickHandler' },
    { text: 'useLinkPressHandler', link: '/hooks/useLinkPressHandler' },
    { text: 'useLoaderData 🆕', link: '/hooks/useLoaderData' },
    { text: '⚡useLocation', link: '/hooks/useLocation' },
    { text: 'useMatch', link: '/hooks/useMatch' },
    { text: '⚡useMatches 🆕', link: '/hooks/useMatches' },
    { text: '⚡useNavigate', link: '/hooks/useNavigate' },
    { text: 'useNavigation 🆕', link: '/hooks/useNavigation' },
    { text: 'useNavigationType', link: '/hooks/useNavigationType' },
    { text: 'useOutlet', link: '/hooks/useOutlet' },
    { text: '⚡useOutletContext', link: '/hooks/useOutletContext' },
    { text: 'useParams', link: '/hooks/useParams' },
    { text: 'useResolvedPath', link: '/hooks/useResolvedPath' },
    { text: 'useRouteError 🆕', link: '/hooks/useRouteError' },
    { text: 'useRouteLoaderData 🆕', link: '/hooks/useRouteLoaderData' },
    { text: 'useRoutes', link: '/hooks/useRoutes' },
    { text: 'useSearchParams', link: '/hooks/useSearchParams' },
    { text: 'useSearchParams(React Native)', link: '/hooks/useSearchParams-React-Native' },
    { text: 'useSubmit 🆕', link: '/hooks/useSubmit' },
  ]
}

const sidebar_fetch = {
  text: 'Fetch Utilities',
  collapsible: true,
  items: [
    { text: 'json 🆕', link: '/fetch/json' },
    { text: 'redirect 🆕', link: '/fetch/redirect' },
  ]
}

const sidebar_utils = {
  text: 'Utilities',
  collapsible: true,
  items: [
    { text: '⚡createRoutesFromElements', link: '/utilities/createRoutesFromElements' },
    { text: 'createRoutesFromChildren', link: '/utilities/createRoutesFromChildren' },
    { text: 'createSearchParams', link: '/utilities/createSearchParams' },
    { text: 'defer 🆕', link: '/utilities/defer'},
    { text: 'generatePath', link: '/utilities/generatePath' },
    { text: 'isRouteErrorResponse 🆕', link: '/utilities/isRouteErrorResponse' },
    { text: 'Location', link: '/utilities/Location' },
    { text: 'matchPath', link: '/utilities/matchPath' },
    { text: '⚡matchRoutes', link: '/utilities/matchRoutes' },
    { text: 'renderMatches', link: '/utilities/renderMatches' },
    { text: 'resolvePath', link: '/utilities/resolvePath' },
  ]
}

const sidebar_guides = {
  text: 'Guides',
  collapsible: true,
  items: [
    { text: 'Deferred Data 🆕', link: '/guides/deferred-data' },
  ]
}

const sidebar = [
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
  sidebar_routers,
  sidebar_router_components,
  sidebar_route,
  sidebar_components,
  sidebar_hooks,
  sidebar_fetch,
  sidebar_utils,
  sidebar_guides,
  {
    text: 'Bonus',
    collapsible: true,
    collapsed: true,
    items: [
      { text: 'History APIs', link: '/bonus/history-apis' },
      { text: '🎉Recipes', link: '/bonus/recipes' },
    ]
  },
  {
    text: 'Resources',
    collapsible: true,
    collapsed: true,
    items: [
      { text: 'React Router v6.4+', link: '/resources/data-apis' },
    ]
  },
  {
    text: '深入理解路由',
    collapsible: true,
    collapsed: true,
    items: [
      { text: 'history.js', link: '/in-depth/history' },
    ]
  },
]

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
    sidebar,
  },
  markdown: {
    // lineNumbers: true, // 是否显示行号
    // options for markdown-it-toc-done-right
    toc: { level: [1, 2, 3] },
  }
}
