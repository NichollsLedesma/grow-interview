import { IApiResponse, IPlanetFromApi, IQueryPagination } from "../interfaces";
import { fetchPlanets } from "./third-party";

export const getAllPlanets = async (pagination: IQueryPagination): Promise<IApiResponse<IPlanetFromApi>> => {
    const data = await fetchPlanets<IPlanetFromApi>(pagination);

    return data
}
