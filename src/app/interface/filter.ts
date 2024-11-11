export interface Filter {
    id: string;
    name: string;
}

export const ALL_FILTER: Filter[] = [
    { id: "ordenar", name: "Ordenar" },
    { id: "género", name: "Género"},
    { id: "rol", name: "Rol"},
    { id: "papeleta", name: "Papeleta"},
    { id: "provincia", name: "Provincia"},
    { id: "circunscripción", name: "Circunscripción"},
    { id: "cantón", name: "Cantón"},
    { id: "parroquia", name: "Parroquia"},
    { id: "zona", name: "Zona"},
    { id: "recinto", name: "Recinto"},
    { id: "estatus", name: "Estatus"},
    { id: "estadoActa", name: "Estado"},
    { id: "estadoJunta", name: "Estado"},
    { id: "mostrar", name: "Mostrando"}
];

export const PAGE_FILTERS = {
    "General": ["provincia", "circunscripción", "cantón", "parroquia", "zona", "recinto"],
    "actasGeneral": ["papeleta", "provincia", "circunscripción", "cantón", "parroquia", "zona", "recinto"],
    "actasContol": ["provincia", "circunscripción", "cantón", "parroquia", "zona", "recinto", "estadoActa"],
    "usuaiosControl": ["ordenar", "género", "rol", "provincia", "circunscripción", "cantón", "parroquia", "zona", "recinto", "estatus"],
    "incripcionesUsuarios": ["ordenar", "género", "provincia", "cantón", "parroquia", "recinto"],
    "territorios": ["estadoJunta"],
    "cantidad": ["mostrar"]
}