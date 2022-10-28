import { IPerson } from "../interfaces";
import { sortingBy } from "../utils";
import { readPeople } from "./../repositories";

export const getAllPeople = (sortBy?: string): IPerson[] => {
    const people = readPeople();
    if (sortBy) {
        sortingBy(people, sortBy)
    }

    return people;
}




