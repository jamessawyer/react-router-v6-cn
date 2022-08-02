import{_ as s,c as a,o as n,a as l}from"./app.408d37bd.js";const A=JSON.parse('{"title":"Outlet","description":"","frontmatter":{"title":"Outlet"},"headers":[],"relativePath":"3/Outlet.md","lastUpdated":1659456800000}'),p={name:"3/Outlet.md"},o=l(`<details class="details custom-block"><summary>\u7C7B\u578B\u58F0\u660E</summary><div class="language-typescript"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">OutletProps</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">context</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">unknown</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">declare</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Outlet</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">  props</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">OutletProps</span></span>
<span class="line"><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">React</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">ReactElement</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">null</span></span>
<span class="line"></span></code></pre></div></details><p>\u8BD1\u8005\u6CE8\uFF1A</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>\u53EF\u4EE5\u770B\u51FA Outlet \u53EF\u4EE5\u4F20\u5165 <code>context</code> \u5C5E\u6027</p></div><p>\u{1F4D2} <code>&lt;Outlet&gt;</code> \u5E94\u8BE5\u5728\u7236\u8DEF\u7531\u5143\u7D20\u4E2D\u4F7F\u7528\uFF0C\u4EE5\u6E32\u67D3\u5176\u5B50\u8DEF\u7531\u5143\u7D20\u3002\u8FD9\u5141\u8BB8\u5728\u6E32\u67D3\u5B50\u8DEF\u7531\u65F6\u663E\u793A\u5D4C\u5957UI\u3002\u5982\u679C\u7236\u8DEF\u7531\u5B8C\u5168\u5339\u914D\uFF0C\u5B83\u5C06\u6E32\u67D3\u5B50\u7D22\u5F15\u8DEF\u7531\uFF0C\u5982\u679C\u6CA1\u6709\u9996\u8DEF\u7531\uFF08<code>index route</code>\uFF09\u5219\u4E0D\u6E32\u67D3\u5B50\u9996\u8DEF\u7531\u3002</p><div class="language-jsx"><span class="copy"></span><div class="highlight-lines"><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Dashboard</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> (</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Dashboard</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">{</span><span style="color:#676E95;font-style:italic;">/* \u8FD9\u4E2A\u5143\u7D20\u5728URL\u4E3A \`&quot;/messages&quot;\` \u65F6\uFF0C\u6E32\u67D3 &lt;DashboardMessage&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">      	\u4E3A \`&quot;/tasks&quot;\` \u65F6 &lt;DashboardTasks&gt;, \u5982\u679C\u662F &quot;/&quot; \u4EC0\u4E48\u4E5F\u4E0D\u6E32\u67D3</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">      */</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Outlet</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#F07178;">  )</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">App</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> (</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Routes</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Route</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">path</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">element</span><span style="color:#89DDFF;">={&lt;</span><span style="color:#FFCB6B;">Dashboard</span><span style="color:#89DDFF;"> /&gt;}&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Route</span><span style="color:#89DDFF;"> </span></span>
<span class="line"><span style="color:#89DDFF;">          </span><span style="color:#C792EA;">path</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">message</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">          </span><span style="color:#C792EA;">element</span><span style="color:#89DDFF;">={&lt;</span><span style="color:#FFCB6B;">DashboardMessages</span><span style="color:#89DDFF;"> /&gt;}</span></span>
<span class="line"><span style="color:#89DDFF;">        /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Route</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">path</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">tasks</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">element</span><span style="color:#89DDFF;">={&lt;</span><span style="color:#FFCB6B;">DashboardTasks</span><span style="color:#89DDFF;"> /&gt;} /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#FFCB6B;">Route</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#FFCB6B;">Routes</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#F07178;">  )</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>2022\u5E7408\u670802\u65E518:03:57</p>`,6),t=[o];function e(c,r,F,D,y,i){return n(),a("div",null,t)}var d=s(p,[["render",e]]);export{A as __pageData,d as default};