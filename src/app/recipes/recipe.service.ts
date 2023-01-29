import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.module";
import { Recipe } from "./recipe.module";

export class RecipeService {
    /*No longer neded since we're using routing now
    selectedRecipeService = new EventEmitter<Recipe>();*/

    private recipes: Recipe[] = [
        new Recipe('Nhoque', 'Nhoque good',
            'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
            [new Ingredient('Pasta', 1),
            new Ingredient('Tomate', 5)]),
        new Recipe('Burger', 'Burger vegetarian',
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
            [new Ingredient('Soy meat', 1),
            new Ingredient('Buns', 2)])
    ];

    getRecipes() {
        return this.recipes.slice(); /*slice() Not passing the reference, but a copy of recipes*/
    }

    getRecipeById(index: number): Recipe {
        return this.recipes[index];
    }
}