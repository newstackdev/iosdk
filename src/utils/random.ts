const swap = (arr: any[], i: number, j: number) => {
	[arr[i], arr[j]] = [arr[j], arr[i]];
	return arr;
}

export const fischerYates = (arr: any[], n?: number) => {
    n = n || arr.length;
	arr = [...arr];
	const r: any[] = [];
	while (r.length < n) {
		swap(arr, 0, Math.floor(Math.random() * arr.length));
		r.push(arr.shift());
	}
	return r;
};