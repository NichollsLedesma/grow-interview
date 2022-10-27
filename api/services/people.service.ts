import { IApiResponse, IPerson, IPersonFromApi, IQueryPagination } from "../interfaces";
import { sortingBy } from "../utils";
import { fetchPeople } from "./third-party";

export const getAllPeople = async (pagination: IQueryPagination, sortBy?: string): Promise<IApiResponse<IPerson>> => {
    const dataFetched = await fetchPeople<IPersonFromApi>(pagination);
    const data: IPerson[] = clean(dataFetched.results)
    if (sortBy) {
        sortingBy(data, sortBy)
    }

    return {
        ...dataFetched,
        results: data
    }
}

const clean = (data: IPersonFromApi[]): IPerson[] => {
    return data.map(item => {
        return {
            ...item,
            height: Number(item.height),
            mass: Number(item.mass),
            created: new Date(item.created),
            edited: new Date(item.edited),
        }
    })
}