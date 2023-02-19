import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromAppReducer from '../store/app.reducer';
import * as fromAuthActions from '../auth/store/auth.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
    fetachDataSub: Subscription;
    isAuthenticated = false;

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
        this.store.select('auth').pipe(map(authState => authState.user)).subscribe(user => {
            this.isAuthenticated = !!user;
            console.log(user);
            console.log(!user);
            console.log(!!user);
        });
    }

    onSaveData() {
        this.dataStorage.storeRecipe();
    }

    onFeatchData() {
        this.fetachDataSub = this.dataStorage.getStoragedData().subscribe();
    }

    logout() {
        //this.authService.onLogout();
        this.store.dispatch(new fromAuthActions.Logout());
    }

    ngOnDestroy(): void {
        this.fetachDataSub.unsubscribe();
    }

}