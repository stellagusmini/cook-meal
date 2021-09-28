import { Ecategory } from "./Enum";

export interface Category {
    idCategory: number;
    strCategory: Ecategory;
    strCategoryThumb: string;
    strCategoryDescription: string;
}


export interface Categories {
    categories: Category[];
}