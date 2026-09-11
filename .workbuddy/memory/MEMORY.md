# MEMORY.md - 悦刻产品图册

## 视觉系统
- 主色：#0D7377（青蓝）
- 强调色：#C9A96E（金色）
- 热销红：#C0392B
- 果味/凉感绿：#27AE60
- 背景：#fff / #f0efeb
- 字体：'Noto Sans SC', 'Microsoft YaHei', sans-serif

## 底部三栏导航
- 口味词典（左）：青绿底/青绿字
- 帮我选（中）：金色底/白字
- 选品清单（右）：白底/青绿边框/青绿字

## 业务规则
- 店内热销TOP3：红运滚滚(Pro ¥129) / 忘江有径(青羽 ¥99) / 绿扇盈盈(幻影 ¥119)
- 宙斯免费送转接口
- 御影S 功能对标幻影Pro，仅售 ¥368
- 门店电话：18939741711
- 生花好事：悦刻飞光一次性，12ml/4000口，**¥149**（记忆里的 ¥129 是错的，代码为准），风味定位「焦糖坚果豆香 · 强击喉 奶油蜂蜜香」，标签「解瘾强/焦糖坚果/12ml大容量」（2026-09-11 已移除「新品上市」）
- 溪上烟（niche，2026-08-09 上架）：迷睿品牌 2.5ml × 3颗装通配烟弹，¥119，风味「甜瓜青苹果混合 · 入口饱满水润 果香自然 收尾干净清爽」，推荐★★★★★，标签「新品上市/甜瓜青苹果/清甜果香/2.5ml大容量/通配烟弹」。产品图 `extracted_images/pod_images/xishang.png`
- 2026-09-11 上架 4 款（v1.51）：
  - **冰月海**（悦刻幻影 / 海军蓝镜面阳极）¥328 → 加到「幻影五代 · 经典选择」的 `colors` 首位，`device_colors/h5_bingyuehai.png`
  - **秘境寻幽**（可逸 COEE BOOM，一次性 other）¥129，10ml，蜜柚果香，id 115
  - **弦歌未央**（可逸 COEE BOOM，一次性 other）¥129，10ml，咖啡巧克力，id 116
  - **匠造者-21**（美深威，一次性 other）¥149，13ml，鲜萃绿茶，id 117。**产品图源仅 131×136 偏糊，待补高清**
  - 以上三款价格 2026-09-11 已经用户确认（129/129/149）
  - 一次性 other 分区标题 →「Voopoo · 美深威 · 可逸 · HQD」

## 开发规约
- **🔴 数据双源架构（极重要）**：运行时产品数据来自 JSON 配置文件而非 index.html 硬编码！加载流程：硬编码(fallback) → localStorage → `fetchRemoteJSON('pod-config.json')` 覆盖。**只改硬编码不生效，改动会被旧 JSON 覆盖。** 正确流程：**先改 index.html 硬编码 → 再用 Node `vm` 提取对象字面量重新生成 `pod-config.json`/`disposable-config.json`/`device-config.json`**（`JSON.stringify(v,null,2)+'\n'`，2 空格缩进、无 `\uXXXX` 转义），并 bump `DATA_VERSION` 使 localStorage 缓存失效。**不要手工并行编辑两边** —— 2026-09-11 重新生成时发现 `群玉山见` 在 pod-config.json 里缺 `爆款` 标签 + `flags` 为空，与 index.html 不一致（线上一直没显示爆款角标）。生成脚本：`~/.workbuddy/skills/relx-product-add/references/gen-configs.js`
- **🔴 角标与排序机制（含一次返工教训）**：角标**只由 tag 产生** —— `新品上市` → 金框+`✨新品`；`爆款` → 红框+`🔥爆品`。`flags:["best"/"star"/"tip"]` **没有任何 CSS 样式**（`.product-card.best` 不存在，`.product-card.hot` 的"热销"角标也从未被 JS 应用），是历史残留，**排序时也不要读它**。`renderPodGrid` rank：`新品上市`=0 → `爆款`=1 → 其余=2（sort 稳定，同级保持原数组顺序）；门控 `hasFeatured` = 该分区存在 新品上市 或 爆款。**⛔ 教训（2026-09-11）**：曾把 `flags:["best"]` 也当"热门"参与排序，导致 `other` 分区出现「3 新品 → **山雾秋**（无角标）→ 匠造者-01🔥 → 匠造者-02🔥」，用户立刻质疑"为什么新品和爆品之间有一个山雾秋"。**排序判定必须与用户能看到的角标一致（只看 tag）。** 上新品标准动作：①新品打 `新品上市` ②**移除上一批一次性产品的 `新品上市`**（保留 `爆款`）③只有 flags 没 `爆款` 标签的产品不显示角标也不提前，若用户认为它热门 → 问是否补标签，不要擅自加。
  - **烟具色板例外**：设备卡没有 `tags` 字段（`renderDeviceSection` 从 `DEVICES[].colors[]` 渲染，只有 `img`/`label`）。给某个配色打新品 → 在该 color 对象上加 **`isNew:true`**，渲染时会附加 `new-arrival` 类（金框 + `✨ 新品` 角标），并把该色板放数组**首位**。现有：`冰月海`（幻影五代 ¥328，2026-09-11）。
