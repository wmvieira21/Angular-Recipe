import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, tap, withLatestFrom } from "rxjs";
import { Recipe } from "../recipe.module";
import * as recipeActions from './recipe.actions';
import * as appReducer from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {

    private putUrlBackEnd = "https://angularhttprequest-2d9b8-default-rtdb.firebaseio.com/recipes.json";

    fetchRecipes = createEffect(() => this.actions$.pipe(
        ofType(recipeActions.FETCH_DATA),
        switchMap((recipesData: recipeActions.FetchData) => {
            return this.http.get<Recipe[]>(this.putUrlBackEnd);
        }),
        map(recipesServe => {
            if (recipesServe) {
                return recipesServe.map(recipe => {
                    return { ...recipe, ingredients: (recipe.ingredients ? recipe.ingredients : []) }
                })
            }
            return null;
        }),
        map(recipes => {
            return new recipeActions.SetRecipes(recipes);
        })));

    /* withLatestFrom brings us ths last value of the obervable*/
    storeRecipes = createEffect(() => this.actions$.pipe(
        ofType(recipeActions.SAVE_DATA),
        withLatestFrom(this.store.select('recipe')),
        switchMap(([actionData, recipeState]) => {
            return this.http.put(this.putUrlBackEnd, recipeState.recipes);
        })
    ), { dispatch: false })

    constructor(private actions$: Actions, private http: HttpClient, private store: Store<appReducer.AppState>) { }
}