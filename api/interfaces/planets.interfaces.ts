interface IPlanetBase {
    name: string;
    climate: string;
    terrain: string;
    residents: string[];
    films: string[];
    url: string;
}

export interface IPlanetFromApi extends IPlanetBase {
    diameter: string;
    gravity: string;
    rotation_period: string;
    orbital_period: string;
    surface_water: string;
    population: string;
    created: string;
    edited: string;
}
