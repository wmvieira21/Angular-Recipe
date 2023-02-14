import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})

export class AlertBox {
    @Input() message;
    @Output() closeEventEmitter = new EventEmitter<void>();
    
    onclose() {
        this.closeEventEmitter.emit();
    }
}