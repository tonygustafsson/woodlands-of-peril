import { startPainting } from './';

const paintSprites = (ctx: CanvasRenderingContext2D, width: number, height: number): void => {
	const continiousLoop = true;
	const showBoard = false;
	const showBeings = true;

	startPainting(ctx, width, height, continiousLoop, showBoard, showBeings);
};

export default paintSprites;
