/**
 * 页面可见性总开关（唯一真相源）。
 * 改这一个文件，决定导航里出现什么、不出现什么。
 */
export const pagesConfig = {
	home:       true,
	archive:    true,
	categories: true,
	tags:       true,
	about:      true,

	friends:    true,
	moments:    false,
	compass:    true,
	albums:     false,

	anime:      false,
	skills:     false,
	projects:   true,
	devices:    true,
	timeline:   true,
} as const;

export type PageConfigKey = keyof typeof pagesConfig;
