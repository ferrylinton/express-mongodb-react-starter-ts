type FindResult<T> = {
	list: Array<T>;
	total: number;
};

type ValidationError = {
	[key: string]: string;
};
