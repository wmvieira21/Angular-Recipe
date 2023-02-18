import { EventEmitter, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { Recipe } from "../recipes/recipe.module";
import { Ingredient } from "../shared/ingredient.module";
import * as ShoppingListActions from './store/shopping-list.actions';
import * as FromAppReducer from '../store/app.reducer';

@Injectable()

export class ShoppingListService {

    ingredientsChanged = new Subject<Ingredient[]>();
    ingredientEdit = new Subject<number>();

    private ingredients: Ingredient[] = [new Ingredient('Ingredient in memory', 10)];

    /* 
    Store<{ shoppingList: { ingredients: Ingredient[] } }
     shoppingList must be the same name difenied at AppModule
     StoreModule.forRoot({ shoppingList: shoppingListReducer })

     ingredients: must be the name of the proriety in Reducer (shoppingListReducer)
     */
    constructor(private store: Store<FromAppReducer.AppState>) { }

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number): Ingredient {
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    ingredientsToShopping(recipe: Recipe) {
        /*recipe.ingredients.forEach((ingredient) => {
            this.ingredients.push(ingredient);
        });*/
        //this.ingredients.push(...recipe.ingredients);
        //this.ingredientsChanged.next(this.ingredients.slice());

        //NGRX state control
        this.store.dispatch(new ShoppingListActions.AddIngredients(recipe.ingredients))
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        console.log("index=" + index);
        console.log(this.ingredients)
        this.ingredients.splice(index, 1);
        console.log(this.ingredients)
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}