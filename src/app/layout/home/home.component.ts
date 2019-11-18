import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-dashboard',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [routerTransition()]
})
export class HomeComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];

    constructor() {
        this.sliders.push(
            {
                imagePath: 'assets/images/home-slider-1.jpg',
                label: 'La mejor calidad',
                text:
                    'Encuentra los mejores productos.'
            },
            {
                imagePath: 'assets/images/home-slider-2.jpg',
                label: 'El mejor diseño',
                text: 'Disfruta de la personalización total.'
            },
            {
                imagePath: 'assets/images/home-slider-3.jpg',
                label: 'La mejor potencia',
                text:
                    'Descubre el máximo poder computacional.'
            }
        );

        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            },
            {
                id: 2,
                type: 'warning',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );
    }

    ngOnInit() {}

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
