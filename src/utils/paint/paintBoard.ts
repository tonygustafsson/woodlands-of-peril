import { startPainting } from './';

const paintBoard = async (
	ctx: CanvasRenderingContext2D,
	width: number,
	height: number
): Promise<void> => {
	const continiousLoop = false;
	const showBoard = true;
	const showBeings = false;

	startPainting(ctx, width, height, continiousLoop, showBoard, showBeings);
};

export default paintBoard;
