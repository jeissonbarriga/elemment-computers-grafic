import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompradorComponent } from './comprador.component';

const routes: Routes = [
    {
        path: '',
        component: CompradorComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompradorRoutingModule {}
