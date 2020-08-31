import {
    Component,
    OnInit,
    ElementRef,
    Output,
    EventEmitter
} from '@angular/core';
import { OnDestroy } from '@angular/core';

@Component({
    selector: 'cq-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
    @Output() dismiss = new EventEmitter();

    constructor(private el: ElementRef) {}

    ngOnInit() {
        document.body.appendChild(this.el.nativeElement);
    }

    ngOnDestroy() {
        this.el.nativeElement.remove();
    }

    onDismissClick() {
        this.dismiss.emit();
    }
}
