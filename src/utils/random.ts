export const inArray = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const randomNumber = (min: number, max: number): number =>
	Math.floor(Math.random() * (max - min + 1) + min);

export const getDiceResult = (): number => randomNumber(1, 6);
