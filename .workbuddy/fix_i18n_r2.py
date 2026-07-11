# -*- coding: utf-8 -*-
"""Comprehensive i18n fix round 2 - address all screenshot-identified gaps"""
import os, re

BASE = r"C:\Users\Administrator\Desktop\悦刻口味介绍弹"

with open(os.path.join(BASE, "index.html"), "r", encoding="utf-8") as f:
  html = f.read()

orig = html

changes = []

# ============================================================
# FIX 1: QUIZ_STEPS - make translatable
# ============================================================
old_quiz = """var QUIZ_STEPS = [
  { title: '\u4f60\u73b0\u5728\u7528\u4ec0\u4e48\u70df\u5177\uff1f', key: 'device', options: [
    { label: '\u5e7b\u5f71Pro / \u5e7b\u5f71 / \u9752\u7fbd / \u5fa1\u5f71S', val: 'phantom' },
    { label: '\u5927\u5343\uff0810ml\u5927\u5f39\uff0c\u53ef\u914d\u8f6c\u63a5\u53e3\u901a\u7528\uff09', val: 'daqian' },
    { label: '\u5b99斯\uff08\u53ef\u914d\u8f6c\u63a5\u53e3\u901a\u7528\uff09', val: 'zeus' },
    { label: '\u6ca1\u6709\u70df\u5177\uff0c\u5148\u8bd5\u8bd5\u4e00\u6b21\u6027', val: 'disposable' },
    { label: '\u6ca1\u6709\u70df\u5177\uff0c\u8003\u8651\u5165\u624b\u70df\u5177', val: 'newbie' }
  ]},
  { title: '\u4f60\u62bd\u70df\u52b2\u9053\u504f\u597d\uff1f', key: 'strength', options: [
    { label: '\u6e05\u6de1\u67d4\u548c\uff0c\u4e0d\u54ac\u4e0d\u523a\u6fc0', val: '\u6e05\u6de1' },
    { label: '\u9002\u4e2d\u5c31\u597d\uff0c\u6709\u70b9\u611f\u89c9', val: '\u9002\u4e2d' },
    { label: '\u8981\u6709\u52b2\u624d\u8fc7\u7634', val: '\u50cf\u6d53' }
  ]},
  { title: '\u4f60\u559c\u6b22\u4ec0\u4e48\u53e3\u611f\u98ce\u5473\uff1f', key: 'taste', options: [
    { label: '\u70df\u8349\u672c\u5473\uff0c\u50cf\u771f\u70df', val: '\u70df\u8349' },
    { label: '\u679c\u751c\u98ce\u5473\uff0c\u6e05\u723d\u597d\u95fb', val: '\u679c\u5473' },
    { label: '\u8336\u9999\u82b1\u9999\uff0c\u4f18\u96c5\u7ec6\u817b', val: '\u82b1\u9999' },
    { label: '\u4e0d\u6311\uff0c\u90fd\u884c', val: '\u4e0d\u9650' }
  ]}
];"""

new_quiz = """var QUIZ_STEPS = [
  { title: __t('quiz_q1','What device do you use?'), key: 'device', options: [
    { label: __t('quiz_opt_phantom','Phantom Pro / Phantom / Qingyu / Yuying S'), val: 'phantom' },
    { label: __t('quiz_opt_daqian','Daqian (10ml mega pod, adapter compatible)'), val: 'daqian' },
    { label: __t('quiz_opt_zeus','Zeus (adapter compatible)'), val: 'zeus' },
    { label: __t('quiz_opt_dispo','No device yet, try disposables'), val: 'disposable' },
    { label: __t('quiz_opt_newbie','No device, consider getting one'), val: 'newbie' }
  ]},
  { title: __t('quiz_q2','What throat hit do you prefer?'), key: 'strength', options: [
    { label: __t('quiz_str_mild','Light & smooth, gentle'), val: '\u6e05\u6de1' },
    { label: __t('quiz_str_med','Medium, just right feeling'), val: '\u9002\u4e2d' },
    { label: __t('quiz_str_strong','Strong hit needed'), val: '\u50cf\u6d53' }
  ]},
  { title: __t('quiz_q3','What flavor profile do you like?'), key: 'taste', options: [
    { label: __t('quiz_taste_tobacco','Authentic tobacco taste'), val: '\u70df\u8349' },
    { label: __t('quiz_taste_fruity','Sweet & fruity, refreshing'), val: '\u679c\u5473' },
    { label: __t('quiz_taste_floral','Tea & floral notes, elegant'), val: '\u82b1\u9999' },
    { label: __t('quiz_taste_any','Not picky, anything goes'), val: '\u4e0d\u9650' }
  ]}
];"""

