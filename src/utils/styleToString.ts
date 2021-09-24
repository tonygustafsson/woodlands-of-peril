export const styleToString = (style: Record<string, string | number>): string =>
	Object.keys(style).reduce(
		(acc, key) =>
			acc +
			key
				.split(/(?=[A-Z])/)
				.join('-')
				.toLowerCase() +
			':' +
			style[key] +
			';',
		''
	);
