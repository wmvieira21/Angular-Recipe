import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.module";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const START_EDITING = 'START_EDITING';
export const STOP_EDITING = 'STOP_EDITING';

export class AddIngredient implements Action {

    readonly type = ADD_INGREDIENT;

    constructor(public payload: Ingredient) { }
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;

    constructor(public payload: Ingredient[]) { }
}

export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT;

    constructor(public payload: Ingredient) { }
}

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;
}

export class StarEditing implements Action {
    readonly type = START_EDITING;

    constructor(public payload: number) { }
}

export class StopEditing implements Action {
    readonly type = STOP_EDITING;
}


export type shoppingListTypes = AddIngredient |
    AddIngredients |
    UpdateIngredient |
    DeleteIngredient |
    StarEditing |
    StopEditing;