if old_quiz in html:
  html = html.replace(old_quiz, new_quiz)
  changes.append("QUIZ_STEPS → __t()")

# ============================================================
# FIX 2: renderQuizStep() - wrap hardcoded strings
# ============================================================
# "下一题 →" button
html = html.replace(
  "'下一题 →') + '</button>';",
  "__t('quiz_next','Next \u2192') + '</button>';"
)
changes.append("renderQuizStep: next button")

# "查看推荐" button
html = html.replace(
  "'\U0001f50d \u67e5\u770b\u63a8\u8350') + '</button>'",
  "__t('quiz_show','\U0001f50d See Recommendations') + '</button>'"
)
changes.append("renderQuizStep: show recs button")

# ============================================================
# FIX 3: showQuizResult() - whyMap + button text
# ============================================================
old_whyMap = """var whyMap = {
    '\u6e05\u6de1': '\u52b2\u9053\u67d4\u548c\uff0c\u4e0d\u54ac\u4e0d\u523a\u6fc0',
    '\u9002\u4e2d': '\u52b2\u9053\u9002\u4e2d\uff0c\u521a\u521a\u597d\u7684\u6ee1\u8db3\u611f',
    '\u50cf\u6d53': '\u52b2\u9053\u5341\u8db3\uff0c\u8001\u70df\u6c11\u89e3\u9996\u9009'
  };"""

new_whyMap = """var whyMap = {
    '\u6e05\u6de1': __t('why_mild','Light & smooth, non-irritating'),
    '\u9002\u4e2d': __t('why_med','Medium strength, satisfying feeling'),
    '\u50cf\u6d53': __t('why_strong','Strong hit, perfect for heavy smokers')
  };"""

if old_whyMap in html:
  html = html.replace(old_whyMap, new_whyMap)
  changes.append("showQuizResult: whyMap → __t()")

# "✓ 已加N件"
html = html.replace(
  "'✓ \u5df2\u52a0' + inCart + '\u4ef6'",
  "__t('qr_added','✓ Added ') + inCart + __t('qr_pieces',' pcs')"
)
changes.append("showQuizResult: added text")

# "＋ 加入清单"  
html = html.replace(
  "'＋ \u52a0\u5165\u6e05\u5355'",
  "__t('qr_add','＋ Add')"
)
changes.append("showQuizResult: add btn")

# qr-title
html = html.replace(
  "<div class=\"qr-title\">\u63a8\u5ba2\u63a8\u8350</div>",
  '<div class="qr-title">\' + __t(\'qr_title\',\'Recommendations\') + \'</div>'
)
changes.append("showQuizResult: title")

# qr-reset
html = html.replace(
  "<div class=\"qr-reset\">",
  "<div class=\"qr-reset\">" + __t('qr_retry','\u2191 Try Again')
)
changes.append("showQuizResult: retry btn")

# qr-add-btn
html = html.replace(
  "class=\"qr-add-btn done\"",
  "class=\"qr-add-btn done\""
)
# text already handled above

