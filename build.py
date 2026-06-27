"""
Build script: strip admin blocks from index-dev.html → clean index.html
Usage: python build.py
"""
import re

def build():
    src = r'C:\Users\Administrator\Desktop\悦刻口味介绍弹\index-dev.html'
    dst = r'C:\Users\Administrator\Desktop\悦刻口味介绍弹\index.html'
    
    with open(src, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Strip CSS admin blocks (/* ADMIN-ONLY */ ... /* /ADMIN-ONLY */)
    content = re.sub(r'/\* ADMIN-ONLY \*/.*?/\* /ADMIN-ONLY \*/', '', content, flags=re.DOTALL)
    
    # Strip HTML admin blocks (<!-- ADMIN-ONLY --> ... <!-- /ADMIN-ONLY -->)
    content = re.sub(r'<!-- ADMIN-ONLY -->.*?<!-- /ADMIN-ONLY -->', '', content, flags=re.DOTALL)
    
    # JS: ADMIN_PIN_HASH through admin event listeners (already marker-wrapped)
    # Remove trailing blank lines left by stripping
    content = re.sub(r'\n{3,}', '\n\n', content)
    
    with open(dst, 'w', encoding='utf-8') as f:
        f.write(content)
    
    # Verify
    with open(src, 'r', encoding='utf-8') as f:
        src_size = len(f.read())
    with open(dst, 'r', encoding='utf-8') as f:
        dst_size = len(f.read())
    
    print(f'index-dev.html: {src_size/1024:.1f} KB → index.html: {dst_size/1024:.1f} KB ({(1-dst_size/src_size)*100:.0f}% cut)')
    
    # Safety check
    for kw in ['ADMIN_PIN', 'openAdmin', 'closeAdmin', 'adminEntry', 'adminOverlay', 'adminModal', 'adminToast', 'renderAdminList', 'openAddForm', 'openEditForm', 'exportData']:
        if kw in open(dst, 'r', encoding='utf-8').read():
            print(f'WARNING: {kw} still present in output!')
    
    print('Build complete.')

if __name__ == '__main__':
    build()
