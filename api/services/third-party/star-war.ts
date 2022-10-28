import axios from "axios";
import { IApiResponse, IPerson, IPersonFromApi, IPlanetFromApi, IQueryPagination } from "../../interfaces";
import { findObject, writeFile } from "../../utils";

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
    const people = await getAllDataPeople()
    const planets = await loadDataPlanets()

    const peopleCleaned = cleanPeople(people);
    const planetsCleaned = cleanPlanets(planets, people);

    writeFile<IPerson>('people.json', peopleCleaned)
    writeFile<IPlanetFromApi>('planets.json', planetsCleaned);

    console.log('data loaded.')
}

const cleanPlanets = (planets: IPlanetFromApi[], people: IPersonFromApi[]): IPlanetFromApi[] => {
    const getName = (key: string, value: string): string => {
        const person = findObject<IPersonFromApi>(people, key, value)
        return (person) ? person.name : 'unknown';
    }
    return planets.map(planet => {
        const names = planet.residents.map(residentUrl => getName('url', residentUrl))

        return {
            ...planet,
            residents: names
        }
    })
}


const loadDataPlanets = async (): Promise<IPlanetFromApi[]> => {
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

    return [...firstResult, ...allPlanets]
}

const getAllDataPeople = async (): Promise<IPersonFromApi[]> => {
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



    return [...firstResult, ...allPeople]
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