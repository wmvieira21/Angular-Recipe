import { Ingredient } from "../../shared/ingredient.module";
import * as ShoppingListActions from "./shopping-list.actions";

export interface StateModel {
    ingredients: Ingredient[],
    editedingredient: Ingredient,
    editedIngredientIndex: number;
}

const initialState: StateModel = {
    ingredients: [
        new Ingredient('Ingredient in memory', 10)
    ],
    editedingredient: null,
    editedIngredientIndex: -1
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions.shoppingListTypes) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:

            /*Return a new  objet with the old state (ingredients)*/
            return {

                /*Copying all the prorieties of the state (ingredients)*/
                ...state,

                /*add the ingredients
                ...state.ingredients get all the ingredients  (old state)
                action.payload: return a ingredient add a new ingredient*/
                ingredients: [...state.ingredients, action.payload]
            };

        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                /*add the ingredients
               ...state.ingredients get all the ingredients (old state)
               ...action.payload: return and array ... to get the values and add to the list*/
                ingredients: [...state.ingredients, ...action.payload]
            };
        case ShoppingListActions.UPDATE_INGREDIENT:

            const ingredient = state.ingredients[state.editedIngredientIndex];

            /*
            Example of what it's been done here:
            const updatedIngredient = { ...ingredient, ...action.payload.newIngredient };
            
            const array1 = [{ a: 1, ds: 'william', cd: 10 }];
            const array2 = [{ id: 2, ds: 'asas' }];
            const array3 = [{ id: 3, ds: '333' }];

            const updateArray1 = { ...array1, ...array2, ...array3 };
            console.log(...array1);
            console.log(...array2);
            console.log(...array3);
            console.log(updateArray1);
            result array3
            
            It'll always get the value of the last array passed updatedIngredient
            */
            const updatedIngredient = { ...ingredient, ...action.payload };

            const updatedIngredients = [...state.ingredients];

            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredientIndex: -1,
                editedingredient: null
            };
        case ShoppingListActions.DELETE_INGREDIENT:

            return {
                ...state,
                ingredients: state.ingredients.filter((ingredient, index) => {
                    return (index !== state.editedIngredientIndex);
                }),
                editedIngredientIndex: -1,
                editedingredient: null
            };
        case ShoppingListActions.START_EDITING:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                /*
                editedingredient: state.ingredients[action.payload],
                This way is a wrong approach since we're passing a referente for our array.
                So if we're altering this ingredient afterword, it'll be chaging the old state.
                
                editedingredient: { ...state.ingredients[action.payload] }
                This is the right way. We're coping the object and creating a new one.
                */
                editedingredient: { ...state.ingredients[action.payload] }

            };
        case ShoppingListActions.STOP_EDITING:
            return {
                ...state,
                editedIngredientIndex: -1,
                editedingredient: null
            };
        default:
            return state;
    }
}