- **🔴 产品图：原图直用，禁止自作主张（2026-09-11 用户明确要求）**：本项目所有产品图**就是整张宣传海报**（含顶部色条、产品名标题、「本品不含烟弹」标注）。已核实 `device_colors/h5_green.png`（寒山夜）/`h5_black.png`（皎月银）/`pro_silver.png`、一次性 `image4.jpeg`（山雾秋）/`image12,13.jpeg`（匠造者-01/02）**全是完整海报**，没有"干净白底切口图"。**用户给哪张就用哪张**：原样拷贝（必要时等比缩放到既有尺寸），**不要去底/抠图/裁标题/裁色块/贴白底方画布** —— 曾把冰月海做成去底单机身、把可逸海报裁掉标题，被用户指出"不是我给你的那张""我不需要去底，你不需要自作主张"。改完用 `cmp 源文件 目标文件` 验证字节一致。命名用 ASCII 小写、保留原扩展名，改路径后必须重新生成 JSON。
- **`getPuffs()` 新 ID 必须补**，否则落到默认 `return 300`（一次性会显示"≈300口"）。标定：2ml 烟弹 300；大千 10ml 1500；一次性 9.6ml→1440、10ml→1500、10.5ml→1575、12ml→4000、13ml→1800。
- **产品名以实物包装为准**，不要照抄用户文字（2026-09-11 用户写"密境寻幽"，包装/海报/经销商页均印"**秘境**寻幽"）。价格不能编：可查 laovape.com（老蒸汽）商品页标价，查不到就列入"待确认"。
- **分区标题改品牌名要改两处**：`index.html` 中文原文 + `i18n.js` 里 en/fr/ru 的 key（中文不走 i18n，`switchLang('zh')` 只 reload）。
- **🔴 产品图：原图直用，禁止自作主张（2026-09-11 用户明确要求，强约束）**：本项目所有产品图**就是整张宣传海报**（含顶部色条、产品名标题、「本品不含烟弹」标注）。已核实 `device_colors/h5_green.png`（寒山夜）/`h5_black.png`（皎月银）/`pro_silver.png`、一次性 `image4.jpeg`（山雾秋）/`image12,13.jpeg`（匠造者-01/02）**全是完整海报**，没有任何"干净白底切口图"。**用户给哪张就用哪张**：原样拷贝（必要时等比缩放到既有尺寸），**禁止去底/抠图/裁标题/裁色块/贴白底方画布/插值放大低清图**。踩过的坑：把冰月海做成去底单机身、把可逸海报裁掉标题 → 用户指出"不是我给你的那张""我不需要去底，你不需要自作主张"。改完用 `cmp 源文件 目标文件` 验证字节一致；命名 ASCII 小写、保留原扩展名；改路径后必须重新生成 JSON。
- **浏览器验证本机不可用**：Bash 沙箱调 Chrome 报 `Permission denied`；`ms-playwright` 只有 chromium-1228 而全局 playwright 1.48 要 chromium-1140。**不要为此装浏览器** → 改为静态校验（`references/verify.js`：解析+与 JSON 一致+字段+排序模拟+版本号）+ 肉眼核对生成的图片 + 让用户自己本地确认。
- **🔴 localAssetUrl 子目录路径解析（极重要）**：`localAssetUrl()` 在 localhost/127.0.0.1/file:// 环境下必须从 jsdelivr URL 提取 `/gh/{owner}/{repo}/` **或** `@main/` 之后的**完整子目录**（不只是文件名），否则 `extracted_images/pod_images/xishang.png` 会被错误转为 `./xishang.png`（根目录），新图本地预览全部空白。正确正则：先匹配 `@main\/(.+?)(?:\?v=\d+)?$`，再匹配 `\/gh\/[^\/]+\/[^\/]+\/(.+?)(?:\?v=\d+)?$`，再兜底取文件名。
- **🛡️ 硬编码终极兜底（v1.49 引入）**：POD_SECTIONS 定义后立即 `var _POD_SECTIONS_FALLBACK = JSON.parse(JSON.stringify(POD_SECTIONS));` 存一份深拷贝；fetchRemoteJSON 的 `.catch()` 里**强制重置** POD_SECTIONS 回兜底副本并 renderAll+renderHero。这样即使 localStorage 有脏缓存 + CDN 拉不到，最终也能保证显示硬编码数据。
- **本地预览用 localhost 而非 file://**：`file:///` 会被浏览器 CORS 拦截 config fetch。用 `python -m http.server` 起服务后通过 localhost 打开最可靠。产品图走 CDN（需联网），未 push 的新图需 base64 内嵌。
- **🚫 严禁未经授权推送线上版本**：所有修改只能做在本地 index.html，只有在用户明确说「推到 GitHub」「推送」「更新线上」等授权指令时，才能执行 `git push`。线上版本面向客户，未经授权的推送导致页面挂掉是致命问题。
- 每次有重大功能变更推送前，必须同步更新版本号。
- 顶部 topbar 和底部 compliance-warning 两处版本号须同时修改。
- 版本格式：`v主版本.小版本`，重大功能增加小版本号。
- 当前版本：v1.51（2026-09-11 上架 冰月海 / 秘境寻幽 / 弦歌未央 / 匠造者-21 + 排序纳入 flags 热门 + 修复 pod-config.json drift）

