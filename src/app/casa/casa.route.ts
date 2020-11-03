import { NovoComponent } from './novo/novo.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";

import { CasaAppComponent } from './casa.app.component';
import { ListaComponent } from './lista/lista.component';

const casaRouterConfig: Routes = [
    {
        path: '', component: CasaAppComponent,
        children: [
            { path: 'lista', component: ListaComponent },
            { path: 'novo', component: NovoComponent },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(casaRouterConfig)
    ],
    exports: [
        RouterModule
    ]
})
export class CasaRoutingModule { }