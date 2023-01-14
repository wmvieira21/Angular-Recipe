import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  ieRecipesTab: boolean = true;

  onSelectTab(event: { feature: string }) {
    this.ieRecipesTab = (event.feature === 'recipes');
  }
}
