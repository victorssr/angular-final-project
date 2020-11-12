import { DetalhesComponent } from './detalhes/detalhes.component';
import { CasaResolve } from './services/casa.resolve';
import { EditarComponent } from './editar/editar.component';
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
            {
                path: 'editar/:id', component: EditarComponent,
                resolve: {
                    casa: CasaResolve
                }
            },
            {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    casa: CasaResolve
                }
            },
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