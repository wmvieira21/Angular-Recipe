import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent {

    @Output('featureHeader') featureHeader = new EventEmitter<{ feature: string }>();

    onSelectFeature(feature: string) {
        this.featureHeader.emit({ feature: feature });
    }
}