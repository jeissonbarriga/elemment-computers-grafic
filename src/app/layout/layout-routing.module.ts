import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'prefix' },
            { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
            { path: 'vendedor', loadChildren: () => import('./vendedor/vendedor.module').then(m => m.VendedorModule) },
            { path: 'comprador', loadChildren: () => import('./comprador/comprador.module').then(m => m.CompradorModule) },
            { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule) },
            { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
            { path: 'forms', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
            { path: 'bs-element', loadChildren: () => import('./bs-element/bs-element.module').then(m => m.BsElementModule) },
            { path: 'grid', loadChildren: () => import('./grid/grid.module').then(m => m.GridModule) },
            { path: 'components', loadChildren: () => import('./bs-component/bs-component.module').then(m => m.BsComponentModule) },
            { path: 'blank-page', loadChildren: () => import('./blank-page/blank-page.module').then(m => m.BlankPageModule) }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
