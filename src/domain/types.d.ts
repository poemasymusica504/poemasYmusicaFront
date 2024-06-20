export type IdModel = number | undefined;


export interface Model {
	id: IdModel
}

export type FetchResponsePaginator<R> = {
	count: number
	next:string
	previous: null
	results: R
};