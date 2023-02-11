import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterState, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.module";
import { RecipeService } from "./recipe.service";

@Injectable({ providedIn: 'root' })

export class RecipeRessolverService implements Resolve<Recipe[]>{

    constructor(private dataStorage: DataStorageService, private recipeService: RecipeService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        /*It's not necessairy to subscrite to the observabel getStoragedData. The ressolve gard will be doing that.
        
        IMPORTANT: This guard is essencial to featch the data whenever we load 
        the pages (http://localhost:4200/recipes/4 or http://localhost:4200/recipes/4/edit) again*/
        if (this.recipeService.getRecipes().length === 0) {
            return this.dataStorage.getStoragedData();
        }
    }
}