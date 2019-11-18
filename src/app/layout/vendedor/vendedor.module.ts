import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendedorRoutingModule } from './vendedor-routing.module';
import { VendedorComponent } from './vendedor.component';
import { PageHeaderModule, SharedPipesModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ValuesPipe } from 'src/app/shared/pipes/values.pipe';

@NgModule({
    imports: [CommonModule, VendedorRoutingModule, PageHeaderModule, NgbModule, ReactiveFormsModule],
    declarations: [VendedorComponent, ValuesPipe]
})
export class VendedorModule {}
