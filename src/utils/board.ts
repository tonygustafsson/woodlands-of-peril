import { spacesPerRow } from '../constants';

type BoardPosition = {
	row: number;
	column: number;
};

export const getBoardPosition = (position: number): BoardPosition => {
	const row = Math.floor(position / spacesPerRow + 1);
	const column = position - (row - 1) * spacesPerRow + 1;

	return {
		row,
		column
	};
};
