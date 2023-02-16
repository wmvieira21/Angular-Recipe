import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.module";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';

export class AddIngredient implements Action {

    readonly type = ADD_INGREDIENT;

    constructor(public payload: Ingredient) { }
}

export class AddIngredients implements Action {
    type = ADD_INGREDIENTS;

    constructor(public payload: Ingredient[]) { }
}

export type shoppingListTypes = AddIngredient | AddIngredients;