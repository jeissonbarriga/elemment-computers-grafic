import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormBuilder } from '@angular/forms';
import { HashMap, ChainNode } from 'src/app/data-structures/hash-map';
import { User } from 'src/app/data-structures/user';

@Component({
    selector: 'app-analytics',
    templateUrl: './analytics.component.html',
    styleUrls: ['./analytics.component.scss'],
    animations: [routerTransition()]
})
export class AnalyticsComponent implements OnInit {
    compraForm;
    usuarios: User[];

    constructor(private formBuilder: FormBuilder, private hashMap: HashMap) {
        this.usuarios = [];
        this.compraForm = this.formBuilder.group({
            usuario: ''
        });
    }

    ngOnInit() {

    }

    onSubmit(compraData) {
        this.hashMap.set(compraData.usuario.toLowerCase());
        this.actualizarTabla();
        this.compraForm.reset();
    }

    actualizarTabla() {
        let map = this.hashMap.map;
        this.usuarios = [];
        for(let i = 0; i < map.length; i++) {
            let chainNode: ChainNode = map[i];
            if(chainNode != null){
                while(chainNode != null) {
                    this.usuarios.push(new User(chainNode.key, chainNode.value));
                    chainNode = chainNode.next;
                }
            }
            
        }
    }
}
