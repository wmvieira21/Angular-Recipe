import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.module";

export const FETCH_DATA = '[Recipe] FETCH_DATA';
export const SET_RECIPES = '[Recipe] SET_RECIPES';
export const ADD_RECIPE = '[Recipe] ADD_RECIPE';
export const UPDATE_RECIPE = '[Recipe] UPDATE_RECIPE';
export const DELETE_RECIPE = '[Recipe] DELETE_RECIPE';
export const SAVE_DATA = '[Recipe] SAVE_DATA';

export class FetchData implements Action {
    readonly type = FETCH_DATA;
}

export class SetRecipes implements Action {
    readonly type = SET_RECIPES;

    constructor(public payload: Recipe[]) { }
}

export class AddRecipe implements Action {
    readonly type = ADD_RECIPE;

    constructor(public payload: Recipe) { }
}

export class UpdateRecipe implements Action {
    readonly type = UPDATE_RECIPE;

    constructor(public payload: { index: number, recipe: Recipe }) { }
}

export class DeleteRecipe implements Action {
    readonly type = DELETE_RECIPE;

    constructor(public payload: number) { }
}

export class SaveData implements Action {
    readonly type = SAVE_DATA;
}

export type RecipeActionTypes = SetRecipes | UpdateRecipe |
    FetchData | AddRecipe | DeleteRecipe | SaveData;