## 产品图册截图生成（每次新增产品后必须更新；2026-08-09 重写，2026-09-11 补充环境坑）
> 完整可跑脚本与逐步流程见 skill：`~/.workbuddy/skills/relx-catalog-screenshot/`（含 `shot.js` / `crop.py`）

- **背景**：部分安卓手机因厂商安全拦截打不开 `github.io` 域名，需生成静态图册图片通过微信发给客户。
- **输出格式**：**PNG（用户 2026-09-11 指定，无损）**，覆盖同名旧文件。旧版曾输出 JPG q92。
- **分类**：固定4张图，严格按 section 标题切割：
  - 图1「幻影Pro+幻影+青羽」：页面顶部 →「大千系列」标题上方
  - 图2「大千+宙斯+小众精选」：「大千系列」标题 →「一次性」标题上方
  - 图3「一次性电子烟」：「一次性」标题 →「烟具」标题上方
  - 图4「烟具设备」：「烟具」标题 → 页面底部
- **参数**：viewport `768x1200`，`deviceScaleFactor: 2` → 输出宽 **1536px**。⚠️ **不要再加 `--force-device-scale-factor=2`**，与 dsf 叠乘成 4 倍会把渲染器搞崩（`Target page, context or browser has been closed`）。

### 🔴 环境三大坑（2026-09-11 实测，之前没记录）
1. **浏览器被沙箱拦住**：Bash 沙箱里 `chromium.launch()` 直接 SIGTERM / `Permission denied`。必须用 `dangerouslyDisableSandbox: true` 跑（会向用户请求授权）。
2. **Playwright 版本与浏览器不匹配**：全局 playwright 1.48 要 chromium-1140，机器上只有 **chromium-1228**。→ 用 `executablePath: 'C:\\Users\\Administrator\\AppData\\Local\\ms-playwright\\chromium-1228\\chrome-win64\\chrome.exe'`，加 `args:['--no-sandbox','--disable-gpu','--disable-dev-shm-usage']`。实测可用（8 秒跑完）。
3. **别用 localhost，用 `file://`**：浏览器会走系统代理、**绕过 127.0.0.1**，导致本地图片全 404（CDN 图却正常，极易误判）。改用 `pathToFileURL(index.html)` 直读磁盘：
   - 数据来自硬编码兜底（`fetch` 被 CORS 拦，但 v1.51 起有 `_POD_SECTIONS_FALLBACK` 强兜底）→ **必须确认硬编码是最新**（改完产品先改硬编码再重生成 JSON，天然满足）
   - 图片：老图走 CDN（联网），新图走 `localAssetUrl()` onerror 兜底到相对路径 → `file://` 下直接读磁盘 ✓

