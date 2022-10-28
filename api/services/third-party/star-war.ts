import axios from "axios";
import { IApiResponse, IPerson, IPersonFromApi, IPlanetFromApi, IQueryPagination } from "../../interfaces";
import { writeFile } from "../../utils";

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


export const loadData = async () => {
    await Promise.all([
        loadDataPeople(),
        loadDataPlanets()
    ]).then(_ => {
        console.log(`files updates.`)
    })
}

const loadDataPlanets = async () => {
    const size = 10;
    let currentPage = 1
    const { count, results: firstResult } = await fetchPlanets<IPlanetFromApi>({ page: currentPage, size });
    const maxPages = Math.ceil(count / size);
    const promises = [];

    if (maxPages > currentPage) {
        for (currentPage = 2; currentPage <= maxPages; currentPage++) {
            promises.push(fetchPlanets<IPlanetFromApi>({ page: currentPage, size }))
        }
    }
    const allPlanets: IPlanetFromApi[] = await Promise.all(promises).then((data: IApiResponse<IPlanetFromApi>[]) => {
        return data.flatMap(response => response.results)
    });
    writeFile<IPlanetFromApi>('planets.json', [...firstResult, ...allPlanets])
}

const loadDataPeople = async () => {
    const size = 10;
    let currentPage = 1
    const { count, results: firstResult } = await fetchPeople<IPersonFromApi>({ page: currentPage, size });
    const maxPages = Math.ceil(count / size);
    const promises = [];

    if (maxPages > currentPage) {
        for (currentPage = 2; currentPage <= maxPages; currentPage++) {
            promises.push(fetchPeople<IPersonFromApi>({ page: currentPage, size }))
        }
    }

    const allPeople: IPersonFromApi[] = await Promise.all(promises).then((data: IApiResponse<IPersonFromApi>[]) => {
        return data.flatMap(response => response.results)
    });

    const dataCleaned = cleanPeople([...firstResult, ...allPeople]);
    writeFile<IPerson>('people.json', dataCleaned)
}


const cleanPeople = (data: IPersonFromApi[]): IPerson[] => {
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