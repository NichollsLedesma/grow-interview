import axios from "axios";
import { IApiResponse, IQueryPagination } from "../../interfaces";

const fetching = <T>(source: string, queryParams: Record<string, any> = {}): Promise<IApiResponse<T>> => {
    const BASE_API_URL = 'https://swapi.dev/api';
    const queryString = new URLSearchParams(queryParams);
    
    return axios.get(`${BASE_API_URL}/${source}?${queryString.toString()}`)
        .then(resp => resp.data)
        .catch(err => console.log(err.message));
}

export const fetchPeople = async <T>(params: IQueryPagination): Promise<IApiResponse<T>> => {
    const source = 'people';
    return await fetching<T>(source, params);
}

export const fetchPlanets = async <T>(params: IQueryPagination): Promise<IApiResponse<T>> => {
    const source = 'planets';
    return await fetching<T>(source, params);
}