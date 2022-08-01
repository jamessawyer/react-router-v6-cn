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
        text: 'Ⅰ.开始',
        collapsible: true,
        items: [
          {
            text: '主要概念',
            link: '/1/Main-Concepts'
          },
        ]
      },
      {
        text: 'Ⅱ.基础',
        collapsible: true,
        items: [
          {
            text: '2.设置React TS',
            link: '/basic/Setup-TypeScript-with-React',
          },
          {
            text: '3.解构算法',
            link: '/2/The-destructuring-algorithm'
          },
          {
            text: '4.⚡环境-变量背后的原理',
            link: '/2/Environments-under-the-hood-of-variables',
          },
          {
            text: '5.⚡深入理解全局变量',
            link: '/2/A-detailed-look-at-global-variables',
          },
        ]
      },
      {
        text: 'Ⅲ.数据处理',
        collapsible: true,
        items: [
          {
            text: '7.JS对象和数组的拷贝',
            link: '/3/Copying-objects-and-arrays',
          },
          {
            text: '8.破坏性和非破坏性更新数据',
            link: '/3/Updating-data-destructively-and-non-destructively',
          },
        ]
      },
      {
        text: 'Ⅶ.其它话题：元编程',
        collapsible: true,
        items: [
          {
            text: '20.⚡使用Proxies进行元编程',
            link: '/7/Metaprogramming-with-Proxies'
          }
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
