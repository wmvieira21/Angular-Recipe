import { Recipe } from "../recipe.module";
import * as RecipeActions from './recipe.actions';

export interface StateModel {
    recipes: Recipe[]
}

export const initialState: StateModel = {
    recipes: []
}

export function recipeRecucer(state = initialState, action: RecipeActions.RecipeActionTypes) {
    switch (action.type) {
        case RecipeActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            }
        case RecipeActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            }
        case RecipeActions.UPDATE_RECIPE:
            //Second param will overwrite the first one;
            const recipeUpdated = {
                ...state.recipes[action.payload.index],
                ...action.payload.recipe
            };

            const recipesList = [...state.recipes];
            recipesList[action.payload.index] = recipeUpdated;

            return {
                ...state,
                recipes: recipesList
            }
        case RecipeActions.DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter((recipe, index) => {
                    return action.payload !== index;
                })
            }
        default:
            return {
                ...state
            }
    }
}