const CssKeyToJsKey = (key: string) =>
	key.replace('--', '').replace(/-./g, (x) => x.toUpperCase()[1]);

const getAllCSSVariableNames = (styleSheets: StyleSheetList = document.styleSheets) => {
	const cssVars = [];

	Array.from(styleSheets).forEach((styleSheet) => {
		Array.from(styleSheet.cssRules).forEach((rule) => {
			if (!rule || !rule['style']) {
				return;
			}

			Array.from(rule['style']).forEach((style: string) => {
				if (style.startsWith('--') && cssVars.indexOf(style) == -1) {
					cssVars.push(style);
				}
			});
		});
	});

	return cssVars;
};

const getElementCSSVariables = (
	allCSSVars: Array<string>,
	element: HTMLElement = document.body,
	pseudo: string | undefined = ''
) => {
	const elStyles = window.getComputedStyle(element, pseudo);
	const cssVars = {};

	allCSSVars.forEach((key) => {
		const value = elStyles.getPropertyValue(key);

		if (value) {
			cssVars[CssKeyToJsKey(key)] = value;
		}
	});

	return cssVars;
};

export const getAllCSSVariables = (): Record<string, string> => {
	if (typeof document === 'undefined') {
		return {};
	}

	const cssVars = getAllCSSVariableNames();

	return getElementCSSVariables(cssVars, document.documentElement);
};
