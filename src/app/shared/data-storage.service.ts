import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.module";
import { RecipeService } from "../recipes/recipe.service";
import { map, Observable, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: 'root' })

export class DataStorageService {

    private putUrlBackEnd = "https://angularhttprequest-2d9b8-default-rtdb.firebaseio.com/recipes.json";

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

    storeRecipe() {
        const recipes = this.recipeService.getRecipes();
        this.http.put(this.putUrlBackEnd, recipes).subscribe({
            next: (data) => console.log(data),
            error: (error) => console.log(error)
        })
    }

    getStoragedData(): Observable<Recipe[]> {
        /*Remember, since the observable (userObservable) is a BehaviorSubject 
        we have acess to the previously emitted user even before subscribing to it.
        
        take(1): It means that I only want to take one value from that obervable, and thereafter it 
        should automatically unsubscribe. 


        */


        this.authService.userObservable.pipe(take(1)).subscribe();

        return this.http.get<Recipe[]>(this.putUrlBackEnd).pipe(
            map(recipes => {
                /*Just in case we  featch a recipe without ingredients
                ...recipe passing all the array of recipe*/
                return recipes.map(recipe => {
                    return { ...recipe, ingredients: (recipe.ingredients ? recipe.ingredients : []) }
                })
            }),
            tap((data) => {
                this.recipeService.setRecipes(data);
            }));
    }
}