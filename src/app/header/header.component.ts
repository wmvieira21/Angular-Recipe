import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromAppReducer from '../store/app.reducer';
import * as fromAuthActions from '../auth/store/auth.actions';
import * as fromRecipeActions from '../recipes/store/recipe.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
    fetachDataSub: Subscription;
    isAuthenticated = false;
    storeSubcription: Subscription;

    constructor(private dataStorage: DataStorageService, private recipeService: RecipeService,
        private authService: AuthService, private store: Store<fromAppReducer.AppState>) { }

    ngOnInit(): void {
        /*this.authService.userObservable.subscribe(user => {
            this.isAuthenticated = !!user;
            console.log(user);
            console.log(!user);
            console.log(!!user);
        });*/

        //NGRX
        this.storeSubcription = this.store.select('auth').pipe(map(authState => authState.user)).subscribe(user => {
            this.isAuthenticated = !!user;
            console.log(user);
            console.log(!user);
            console.log(!!user);
        });
    }

    onSaveData() {
        //this.dataStorage.storeRecipe();
        this.store.dispatch(new fromRecipeActions.SaveData());
    }

    onFeatchData() {
        //this.fetachDataSub = this.dataStorage.getStoragedData().subscribe();
        this.store.dispatch(new fromRecipeActions.FetchData());
    }

    logout() {
        //this.authService.onLogout();
        this.store.dispatch(new fromAuthActions.Logout());
    }

    ngOnDestroy(): void {
        if (this.fetachDataSub) {
            this.fetachDataSub.unsubscribe();
        }
        if (this.storeSubcription) {
            this.storeSubcription.unsubscribe();
        }
    }

}