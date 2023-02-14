import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const appRouter: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },

    /*Lazy loading. RecipesModule will only be loaded if the route is activated*/
    { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(c => c.RecipesModule) },
    { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(c => c.ShoppingListModule) },
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(c => c.AuthModule) }


    /*{ path: 'not-found', component: ErrorComponent, data: { messageError: 'Page not found' } },
{ path: '**', redirectTo: '/not-found' }*/
];


@NgModule({
    imports: [
        RouterModule.forRoot(appRouter, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})


export class AppRoutingModule {

}