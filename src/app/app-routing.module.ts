import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { ErrorComponent } from "./error/error.component";
import { NoneItemSelectedComponent } from "./recipes/none-item-selected/none-item-selected.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeRessolverService } from "./recipes/recipe-ressolver.service";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRouter: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    {
        path: 'recipes', component: RecipesComponent, children: [
            { path: '', component: NoneItemSelectedComponent },
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipeDetailComponent, resolve: [RecipeRessolverService] },
            { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeRessolverService] }

            /*IMPORTANT the order of the routing is super important. Routers with param (ex: id)
            must be at the end of the array*/
        ]
    },

    {
        path: 'shopping-list/edit', component: ShoppingListComponent
    },
    { path: 'auth', component: AuthComponent },


    { path: 'not-found', component: ErrorComponent, data: { messageError: 'Page not found' } },
    { path: '**', redirectTo: '/not-found' }
];


@NgModule({
    imports: [
        RouterModule.forRoot(appRouter)
    ],
    exports: [RouterModule]
})


export class AppRoutingModule {

}