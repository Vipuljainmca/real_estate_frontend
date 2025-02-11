export interface Option {
    id: number;
    name: string;
    value: string;
}

export const categories: Option[] = [
    { id: 1, name: "Residential", value: "Residential" },
    { id: 2, name: "Commercial", value: "Commercial" },
    { id: 3, name: "Land", value: "Land" }
];

export const availability: Option[] = [
    { id: 1, name: "Yes", value: "Yes" },
    { id: 2, name: "No", value: "No" }
];