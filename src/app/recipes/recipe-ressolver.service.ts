import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterState, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Observable, of, switchMap, take } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.module";
import { RecipeService } from "./recipe.service";
import * as fromAppReducer from '../store/app.reducer';
import * as fromRecipeActions from '../recipes/store/recipe.actions';
import { Actions, ofType } from "@ngrx/effects";

@Injectable({ providedIn: 'root' })

export class RecipeRessolverService implements Resolve<Recipe[]>{

    constructor(private dataStorage: DataStorageService, private recipeService: RecipeService,
        private store: Store<fromAppReducer.AppState>, private actions$: Actions) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> {
        /*It's not necessary to subscrite to the observable getStoragedData. The ressolve gard will be doing that.
        
        IMPORTANT: This guard is essencial to featch the data whenever we load 
        the pages (http://localhost:4200/recipes/4 or http://localhost:4200/recipes/4/edit) again*/

        //if (this.recipeService.getRecipes().length === 0) {
        //return this.dataStorage.getStoragedData();
        return this.store.select('recipe').pipe(
            take(1),
            map(dataState => {
                return dataState.recipes;
            }),
            switchMap(recipes => {
                if (recipes.length === 0) {
                    this.store.dispatch(new fromRecipeActions.FetchData());
                    return this.actions$.pipe(ofType(fromRecipeActions.SET_RECIPES), take(1));
                } else {
                    return of<Recipe[]>(recipes);
                }
            }));
    }
}