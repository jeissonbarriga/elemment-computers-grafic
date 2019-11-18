import { Component, OnInit } from '@angular/core';
import { Product } from './data-structures/product';
import { DoubleLinkedList } from './data-structures/double-linked-list';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
        let productos: DoubleLinkedList<Product> = new DoubleLinkedList<Product>();
        localStorage.setItem("productos", JSON.stringify(productos));
    }
}
