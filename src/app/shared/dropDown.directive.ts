import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appDropDown]'
})

export class DropDownDirective {
    @HostBinding('class.open') isOpen = false;

    constructor(private elementRef: ElementRef, private vcRef: Renderer2) { }

    @HostListener('click') toggleOpen(eventDate: Event) {
        this.isOpen = !this.isOpen;
    }
}