import{_ as s,c as a,o as n,a as l}from"./app.408d37bd.js";const A=JSON.parse('{"title":"HashRouter","description":"","frontmatter":{"title":"HashRouter"},"headers":[],"relativePath":"2/HashRouter.md","lastUpdated":1659456800000}'),o={name:"2/HashRouter.md"},p=l(`<p>\u7C7B\u578B\u5B9A\u4E49\uFF1A</p><div class="language-typescript"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">declare</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">HashRouter</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">	props</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HashRouterProps</span></span>
<span class="line"><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">React</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">ReactElement</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HashRouterProps</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">basename</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">children</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">React</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">ReactNode</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">window</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Window</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p><code>&lt;HashRouter&gt;</code> \u7528\u4E8E\u6D4F\u89C8\u5668\u4E2D\uFF0C\u5F53URL\u7531\u4E8E\u67D0\u4E9B\u539F\u56E0\u4E0D\u8BE5\uFF08\u6216\u8005\u4E0D\u80FD\uFF09\u53D1\u9001\u7ED9\u670D\u52A1\u5668\u65F6\u4F7F\u7528\u3002\u8FD9\u53EF\u4EE5\u53D1\u751F\u5728\u67D0\u4E9B\u5171\u4EAB\u5BBF\u4E3B\u673A\u7684\u573A\u666F\uFF0C\u4F60\u5BF9\u670D\u52A1\u5668\u6CA1\u6709\u5B8C\u5168\u7684\u63A7\u5236\u6743\u3002\u5728\u8FD9\u79CD\u60C5\u51B5\u4E0B\uFF0C<code>&lt;HashRouter&gt;</code> \u4F7F\u5F97\u5C06\u5F53\u524D\u4F4D\u7F6E\u5B58\u50A8\u5728\u5F53\u524DURL\u7684 <code>hash</code> \u90E8\u5206\u6210\u4E3A\u53EF\u80FD\uFF0C\u56E0\u6B64\u5B83\u6C38\u8FDC\u4E0D\u4F1A\u53D1\u9001\u5230\u670D\u52A1\u5668\u3002</p><p><code>&lt;HashRouter window&gt;</code> \u9ED8\u8BA4\u4F7F\u7528\u5F53\u524D <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/defaultView" target="_blank" rel="noopener noreferrer">document defaultView</a>\uFF0C\u4F46\u5B83\u53EF\u80FD\u88AB\u7528\u4E8E\u8FFD\u8E2A\u5176\u5B83\u67D0\u4E2A <code>&lt;iframe&gt;</code> \u4E2D\u7684window URL\u7684\u53D8\u5316\uFF0C\u6BD4\u5982\uFF1A</p><div class="language-jsx"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">as</span><span style="color:#A6ACCD;"> React </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">react</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">as</span><span style="color:#A6ACCD;"> ReactDOM </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">react-dom</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">HashRouter</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">react-dom-router</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">ReactDOM</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">render</span><span style="color:#A6ACCD;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">HashRouter</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span><span style="color:#676E95;font-style:italic;">/* \u5E94\u7528\u7684\u5176\u4F59\u90E8\u5206\u653E\u5728\u8FD9\u91CC */</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#FFCB6B;">HashRouter</span><span style="color:#89DDFF;">&gt;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  root</span></span>
<span class="line"><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>\u6211\u4EEC\u5F3A\u70C8\u63A8\u8350\u4E0D\u8981\u4F7F\u7528 <code>HashRouter</code> \u9664\u975E\u4E0D\u5F97\u4EE5\u7684\u60C5\u51B5\u4E0B</p></div><p>2022\u5E7408\u670802\u65E515:15:37</p>`,7),e=[p];function t(c,r,D,y,F,C){return n(),a("div",null,e)}var d=s(o,[["render",t]]);export{A as __pageData,d as default};