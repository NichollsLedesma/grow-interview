import { IPerson } from "../interfaces";
import { readFile } from "../utils";

export const readPeople = ():IPerson[]  => {
    const people = readFile<IPerson>('people.json');
    if(!people){
        throw new Error("Error reading file.");
    }

    return people
}