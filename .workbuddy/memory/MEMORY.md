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
- 生花好事：悦刻飞光一次性，12ml/4000口，¥129，风味定位「焦糖坚果豆香 · 强击喉 奶油蜂蜜香」，标签「新品上市/解瘾强/焦糖坚果/12ml大容量」

## 开发规约
- **🔴 数据双源架构（极重要）**：运行时产品数据来自 JSON 配置文件而非 index.html 硬编码！加载流程：硬编码(fallback) → localStorage → `fetchRemoteJSON('pod-config.json')` 覆盖(约2620行)。**只改硬编码不生效，改动会被旧 JSON 覆盖。** 每次改产品数据后必须同步重新生成 `pod-config.json`/`disposable-config.json`/`device-config.json`（Node 提取 index.html 中 POD_SECTIONS/DISPOSABLE_SECTIONS/DEVICES 对象字面量 → JSON.stringify 写回），并 bump `DATA_VERSION` 使 localStorage 缓存失效。
- **本地预览用 localhost 而非 file://**：`file:///` 会被浏览器 CORS 拦截 config fetch。用 `python -m http.server` 起服务后通过 localhost 打开最可靠。产品图走 CDN（需联网），未 push 的新图需 base64 内嵌。
- **🚫 严禁未经授权推送线上版本**：所有修改只能做在本地 index.html，只有在用户明确说「推到 GitHub」「推送」「更新线上」等授权指令时，才能执行 `git push`。线上版本面向客户，未经授权的推送导致页面挂掉是致命问题。
- 每次有重大功能变更推送前，必须同步更新版本号。
- 顶部 topbar 和底部 compliance-warning 两处版本号须同时修改。
- 版本格式：`v主版本.小版本`，重大功能增加小版本号。
- 当前版本：v3.7
- **视频素材必须先压缩再使用**：用户提供的视频素材一律用 ffmpeg 压缩（CRF 32, 720p, 64k AAC, fast preset）后再放入 `videos/` 目录，jsdelivr CDN 大陆访问慢，压缩后能大幅提升加载速度。压缩前后需给出大小对比清单。

