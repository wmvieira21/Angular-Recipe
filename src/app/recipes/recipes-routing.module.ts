import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../auth/auth.guard.service";
import { NoneItemSelectedComponent } from "./none-item-selected/none-item-selected.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeRessolverService } from "./recipe-ressolver.service";
import { RecipesComponent } from "./recipes.component";

const appRoutes: Routes = [{
    /*When using Lazy loading the recipes route will be defined at the main routing file (AppRoutingModule).
    Here in the child routes the main route should be '' */
    
    //path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], children: [
    path: '', component: RecipesComponent, canActivate: [AuthGuard], children: [
        { path: '', component: NoneItemSelectedComponent },
        { path: 'new', component: RecipeEditComponent },
        { path: ':id', component: RecipeDetailComponent, resolve: [RecipeRessolverService] },
        { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeRessolverService] }
        /*IMPORTANT the order of the routing is super important. Routers with param (ex: id)
        must be at the end of the array*/
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})

export class RecipesRoutingModule {

}