import{_ as s,c as a,o as n,a as o}from"./app.408d37bd.js";const i=JSON.parse('{"title":"BrowserRouter","description":"","frontmatter":{"title":"BrowserRouter"},"headers":[],"relativePath":"2/BrowserRouter.md","lastUpdated":1659456800000}'),l={name:"2/BrowserRouter.md"},p=o(`<p>\u7C7B\u578B\u5B9A\u4E49\uFF1A</p><div class="language-typescript"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">declare</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">BrowserRouter</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">	props</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">BrowserRouterProps</span></span>
<span class="line"><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">React</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">ReactElement</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">BrowserRouterProps</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">basename</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">children</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">React</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">ReactNode</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">window</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Window</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u5728\u6D4F\u89C8\u5668\u4E2D\u4F7F\u7528React Router \u63A8\u8350\u4F7F\u7528 <code>&lt;BrowserRouter&gt;</code> \u63A5\u53E3\u3002<code>&lt;BroswerRouter&gt;</code> \u4F7F\u7528\u5E72\u51C0\u7684URL\u5C06\u5F53\u524D\u4F4D\u7F6E\uFF08<code>Location</code>\uFF09\u5B58\u50A8\u5728\u6D4F\u89C8\u5668\u7684\u5730\u5740\u680F\u4E2D\uFF0C\u5E76\u4F7F\u7528\u6D4F\u89C8\u5668\u5185\u7F6E\u7684\u5386\u53F2\u6808\uFF08<code>history stack</code>\uFF09\u8FDB\u884C\u5BFC\u822A\u3002</p><p><code>&lt;BrowserRouter window&gt;</code> \u9ED8\u8BA4\u4F7F\u7528\u5F53\u524D <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/defaultView" target="_blank" rel="noopener noreferrer">document defaultView</a>\uFF0C\u4F46\u5B83\u53EF\u80FD\u88AB\u7528\u4E8E\u8FFD\u8E2A\u5176\u5B83\u67D0\u4E2A <code>&lt;iframe&gt;</code> \u4E2D\u7684window URL\u7684\u53D8\u5316\uFF0C\u6BD4\u5982\uFF1A</p><div class="language-jsx"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">as</span><span style="color:#A6ACCD;"> React </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">react</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">as</span><span style="color:#A6ACCD;"> ReactDOM </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">react-dom</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">BrowserRouter</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">react-dom-router</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">ReactDOM</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">render</span><span style="color:#A6ACCD;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">BrowserRouter</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span><span style="color:#676E95;font-style:italic;">/* \u5E94\u7528\u7684\u5176\u4F59\u90E8\u5206\u653E\u5728\u8FD9\u91CC */</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#FFCB6B;">BrowserRouter</span><span style="color:#89DDFF;">&gt;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  root</span></span>
<span class="line"><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><p>2022\u5E7408\u670802\u65E515:06:19</p>`,6),e=[p];function t(r,c,D,y,F,C){return n(),a("div",null,e)}var d=s(l,[["render",t]]);export{i as __pageData,d as default};