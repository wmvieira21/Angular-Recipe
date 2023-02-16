import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.module";
import * as ShoppingListActions from "./shopping-list.actions";

const initialState = {
    ingredients: [
        new Ingredient('Ingredient in memory', 10)
    ]
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredient) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:

            /*Return a new  objet with the old state (ingredients)*/
            return {

                /*Copying all the prorieties of the state (ingredients)*/
                ...state,

                /*Overwirting the ingredients*/
                ingredients: [...state.ingredients, action.payload]
            };
        default:
            return state;
    }
}
