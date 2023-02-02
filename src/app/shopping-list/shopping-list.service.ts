import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "../recipes/recipe.module";
import { Ingredient } from "../shared/ingredient.module";

export class ShoppingListService {

    ingredientsChanged = new Subject<Ingredient[]>();
    ingredientEdit = new Subject<number>();

    private ingredients: Ingredient[] = [new Ingredient('uva', 10), new Ingredient('laranja', 1)];

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
        this.ingredients.push(...recipe.ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        console.log("index=" + index);
        console.log(this.ingredients)
        this.ingredients.splice(index,1);
        console.log(this.ingredients)
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}