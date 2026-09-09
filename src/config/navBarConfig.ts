import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import { devicesConfig } from "@/config/devicesConfig";
import { projectsConfig } from "@/config/projectsConfig";
import { skillsConfig } from "@/config/skillsConfig";
import { timelineConfig } from "@/config/timelineConfig";
import type {
	NavBarConfig,
	NavBarConfigOverride,
	NavBarLink,
	NavBarLinkOverride,
} from "@/types/navBarConfig";
import { getUserConfig } from "../utils/config-overlay.ts";
import { pagesConfig, type PageConfigKey } from "@/config/pagesConfig";

/**
 * 导航栏配置（统一单一来源）。
 * - LinkPresets：命名链接预设表 —— 名称 / 地址 / 图标单点维护，可整体复用；
 *   通过 `requires` 声明该预设依赖的页面开关，禁用时自动从导航中剔除。
 * - navBarConfig：导航结构 —— 顺序 + 分组（children 子菜单），
 *   同时驱动顶栏下拉菜单与全端导航抽屉。
 *
 * 新增入口：先在 LinkPresets 登记预设，再在 navBarConfig.links 按序引用。
 * 禁用页面：改 pagesConfig，而非注释。
 *
 * 内容仓可用 `config/nav-bar.yaml` 整体替换 `links`，写法见 `NavBarLinkOverride`。
 */

/** 创建一个「带开关感知」的预设：requires 对应的页面关闭时，该预设自动失效。 */
function definePreset(
	preset: Omit<NavBarLink, "requires"> & { requires?: PageConfigKey },
): NavBarLink {
	return preset as NavBarLink;
}

export const LinkPresets: Record<string, NavBarLink> = {
	Home: definePreset({
		name: i18n(I18nKey.home),
		url: "/",
		icon: "material-symbols:home-outline-rounded",
		pageKey: "home",
	}),
	Archive: definePreset({
		name: i18n(I18nKey.archive),
		url: "/archive/",
		icon: "material-symbols:archive-outline-rounded",
		pageKey: "archive",
	}),
	Friends: definePreset({
		name: i18n(I18nKey.friends),
		url: "/friends/",
		icon: "material-symbols:handshake-outline-rounded",
		pageKey: "friends",
	}),
	Moments: definePreset({
		name: i18n(I18nKey.moments),
		url: "/moments/",
		icon: "material-symbols:auto-awesome-outline-rounded",
		pageKey: "moments",
		requires: "moments",
	}),
	Anime: definePreset({
		name: i18n(I18nKey.anime),
		url: "/anime/",
		icon: "material-symbols:live-tv-outline-rounded",
		pageKey: "anime",
		requires: "anime",
	}),
	Compass: definePreset({
		name: i18n(I18nKey.compass),
		url: "/compass/",
		icon: "material-symbols:explore-rounded",
		pageKey: "compass",
	}),
	Skills: definePreset({
		name: i18n(I18nKey.skills),
		url: "/skills/",
		icon: "material-symbols:workspaces-outline-rounded",
		pageKey: "skills",
		requires: "skills",
	}),
	Projects: definePreset({
		name: i18n(I18nKey.projects),
		url: "/projects/",
		icon: "material-symbols:deployed-code-outline-rounded",
		pageKey: "projects",
		requires: "projects",
	}),
	Devices: definePreset({
		name: i18n(I18nKey.devices),
		url: "/devices/",
		icon: "material-symbols:devices-rounded",
		pageKey: "devices",
		requires: "devices",
	}),
	Timeline: definePreset({
		name: i18n(I18nKey.timeline),
		url: "/timeline/",
		icon: "material-symbols:timeline-rounded",
		pageKey: "timeline",
		requires: "timeline",
	}),
	Albums: definePreset({
		name: i18n(I18nKey.albums),
		url: "/albums/",
		icon: "material-symbols:photo-library-outline-rounded",
		pageKey: "albums",
		requires: "albums",
	}),
	Categories: definePreset({
		name: i18n(I18nKey.categories),
		url: "/categories/",
		icon: "material-symbols:folder-outline-rounded",
		pageKey: "categories",
	}),
	Tags: definePreset({
		name: i18n(I18nKey.tags),
		url: "/tags/",
		icon: "material-symbols:tag-rounded",
		pageKey: "tags",
	}),
	About: definePreset({
		name: i18n(I18nKey.about),
		url: "/about/",
		icon: "material-symbols:info-outline-rounded",
		pageKey: "about",
	}),
	GitHub: definePreset({
		name: "GitHub",
		url: "https://github.com/LyraVoid/Shirone",
		icon: "fa6-brands:github",
		external: true,
		pageKey: "github",
	}),
};

