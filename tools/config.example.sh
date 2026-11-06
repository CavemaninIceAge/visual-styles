# 复制成 tools/config.local.sh（不进仓库）。不建这个文件时，工具默认在本机出图，放在 ~/.cache/visual-styles
# 下面是把出图放到另一台 Mac 的写法：这台机器只写代码，那台机器跑 Node 和 Chrome
# REMOTE_HOST=my-mac                       # ssh 能连上的主机名
# REMOTE_KIT=/Users/me/visual-styles/kit   # 那台机器上放工具的目录，写绝对路径
# REMOTE_DEMOS=/Users/me/visual-styles/demos
# 工具会在 PATH 末尾补上 Homebrew 的路径；Node 装在别处时在这里写
# NODE_PATH_CMD='export PATH=$PATH:/path/to/node/bin'
