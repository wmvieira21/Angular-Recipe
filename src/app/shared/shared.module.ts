import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertBox } from "./alert/alert.component";
import { DropDownDirective } from "./dropDown.directive";
import { PlaceHolderDirective } from "./placeholder/placeholder.directive";
import { SpinnerComponent } from "./spinner/spinner.component";

@NgModule({
    declarations: [
        DropDownDirective,
        AlertBox,
        PlaceHolderDirective,
        SpinnerComponent
    ],
    imports: [CommonModule],
    exports: [
        DropDownDirective,
        AlertBox,
        PlaceHolderDirective,
        SpinnerComponent,
        CommonModule
    ]
})

export class SharedModule { }