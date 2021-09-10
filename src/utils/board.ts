import { spacesPerRow } from '../constants';

type BoardPosition = {
	row: number;
	column: number;
};

export const getBoardPosition = (position: number, fromRow = 0, fromColumn = 0): BoardPosition => {
	const row = Math.floor(position / spacesPerRow + 1) - fromRow;
	const column = position - (row - 1) * spacesPerRow + 1 - fromColumn;

	return {
		row,
		column
	};
};
