import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-comprador',
    templateUrl: './comprador.component.html',
    styleUrls: ['./comprador.component.scss'],
    animations: [routerTransition()]
})
export class CompradorComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
