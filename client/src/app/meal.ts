export class Meal {
    ingredients: Ingredient[];
    calories: number
    title: string;
    img: string;
}

export class Ingredient{
    name: string;
    qty: number;
    uom: string;
}