### 截图前页面处理（顺序很重要）
1. **先把所有 `<img>` 改 `loading='eager'`**：页面图片是 `loading="lazy"`，不进视口**根本不发请求**，兜底改地址也没用（曾误判为"本地服务坏了"）。
2. 展平滚动容器：`main{max-width:none}` + `.app-shell{height:auto;display:block}` + `.app-scroll{overflow:visible;height:auto}` + `body{height:auto;overflow:visible}` + `html{overflow-x:hidden}`。页面本用 `html/body{height:100%;overflow:hidden}` + `.app-shell/.app-scroll` 内部滚动，不展平则 `body.scrollHeight` 只有视口高。
3. 解除所有 `overflow:hidden/clip` → `visible`（实测命中 308 处）。
4. **解除所有 `position:fixed/sticky`**（含 `.topbar`）→ `static` + `top/left/right/bottom:auto`（实测 18 处），否则顶栏粘在各分区顶部。
5. 隐藏 `.marquee-content`（含 `.marquee`/`.promo-marquee`）：宽 3017px，会把 fullPage 宽度撑到 6194px。
6. 字体：`page.route` 把 `resourceType==='font'` 及 `fonts.googleapis.com/gstatic.com` **fulfill 空响应**（`status:200, body:Buffer.from([])`）。⚠️ 是 fulfill 不是 abort —— abort 会让 FontFace 停在 loading，`fonts.ready` 永不 resolve，`screenshot` 卡 30s 超时。
7. `goto` 用 `waitUntil:'domcontentloaded'`，**不要 `'load'`**（页面有视频，load 可能永不触发）。
8. 分步滚动触发懒加载（每 1000px 停 80ms）→ 回顶 → `waitForTimeout(2500)`。
9. **❌ 不要无超时地等所有 `<img>` 的 Promise**：懒图不就绪时永不 resolve，整个脚本无限挂起（今天卡了 5 分钟就是这么来的）。用 `Promise.race([...图像 Promise, 超时8000])`。
10. **加全局看门狗**：`setTimeout(()=>{log('看门狗触发');process.exit(3)},150000)`，并把每一步 `fs.appendFileSync` 落盘，避免"没反应又看不到日志"。

### 坐标与裁剪
- 坐标：top=0；`[data-i18n="sec_daqian"]`.closest('.section-header')、`#disposable`、`#devices` 的 `getBoundingClientRect().top + scrollY`；
  **bottom = `Math.max(body.scrollHeight, documentElement.scrollHeight, body.lastElementChild.getBoundingClientRect().bottom + scrollY)`**。
- 2026-09-11 实测（v1.51）：`daqian 2837 / disposable 5083 / devices 7651 / bottom 11054`（768px 宽布局下 grid 为 **4 列**）。
- **❌ 不要用 Playwright `clip`**：大区域不稳定（区域1 只截到视口高、区域2 报「Clipped area is either empty or outside」）。老老实实 fullPage + PIL。
- **⚠️ PIL 裁剪坐标必须 × deviceScaleFactor(2)**：`getBoundingClientRect()` 是 CSS px，截图是设备 px。`box=(0, y0*2, 1536, y1*2)`。
- **产出清理**：shot.js / crop.py / coords.json / fullpage.png / check_*.png / run.log 是中间产物，写在 `%TEMP%` 并在跑完删掉，**不要留在项目根**（避免被 commit 污染线上仓库）。4 张 PNG 是最终交付物，保留并覆盖同名旧文件。
- **输出文件**：`产品图册-01-幻影Pro+幻影+青羽.png` ~ `产品图册-04-烟具设备.png`
- **验收方式**：生成一张「各图顶部/底部缩略对照图」核对切点是否正好落在 section 标题上；再抽查新品所在区域确认图片与角标正常。

## 🔧 一键更新器（2026-09-11 起，首选流程）

**上新品不用再手工逐步改文件。** 流程：**用户填表 → 原图放目录 → 一条命令**。

- `tools/product-form.html` —— 新品录入表单（纯本地页面，双击打开）。**图片靠拖拽/粘贴，不让用户填文件名**：
  每个条目两个拖拽区（产品图 / 口味信息图），支持拖拽 + 点击选择 + **Ctrl+V 粘贴**；必填仅 品类/系列/名称/价格 + 发布范围；
  点「生成 JSON」→「⬇ 打包下载」得到 `新品包.zip`（图片已按目录摆好 + `新品.json`）→ 用户解压到项目根目录。
  ZIP 是**手写 store 无压缩实现**（零依赖，UTF-8 flag 0x0800），已用 Python `zipfile` 验证 CRC + 中文路径。
- **字段来源优先级（用户明确要求）**：`用户明确说的` > `图片上的信息` > `公开网络检索` > `脚本推导`。
  **口味关键词/星级/击喉感/描述强调色/容量一律不要让用户手填** —— 我从用户发的图里读，必要时网络检索补。
  标签配色与描述强调色由脚本自动推导（`autoTagColor` / `autoDescEm`）。
