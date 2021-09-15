import { writable } from 'svelte/store';

const tileSources: string[] = ['grass', 'rock', 'water', 'tree1', 'tree2', 'flower1'];
const spriteSources: string[] = ['coin', 'monster', 'wizard'];

export type AssetImage = {
	id: string;
	image: HTMLImageElement;
};

type Assets = {
	tiles: AssetImage[];
	sprites: AssetImage[];
	done: boolean;
};

const initValue: Assets = {
	tiles: [],
	sprites: [],
	done: false
};

const fetchTile = (tileSource): Promise<AssetImage> =>
	new Promise((resolve) => {
		const img = new Image();
		img.onload = () => resolve({ id: tileSource, image: img });
		img.onerror = () => resolve({ id: tileSource, image: img });

		img.src = `./tiles/${tileSource}.png`;
		console.log('Loaded tile ' + img.src);
	});

const fetchSprite = (tileSource): Promise<AssetImage> =>
	new Promise((resolve) => {
		const img = new Image();
		img.onload = () => resolve({ id: tileSource, image: img });
		img.onerror = () => resolve({ id: tileSource, image: img });

		img.src = `./sprites/${tileSource}.png`;
		console.log('Loaded sprite ' + img.src);
	});

const assetsStore = () => {
	const { subscribe, set } = writable(initValue);

	return {
		subscribe,
		fetch: async () => {
			const tiles = await Promise.all(tileSources.map(fetchTile));
			const sprites = await Promise.all(spriteSources.map(fetchSprite));

			set({
				tiles,
				sprites,
				done: true
			});
		}
	};
};

const assets = assetsStore();

export default assets;
