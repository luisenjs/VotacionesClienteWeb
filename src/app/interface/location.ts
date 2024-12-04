export interface Ciudad {
    nombre: string;
    recintos: string[];
}

export interface Canton {
    nombre: string;
    ciudades: Ciudad[];
}

export interface Provincia {
    nombre: string;
    cantones: Canton[];
}
