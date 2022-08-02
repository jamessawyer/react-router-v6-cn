import{_ as s,c as a,o as n,a as o}from"./app.408d37bd.js";const d=JSON.parse('{"title":"resolvePath","description":"","frontmatter":{"title":"resolvePath"},"headers":[],"relativePath":"5/resolvePath.md","lastUpdated":1659456800000}'),p={name:"5/resolvePath.md"},l=o(`<p>\u7C7B\u578B\u5B9A\u4E49\uFF1A</p><div class="language-typescript"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">declare</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">resolvePath</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">  to</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">To</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  fromPathname</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>
<span class="line"><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Path</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">To</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Partial</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Path</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Path</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">pathname</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">search</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">hash</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u{1F4D2}<code>resolvePath</code> \u5C06\u7ED9\u5B9A\u7684 <code>To</code> \u503C\u89E3\u6790\u4E3A\u5177\u6709\u7EDD\u5BF9\u8DEF\u5F84\u540D\u7684\u5B9E\u9645 <code>Path</code> \u5BF9\u8C61\u3002\u5F53\u4F60\u9700\u8981\u77E5\u9053\u76F8\u5BF9 <code>To</code> \u503C\u7684\u786E\u5207\u8DEF\u5F84\u65F6\u6709\u7528\u3002\u6BD4\u5982\uFF0C<code>&lt;Link&gt;</code> \u7EC4\u4EF6\u4F7F\u7528\u8FD9\u4E2A\u51FD\u6570\u77E5\u9053\u5B83\u5B9E\u9645\u6307\u5411\u7684URL\u3002\u{1F60E}</p><p><a href="./../4/useResolvedPath.html">useResolvedPath</a> \u94A9\u5B50\u5185\u90E8\u4F7F\u7528 <code>resolvePath</code> \u89E3\u6790\u8DEF\u5F84\u540D\u3002\u5982\u679C <code>to</code> \u5305\u542B\u4E00\u4E2A\u8DEF\u5F84\u540D\uFF08<code>pathname</code>\uFF09\uFF0C\u5B83\u4F1A\u6839\u636E\u5F53\u524D\u8DEF\u7531\u8DEF\u5F84\u540D\u88AB\u89E3\u6790\u3002\u5426\u5219\uFF0C\u5B83\u4F1A\u6839\u636E\u5F53\u524DURL(<code>location.pathname</code>) \u88AB\u89E3\u6790\u3002</p><p>2022\u5E7408\u670802\u65E523:41:29</p>`,5),e=[l];function t(c,r,F,y,D,C){return n(),a("div",null,e)}var i=s(p,[["render",t]]);export{d as __pageData,i as default};