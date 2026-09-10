import type { ProfileConfig } from "@/types/config";
import { withUserConfig } from "../utils/config-overlay.ts";

/**
 * 博主资料：头像 / 名称 / 简介 / 社交链接（侧栏 Profile 卡片、页脚、RSS 作者等消费）。
 * 类型见 src/types/config.ts。
 */
export const profileConfig: ProfileConfig = withUserConfig("profile", {
	avatar: "assets/images/avatar.jpg", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "mineleng",
	bio: "这就是个博客！",
	links: [
		{
			name: "哔哩哔哩",
			icon: "fa6-brands:bilibili", // Visit https://icones.js.org/ for icon codes
			// You will need to install the corresponding icon set if it's not already included
			// `pnpm add @iconify-json/<icon-set-name>`
			url: "https://space.bilibili.com/3546582538520784",
		},
		{
			name: "QQ",
			icon: "fa6-brands:qq",
			url: "https://qm.qq.com/q/gRpl5tyK7S",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/mcmineleng",
		},
	],
});
