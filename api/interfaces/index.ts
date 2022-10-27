export * from './people.interfaces';
export * from './planets.interfaces';


export interface IApiResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[]
}
export interface IQueryPagination {
    page: number;
    size: number;
}

