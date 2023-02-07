import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.module";
import { RecipeService } from "../recipes/recipe.service";
import { map, Observable, tap } from "rxjs";

@Injectable({ providedIn: 'root' })

export class DataStorageService {

    private putUrlBackEnd = "https://angularhttprequest-2d9b8-default-rtdb.firebaseio.com/recipes.json";

    constructor(private http: HttpClient, private recipeService: RecipeService) { }

    storeRecipe() {
        const recipes = this.recipeService.getRecipes();
        this.http.put(this.putUrlBackEnd, recipes).subscribe({
            next: (data) => console.log(data),
            error: (error) => console.log(error)
        })
    }

    getStoragedData() : Observable<Recipe[]> {
        return this.http.get<Recipe[]>(this.putUrlBackEnd).pipe(
            map(recipes => {
                /*Just in case we  featch a recipe without ingredients*/
                return recipes.map(recipe => {
                    return { ...recipe, ingredients: (recipe.ingredients ? recipe.ingredients : []) }
                })
            }),
            tap((data) => {
                this.recipeService.setRecipes(data);
            }));
    }
}