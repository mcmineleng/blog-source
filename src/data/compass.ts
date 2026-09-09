/**
 * 站点罗盘数据（本地数据源）。
 * 用途：src/pages/compass.astro → organisms/CompassSection → molecules/CompassTile。
 * 添加站点：往对应 Shelf.entries 追加一项；数组顺序即展示顺序。
 * - icon：Iconify 名（material-symbols:xxx）或图片 URL（http(s)/绝对路径）；
 *   省略时瓷砖显示 label 首字母 tonal 块（不自动抓取 favicon）。
 * - image：用户自定义图片 URL（http(s)/绝对路径），优先于 icon 渲染；
 *   加载失败自动降级为首字母块。
 */

/** 单条站点记录 */
export interface CompassEntry {
	/** 站点名（瓷砖标题） */
	label: string;
	/** 外链地址 */
	href: string;
	/** 一句话说明（瓷砖副行；省略则显示域名） */
	note?: string;
	/** 图标：Iconify 名或图片 URL；省略 = 首字母兜底 */
	icon?: string;
	/** 用户自定义图片（http(s)/绝对路径）：优先于 icon 渲染；省略则走 icon/首字母 */
	image?: string;
}

/** 分组（Shelf = 罗盘上的收纳格） */
export interface CompassShelf {
	/** 锚点 id（字母数字，作分组定位与跳转） */
	key: string;
	/** 分组名 */
	name: string;
	/** 分组图标（Iconify 名，SectionTitle 行首） */
	icon?: string;
	/** 分组副文案（标题下弱文本，可选） */
	blurb?: string;
	entries: CompassEntry[];
}

export const compassData: CompassShelf[] = [
	{
		key: "dev",
		name: "开发",
		icon: "material-symbols:code-rounded",
		blurb: "写代码时我常开的站点",
		entries: [
			{
				label: "GitHub",
				href: "https://github.com",
				note: "代码托管与协作",
				icon: "fa6-brands:github",
			},
			{
				label: "MDN",
				href: "https://developer.mozilla.org",
				note: "权威的 Web 技术文档",
				icon: "material-symbols:menu-book-rounded",
			},
			{
				label: "Stack Overflow",
				href: "https://stackoverflow.com",
				note: "问答与调试",
			},
		],
	},
	{
		key: "design",
		name: "设计",
		icon: "material-symbols:palette-outline-rounded",
		blurb: "配色、图标与灵感",
		entries: [
			{
				label: "Iconify",
				href: "https://icon-sets.iconify.design",
				note: "可搜索的开源图标集",
			},
			{
				label: "Material Symbols",
				href: "https://fonts.google.com/icons",
				note: "官方 M3 图标集",
				icon: "material-symbols:star-rounded",
			},
			{
				label: "Excalidraw",
				href: "https://excalidraw.com",
				note: "手绘风格白板协作",
			},
		],
	},
	{
		key: "tools",
		name: "工具",
		icon: "material-symbols:build-outline-rounded",
		entries: [
			{
				label: "Squoosh",
				href: "https://squoosh.app",
				note: "图片压缩与格式转换",
			},
			{
				label: "Regex101",
				href: "https://regex101.com",
				note: "正则表达式测试与调试",
			},
			{
				label: "mineleng工具站",
				href: "https://tools.mcleng.cn",
				note: "多种工具，有美观主题，永久无广告(站长的网站)",
			},
			{
				label: "UU在线工具",
				href: "https://uutool.cn/",
				note: "多种工具，目前暂时无广告",
			},
		],
	},
	{
		key: "reads",
		name: "阅读",
		icon: "material-symbols:auto-stories-outline-rounded",
		entries: [
			{ label: "Hacker News", href: "https://news.ycombinator.com" },
			{ label: "V2EX", href: "https://www.v2ex.com" },
			{
				label: "Solidot",
				href: "https://www.solidot.org",
				note: "科技与文化资讯",
			},
		],
	},
];
