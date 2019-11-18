import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompradorRoutingModule } from './comprador-routing.module';
import { CompradorComponent } from './comprador.component';
import { PageHeaderModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [CommonModule, CompradorRoutingModule, PageHeaderModule, NgbModule],
    declarations: [CompradorComponent]
})
export class CompradorModule {}
