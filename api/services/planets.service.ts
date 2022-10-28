import { IPlanetFromApi } from "../interfaces";
import { readPlanets } from "../repositories";

export const getAllPlanets = (): IPlanetFromApi[] => {
    const data = readPlanets();

    return data
}