# qr-dev-banner name/price
html = html.replace(
  "<div class=\"qrdb-name\">" + __t('qr_dev_name','') if False else '',
  # Actually let me just do direct replacement
)
# Skip dev banner for now, it's dynamic

# ============================================================
# FIX 4: Cart panel - ensure all __t calls
# ============================================================
# Cart header h3
old_cart_hdr = '<h3 data-i18n="cp_title">\u6211\u7684\u9009\u54c1\u6e05\u5355</h3>'
new_cart_hdr = '<h3 data-i18n="cp_title">' + __t('cp_title2','My Selection List') + '</h3>'
if old_cart_hdr in html:
  html = html.replace(old_cart_hdr, new_cart_hdr)
  changes.append("cart header h3")

# Cart total label
html = html.replace(
  "<div class=\"cp-total\" data-i18n=\"cp_est\">\u9884\u4f30\u53c2\u8003 <span",
  '<div class="cp-total">' + __t('cart_est_label','Est. Total') + ' <span'
)
changes.append("cart total label")

# ============================================================
# FIX 5: MAP dictionary additions for section 5 fallback
# These catch text nodes without data-i18n
# ============================================================

# Find the MAP dictionary in i18n.js and add missing entries
with open(os.path.join(BASE, "i18n.js"), "r", encoding="utf-8") as f:
  i18n = f.read()

# Key phrases that need MAP entries (section 5 catches loose text nodes)
map_additions = r"""
'\u70df\u5f39\u9009\u5473 \u25c7':'Pods Flavor Guide',
'\u4e00\u6b21\u6027\u6b3e':'Disposables',
'\u70df\u5177\u9009\u8272':'Device Colors',
'\u5168\u90e8':'All',
'\u2601\ufe0f \u65b0\u624b\u5165\u95e8':'Beginner',
'\U0001f4a8 \u6709\u52b2\u89e3\u766b':'Strong Hit',
'\U0001f048 \u679c\u5473\u53e3\u5473':'Fruity Profile',
'\U0001f438 \u67d4\u548c\u751c\u9999':'Sweet & Smooth',
'\u52a0\u5165\u6e05\u5355':'Add to List',
'\U0001f4dd \u5e97\u9578\u63a8\u8350':'Staff Pick',
'\u6211\u8fd4\u6eda\u5e03':'Contact Store',
'\u6211\u8054\u7cfb\u95e8':'EN',
"""

# Insert before the closing of MAP en object
map_end_marker = "'Blueberry Roast':'Blueberry Roast'"
if map_end_marker in i18n:
  i18n = i18n.replace(map_end_marker, map_end_marker + map_additions)
  changes.append("i18n.js MAP: added fallback entries")
else:
  print("WARNING: MAP end marker not found!")

# Also add DESCS fallbacks
desc_additions = r"""
'\u6e05\u7231\u7530\u9999\u9999\u5473 · \u7126\u71e5\u4e2d\u5f0f \u56de\u5473\u5e72\u51c0':'Mellow roasted tobacco, light Chinese style, clean finish',
'\u6728\u67f4\u8349\u672c\u9999\u9999\u5473 · \u51c9\u7231\u5e72\u5473':'Woody fragrance, clean & dry',
"""
desc_end_marker = "'醇厚烤烟香 · 硬中华满足感 3ml':'Rich roasted, Hard Chunghwa, 3ml'"
if desc_end_marker in i18n:
  i18n = i18n.replace(desc_end_marker, desc_end_marker + desc_additions)
  changes.append("i18n.js DESCS: added fallback entries")

# Write both files
if html != orig:
  with open(os.path.join(BASE, "index.html"), "w", encoding="utf-8") as f:
    f.write(html)
  print(f"index.html updated ({len(changes)} changes)")

with open(os.path.join(BASE, "i18n.js"), "w", encoding="utf-8") as f:
  f.write(i18n)
print(f"i18n.js updated")

for c in changes:
  print(f"  - {c}")

print("\nDone!")
