 interface IPersonBase {
    name: string;
    hair_color: string;
    skin_color: string
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld:  string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    url: string;
}

export interface IPersonFromApi extends IPersonBase {
    height: string;
    mass: string;
    created: string,
    edited: string,
}

export interface IPerson extends IPersonBase {
    height: number;
    mass: number;
    created: Date,
    edited: Date,
}