- **同级别老款的「新品上市」标签自动摘除**（默认行为，用户明确说"这个不需要我来判断"）：本次给某大类上了新品，就把该大类下**老款**的 `新品上市` 全部移除（本次新品保留）。要保留时 JSON 里加 `keepNewTags:true`。
- `_newproduct_refs/`（参考图暂存，读完删）与 `tools/` 都在 `.gitignore` 里，不进线上仓库。
- `tools/update.js` —— 五个子命令：
  - `apply <新品.json>`：清旧「新品上市」标签 → 写 index.html 硬编码（id 自动 max+1）→ 烟具配色插 colors 首位 → 补 getPuffs 口数 → **版本号三处一起 bump** → **重新生成 3 个 JSON** → 静态校验
  - `shot`：生成 4 张产品图册 PNG（**需 `dangerouslyDisableSandbox`**）
  - `push`：白名单筛文件 → commit → push → purge jsdelivr → 线上校验
  - `all <新品.json>`：全流程（推不推看 JSON 的 `publish` 字段）
  - `verify`：只读静态校验（解析 / 与 JSON 一致 / 版本号 3 处 / 图片存在性 / 排序预览）
- `tools/README.md` —— 说明 + JSON 结构 + 口数标定 + 排错表
- `tools/` 已加入 `.gitignore`，**只存本地不进线上仓库**。
- ⚠️ 开发教训：`insertIntoProducts` 首版逗号/缩进算错会产出 `...,]` 造成 JS 解析失败；**插入数组要在「`]` 前最后一个非空白字符」后插 `,\n<indent>  <entry>`**。脚本已加分步日志（`· 写入一次性产品` 等），排错先看停在哪一步。
- 手工分支（改分区标题、改 i18n、删产品、改渲染逻辑）仍按下面各节手动做。

## 推送与 CDN 缓存处理（2026-09-11 固化）

**只有在用户明确说「推送/推到GitHub/更新线上/发布」时才执行。** 标准流程：

1. **只暂存本次相关文件**（显式列出路径，不要 `git add -A`）：
   `index.html` + 改动的 JSON + `i18n.js` + 新增 `device_colors/*`、`extracted_images/*`。
   ⚠️ 工作区常有一批无关改动（根目录被删的源视频/docx、`.workbuddy/memory/*`、`logs/`、4 张产品图册 PNG/JPG、`.playwright-cli/*`）—— **一律不提交**，保持一致。
2. `git commit` → `git push origin main`。push 在沙箱里被拦时用 `dangerouslyDisableSandbox: true`。
3. **CDN 缓存处理（用户会点名要求"处理 CDN 缓存"）**：
   - **JSON 配置**：`fetchRemoteJSON()` 已自带缓存破坏 —— GitHub Pages 分支用 `/{repo}/{file}?_t={Date.now()/300000}`（每 5 分钟换参），且 `fetch(url,{cache:'no-cache'})`。所以 JSON 最多 5 分钟旧值，无需手工处理。
   - **图片**：URL 带 `?v=2` 静态参数，**改同一个文件名不会自动失效** → 所以新增产品一律**用新文件名**（改内容时要把 `?v=` 数字往上加）。
   - **主动清边缘缓存**：`https://purge.jsdelivr.net/gh/BrunoYang0918/relx-catalog@main/<path>`，返回 `"status":"finished"` 即成功。对改动的 JSON、新图、`index.html`、`i18n.js` 都清一遍。
   - **jsdelivr 校验**：`curl` 直接访问会返回 **301**（版本化跳转），必须加 `-L` 才能拿到内容；用 `-w '%{size_download}'` 在本机不可靠，**改用 `stat -c %s` 比对文件字节数与本地是否一致**（本次 4 张图 + 2 个 JSON 全部逐字节一致）。
   - **GitHub Pages**：`https://brunoyang0918.github.io/relx-catalog/index.html`，push 后约 1–2 分钟重建；用 `grep -c 'v1.51'` 确认线上已是新版本。Pages 自身缓存约 10 分钟，无法主动清，会自愈。
4. 线上验收：确认版本号、新品名称、新配色资源名都出现在线上 `index.html` 里。

## 视频素材
- **视频素材必须先压缩再使用**：用户提供的视频素材一律用 ffmpeg 压缩（CRF 32, 720p, 64k AAC, fast preset）后再放入 `videos/` 目录，jsdelivr CDN 大陆访问慢，压缩后能大幅提升加载速度。压缩前后需给出大小对比清单。

