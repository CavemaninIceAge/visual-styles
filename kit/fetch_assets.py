#!/usr/bin/env python3
# 下载字体和图库到 kit/assets/：python3 fetch_assets.py [font|img]（不写就两样都下）
# 清单在 assets.tsv：类型、文件名、地址，字体在压缩包里时再加一列压缩包内路径
# 字体来自各自的官方仓库，照片来自 Unsplash 和 Wikimedia Commons。已经有的文件跳过；走代理时设 https_proxy
import os, subprocess, sys, tempfile, zipfile
from concurrent.futures import ThreadPoolExecutor

KIT = os.path.dirname(os.path.abspath(__file__))
DIRS = {'font': 'assets/fonts', 'img': 'assets/img'}
only = sys.argv[1] if len(sys.argv) > 1 else None
rows = [l.rstrip('\n').split('\t') for l in open(os.path.join(KIT, 'assets.tsv'), encoding='utf8') if l.strip() and not l.startswith('#')]
rows = [r for r in rows if not only or r[0] == only]
for d in DIRS.values():
    os.makedirs(os.path.join(KIT, d), exist_ok=True)
dest = lambda r: os.path.join(KIT, DIRS[r[0]], r[1])
todo = [r for r in rows if not (os.path.exists(dest(r)) and os.path.getsize(dest(r)) > 0)]
if not todo:
    print(f'字体和图库都在，{len(rows)} 个文件')
    sys.exit(0)
print(f'要下载 {len(todo)} 个文件（清单共 {len(rows)} 个）')


def curl(url, out):
    part = out + '.part'
    r = subprocess.run(['curl', '-fsSL', '-A', 'visual-styles-fetch/1.0', '-m', '600', '--retry', '3', '--retry-delay', '3', '-o', part, url])
    if r.returncode or not os.path.getsize(part):
        if os.path.exists(part):
            os.remove(part)
        return False
    os.replace(part, out)
    return True


tmp = tempfile.mkdtemp()
zips = {}
for url in sorted({r[2] for r in todo if len(r) > 3}):
    z = os.path.join(tmp, str(len(zips)) + '.zip')
    zips[url] = z if curl(url, z) else None


def get(r):
    if len(r) > 3:
        if not zips[r[2]]:
            return r[1]
        with zipfile.ZipFile(zips[r[2]]) as z, open(dest(r), 'wb') as f:
            f.write(z.read(r[3]))
        return None
    return None if curl(r[2], dest(r)) else r[1]


with ThreadPoolExecutor(8) as ex:
    bad = [x for x in ex.map(get, todo) if x]
if bad:
    print(f'{len(bad)} 个没下到：{"、".join(bad[:12])}（重跑一次会接着下）')
    sys.exit(1)
print('下载完成')
