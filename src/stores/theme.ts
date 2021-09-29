import { readable } from 'svelte/store';
import { getAllCSSVariables } from '$utils/stylesToJs';

const themeStore = () => {
	const { subscribe } = readable(getAllCSSVariables());

	return {
		subscribe
	};
};

const theme = themeStore();

export default theme;
