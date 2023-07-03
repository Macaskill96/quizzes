export interface ICategory {
    id: number;
    name: string;
}

export interface ICategoryData {
    trivia_categories: ICategory[];
}