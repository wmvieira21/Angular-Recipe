import { EventEmitter } from "@angular/core";
import { Recipe } from "../recipes/recipe.module";
import { Ingredient } from "../shared/ingredient.module";

export class ShoppingListService {

    ingredientsChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

    ingredientsToShopping(recipe: Recipe) {
        /*recipe.ingredients.forEach((ingredient) => {
            this.ingredients.push(ingredient);
        });*/
        this.ingredients.push(...recipe.ingredients);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
}