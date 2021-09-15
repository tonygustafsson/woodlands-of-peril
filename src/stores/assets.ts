import { writable } from 'svelte/store';

const tileSources: string[] = ['grass', 'rock', 'water', 'tree1', 'tree2', 'flower1'];

export type TileImage = {
	id: string;
	image: HTMLImageElement;
};

type Assets = {
	assets: TileImage[];
	done: boolean;
};

const initValue: Assets = {
	assets: [],
	done: false
};

const fetchTile = (tileSource): Promise<TileImage> =>
	new Promise((resolve) => {
		const img = new Image();
		img.onload = () => resolve({ id: tileSource, image: img });
		img.onerror = () => resolve({ id: tileSource, image: img });

		img.src = `./tiles/${tileSource}.png`;
		console.log('Loaded ' + img.src);
	});

const assetsStore = () => {
	const { subscribe, set } = writable(initValue);

	return {
		subscribe,
		fetch: async () => {
			const newTiles = await Promise.all(tileSources.map(fetchTile));

			set({
				assets: newTiles,
				done: true
			});
		}
	};
};

const assets = assetsStore();

export default assets;
