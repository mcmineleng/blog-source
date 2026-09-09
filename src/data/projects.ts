/**
 * 项目页数据源（纯内容）。
 * 页面展示与筛选规则由 src/config/projectsConfig.ts 控制。
 */
import type { ProjectItem } from "@/types/projectsConfig";

export const projectsData: ProjectItem[] = [
    	{
		key: "myzsh",
		title: "MyZsh",
		summary:
			"MyZsh主题插件系统，用于在Zsh上便捷到安装，使用主题与插件，加载速度快，在PRoot环境下也较为优异，兼容大部分OhMyZsh插件与主题",
		category: "theme",
		phase: "building",
		technologies: ["ZShell", "Python"],
		icon: "fa6-solid:terminal",
		coverAlt: ">_",
		featured: true,
		repository: "https://github.com/mcmineleng/myzsh",
		year: "2026",
	},
	

];

/** 获取所有项目数据列表 */
export function getProjectsList(): ProjectItem[] {
	return projectsData;
}
