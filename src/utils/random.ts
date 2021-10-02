export const inArray = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const getDiceResult = (): number => Math.floor(Math.random() * 6) + 1;
