import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipes/recipe.module';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnDestroy {
    fetachDataSub: Subscription;

    constructor(private dataStorage: DataStorageService, private recipeService: RecipeService) { }

    onSaveData() {
        this.dataStorage.storeRecipe();
    }

    onFeatchData() {
        this.fetachDataSub = this.dataStorage.getStoragedData().subscribe();
    }
    ngOnDestroy(): void {
        this.fetachDataSub.unsubscribe();
    }

}