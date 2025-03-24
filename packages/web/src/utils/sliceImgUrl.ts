export const sliceImgUrl = (path: string) => {
	const baseUrl = "http://image.tmdb.org/t/p/w500";
	return baseUrl + `${path}`;
};
