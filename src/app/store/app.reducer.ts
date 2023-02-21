import * as FromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as FromAuth from '../auth/store/auth.reducer';
import * as FromRecipe from '../recipes/store/recipe.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    shoppingList: FromShoppingList.StateModel;
    auth: FromAuth.StateModel;
    recipe: FromRecipe.StateModel;
}

export const appRecuderMap: ActionReducerMap<AppState> = {
    shoppingList: FromShoppingList.shoppingListReducer,
    auth: FromAuth.authRecuder,
    recipe: FromRecipe.recipeRecucer
}