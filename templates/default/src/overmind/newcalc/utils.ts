export const isNum = (n: any) => Number(n) == n;
export function lastNum<T extends (string | number)> (arr: T[]) { return arr.filter(n => isNum(n)).pop() as number; }
export const last = <T>(arr: T[]) => arr[arr.length - 1];
