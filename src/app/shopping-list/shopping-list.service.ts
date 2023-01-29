import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "../recipes/recipe.module";
import { Ingredient } from "../shared/ingredient.module";

export class ShoppingListService {

    ingredientsChanged = new Subject<Ingredient[]>();

    private ingredients: Ingredient[] = [];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    ingredientsToShopping(recipe: Recipe) {
        /*recipe.ingredients.forEach((ingredient) => {
            this.ingredients.push(ingredient);
        });*/
        this.ingredients.push(...recipe.ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}