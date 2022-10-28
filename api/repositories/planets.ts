import { IPlanetFromApi } from "../interfaces";
import { readFile } from "../utils";

export const readPlanets = ():IPlanetFromApi[]  => {
    const planets = readFile<IPlanetFromApi>('planets.json');
    if(!planets){
        throw new Error("Error reading file.");
    }

    return planets
}