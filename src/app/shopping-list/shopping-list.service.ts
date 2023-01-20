import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.module";

export class ShoppingListService {
    
    ingredientsChanged = new EventEmitter<Ingredient[]>();
    
    private ingredients: Ingredient[] = [
        new Ingredient('Potato', 5),
        new Ingredient('tomatos', 15)];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
}