/**
 * 把一个预设标记为「条件启用」：仅当对应页面开关打开时保留。
 * 用 `enabled()` 包裹的项，禁用的页面会自动被 filterEnabled 剔除。
 */
function enabled(key: PageConfigKey, preset: NavBarLink): NavBarLink | null {
	return pagesConfig[key] ? preset : null;
}

/** 剔除 enabled() 产生的 null（含 children 递归）。 */
function filterEnabled(links: NavBarLink[]): NavBarLink[] {
	return links.flatMap((link) => {
		if (link === null) return [];
		if (link.children) {
			const children = filterEnabled(link.children);
			// 若子菜单全被禁用，则整个分组也隐藏
			if (children.length === 0) return [];
			return [{ ...link, children }];
		}
		return [link];
	});
}

const defaultNavBarConfig: NavBarConfig = {
	links: filterEnabled([
		LinkPresets.Home,
		LinkPresets.Friends,

		enabled("moments", LinkPresets.Moments),
		enabled("anime",   LinkPresets.Anime),

		LinkPresets.Compass,

		enabled("devices",  LinkPresets.Devices),
		LinkPresets.Projects,
		LinkPresets.About,

		{
			name: i18n(I18nKey.more),
			icon: "material-symbols:apps-rounded",
			children: filterEnabled([
				enabled("timeline", LinkPresets.Timeline),
				enabled("archive",  LinkPresets.Archive),
				// Skills、Devices、About 已移至一级菜单
				enabled("skills",   LinkPresets.Skills),
				LinkPresets.GitHub,
			]),
		},
	]),
};

/** `$t:home` 形式的 i18n 引用前缀；不带前缀的 name 一律按字面量处理。 */
const I18N_REFERENCE_PREFIX = "$t:";

function fail(message: string): never {
	throw new Error(`[config] nav-bar：${message}`);
}

function resolveName(name: string): string {
	if (!name.startsWith(I18N_REFERENCE_PREFIX)) return name;

	const key = name.slice(I18N_REFERENCE_PREFIX.length);
	if (!Object.hasOwn(I18nKey, key)) {
		fail(
			`未知的 i18n 词条 "${key}"。可用词条见 src/i18n/i18nKey.ts；` +
				" 若本意是普通文本，去掉开头的 $t: 即可。",
		);
	}
	return i18n(I18nKey[key as keyof typeof I18nKey]);
}

/**
 * 把内容仓的声明式导航条目还原成 `NavBarLink`。
 *
 * 预设名与 i18n 词条只有在这里才能校验（`LinkPresets` 与 `I18nKey` 都住在代码仓，
 * 生成期的 Node 脚本受路径别名所限读不到），因此错误在构建加载配置时抛出。
 */
export function resolveNavBarLinks(
	entries: readonly NavBarLinkOverride[],
	presets: Record<string, NavBarLink> = LinkPresets,
): NavBarLink[] {
	return entries.map((entry) => {
		let base: NavBarLink | null = null;
		if (entry.preset !== undefined) {
			base = presets[entry.preset] ?? null;
			if (!base) {
				fail(
					`未知的预设 "${entry.preset}"。可用预设：${Object.keys(presets).join("、")}。`,
				);
			}
		}

		const name =
			entry.name !== undefined ? resolveName(entry.name) : base?.name;
		if (name === undefined) {
			fail("每个条目都需要 name，或用 preset 引用一个内置预设。");
		}

		// 未声明 children 时沿用预设自带的子菜单（已由 ...base 带入）。
		return {
			...base,
			name,
			...(entry.url !== undefined ? { url: entry.url } : {}),
			...(entry.icon !== undefined ? { icon: entry.icon } : {}),
			...(entry.pageKey !== undefined ? { pageKey: entry.pageKey } : {}),
			...(entry.external !== undefined ? { external: entry.external } : {}),
			...(entry.children
				? { children: resolveNavBarLinks(entry.children, presets) }
				: {}),
		};
	});
}

const userNavBar = getUserConfig("navBar") as NavBarConfigOverride | undefined;

export const navBarConfig: NavBarConfig = userNavBar
	? { links: resolveNavBarLinks(userNavBar.links) }
	: defaultNavBarConfig;
