const tileSources: string[] = [
	'./tiles/grass.png',
	'./tiles/rock.png',
	'./tiles/water.png',
	'./tiles/tree1.png',
	'./tiles/tree2.png',
	'./tiles/flower1.png'
];

export type TileImage = {
	id: string;
	image: HTMLImageElement;
};

const pathToId = (path: string): string => {
	const regex = /^.*\/(.*).png$/g;
	const result = regex.exec(path);

	if (result && result.length > 1) {
		return result[1];
	} else {
		return path;
	}
};

const fetchTile = (path): Promise<TileImage> =>
	new Promise((resolve) => {
		const img = new Image();
		img.onload = () => resolve({ id: pathToId(path), image: img });
		img.onerror = () => resolve({ id: pathToId(path), image: img });

		img.src = path;
	});

const fetchTiles = (): Promise<TileImage[]> => Promise.all(tileSources.map(fetchTile));

export { fetchTiles };
