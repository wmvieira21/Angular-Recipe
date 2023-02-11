import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.module';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
    fetachDataSub: Subscription;
    isAuthenticated = false;

    constructor(private dataStorage: DataStorageService, private recipeService: RecipeService,
        private authService: AuthService) { }

    ngOnInit(): void {
        this.authService.userObservable.subscribe(user => {
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
        this.authService.onLogout();
    }

    ngOnDestroy(): void {
        this.fetachDataSub.unsubscribe();
    }

}