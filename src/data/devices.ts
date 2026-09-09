/**
 * 设备展示页数据源（纯内容）。
 * 页面展示与筛选规则由 src/config/devicesConfig.ts 控制。
 */
import type { DeviceItem } from "@/types/devicesConfig";

export const devicesData: DeviceItem[] = [
	{
		id: "oneplus-ace-6t",
		name: "一加 Ace 6T",
		brand: "OnePlus",
		category: "mobile",
		status: "active",
		specs: "16GB+256GB / 第5代骁龙8 / 1.5K 165Hz",
		description:
			"主力游戏与日常用机，性能强劲，续航持久，适合高负载场景使用。",
		icon: "material-symbols:phone-iphone",
		featured: true,
		year: "2026",
		link: "https://www.oneplus.com/cn/ace-6t",
	},
	{
		id: "honor-90",
		name: "荣耀 90",
		brand: "HONOR",
		category: "mobile",
		status: "backup",
		specs: "12GB+256GB / 骁龙7 Gen1 / 2亿像素主摄",
		description:
			"轻薄拍照手机，性能差，适合日常拍摄与轻度使用。",
		icon: "material-symbols:phone-iphone",
		featured: false,
		year: "2023",
		link: "https://www.honor.com/cn/phones/honor-90/spec/",
	},
	{
		id: "oneplus-buds-3c",
		name: "一加 Buds 3V",
		brand: "OnePlus",
		category: "headphones",
		status: "active",
		specs: "音质还行 / 比较便宜",
		description:
			"续航较长，音质尚可，较为便宜 ",
		icon: "material-symbols:headphones-rounded",
		featured: true,
		year: "2026",
		link: "https://www.oneplus.com/cn/ace-6t",
		},
		{
		id: "wbin-airbook",
		name: "Wbin笔记本",
		brand: "Wbin",
		category: "desk",
		status: "backup",
		specs: "8GB+512GB / Intel Core i7-6600U / 2.5K 60Hz",
		description:
			"老旧笔记本",
		icon: "material-symbols:desktop-windows-outline-rounded",
		featured: false,
		year: "2018",
		link: "",
		},
];

/** 获取所有设备数据列表 */
export function getDevicesList(): DeviceItem[] {
	return devicesData;
}
