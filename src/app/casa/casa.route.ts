import { CasaGuard } from './services/casa.guard';
import { ExcluirComponent } from './excluir/excluir.component';
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
            {
                path: 'novo', component: NovoComponent,
                canActivate: [CasaGuard],
                canDeactivate: [CasaGuard],
                data: [{ claim: 'Casas', value: 'Adicionar' }]
            },
            {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [CasaGuard],
                resolve: {
                    casa: CasaResolve
                },
                data: [{ claim: 'Casas', value: 'Atualizar' }]
            },
            {
                path: 'detalhes/:id', component: DetalhesComponent,
                canActivate: [CasaGuard],
                resolve: {
                    casa: CasaResolve
                },
                data: [{ claim: 'Casas', value: 'Detalhe' }]
            },
            {
                path: 'excluir/:id', component: ExcluirComponent,
                canActivate: [CasaGuard],
                resolve: {
                    casa: CasaResolve
                },
                data: [{ claim: 'Casas', value: 'Excluir' }]
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