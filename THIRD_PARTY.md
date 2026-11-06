# 第三方授权

`LICENSE` 的 MIT 授权只覆盖本仓库自己写的代码、文档和设计规范。下面这些不在 MIT 范围内。

## 字体

全部是 SIL Open Font License 1.1。字体文件不放在仓库里，`tools/setup.sh` 从各自的官方仓库下载。来源、版权行和授权全文见 `licenses/fonts-OFL.txt`。

## 照片

照片原图不放在仓库里，`tools/setup.sh` 按 `kit/assets.tsv` 的地址下载。

- 来自 Unsplash 的照片按 [Unsplash License](https://unsplash.com/license)。其中 14 张经 Lorem Picsum 下载，原图也在 Unsplash。
- 来自 Wikimedia Commons 的照片是 CC0。

`refs/`、`examples/`、`docs/` 里的效果图用到了这些照片。效果图的界面设计按 MIT，里面的照片版权归摄影师所有。

这些授权不包含肖像权和商标权。效果图里有人物照片，部分图库照片带品牌标志（见 `refs/图库/新图说明.md`），用在商业项目前自己确认。

## 图标

[Lucide](https://lucide.dev)，ISC License，由 `npm ci` 安装。

## 依赖

- [sharp](https://github.com/lovell/sharp)：Apache-2.0
- [fonttools](https://github.com/fonttools/fonttools)：MIT
- [brotli](https://github.com/google/brotli)：MIT

## 名称

「模方科技」的名称和标志不在授权范围内。样例里的品牌、人名、门牌、网址、价格都是编的，街道和地标用了真实地名，和真实商户、网站无关，重名纯属巧合。文档提到的第三方产品名称归各自所有者。
