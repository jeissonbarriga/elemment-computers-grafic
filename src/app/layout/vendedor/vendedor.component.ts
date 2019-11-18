import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Product } from 'src/app/data-structures/product';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DoubleLinkedList } from 'src/app/data-structures/double-linked-list';

@Component({
    selector: 'app-vendedor',
    templateUrl: './vendedor.component.html',
    styleUrls: ['./vendedor.component.scss'],
    animations: [routerTransition()]
})
export class VendedorComponent implements OnInit {
    productos: DoubleLinkedList<Product>;
    productForm;

    id_producto_editar: number;

    constructor(private formBuilder: FormBuilder, private list: DoubleLinkedList<Product>) { 
        this.productForm = this.formBuilder.group({
            name: '',
            price: '',
            description: ''
        });
        
        this.id_producto_editar = -1;
    }

    ngOnInit() {
        this.productos = new DoubleLinkedList<Product>();
        //this.productos = JSON.parse(localStorage.getItem("productos"));
        console.log(localStorage.getItem("productos"));
    }

    editar(product: Product) {
        this.productForm.patchValue({
            name: product.name,
            price: product.price,
            description: product.description
        });
        
        this.id_producto_editar = product.id;
    }

    eliminar(product: Product) {
        let current_node = this.productos.head;
        while(current_node != null){
            if(current_node.key.id == product.id) {
                this.productos.remove(current_node);
                return;
            }
            current_node = current_node.next;
        }
    }

    onSubmit(productData) {
        if(this.id_producto_editar == -1) {
            let product = new Product(this.productos.size, productData.name);
            product.price = productData.price;
            product.description = productData.description;

            this.productos.pushFront(product);
        } else {
            let product = this.productos[this.id_producto_editar];
            product.name = productData.name;
            product.price = productData.price;
            product.description = productData.description;
            this.id_producto_editar = -1;
        }
        

        localStorage.setItem("productos", JSON.stringify(this.productos));
        this.productForm.reset();
    }
}
