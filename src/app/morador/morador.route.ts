import { ExclusaoComponent } from './exclusao/exclusao.component';
import { MoradiaResolve } from './services/moradia.resolve';
import { MoradorResolve } from './services/morador.resolve';
import { EdicaoComponent } from './edicao/edicao.component';
import { NovoComponent } from './novo/novo.component';
import { MoradorGuard } from './services/morador.guard';
import { ListaComponent } from './lista/lista.component';
import { MoradorAppComponent } from './morador.app.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const routeConfig: Routes = [
    {
        path: '', component: MoradorAppComponent,
        children: [
            {
                path: 'lista', component: ListaComponent, canActivate: [MoradorGuard]
            },
            {
                path: 'novo', component: NovoComponent, canActivate: [MoradorGuard],
                data: [
                    { claim: 'Moradores', value: 'Adicionar' }
                ]
            },
            {
                path: 'edicao/:id', component: EdicaoComponent, canActivate: [MoradorGuard],
                data: [
                    { claim: 'Moradores', value: 'Adicionar' }
                ],
                resolve: {
                    morador: MoradorResolve,
                    moradias: MoradiaResolve
                }
            },
            {
                path: 'exclusao/:id', component: ExclusaoComponent, canActivate: [MoradorGuard],
                data: [
                    { claim: 'Moradores', value: 'Excluir' }
                ],
                resolve: {
                    morador: MoradorResolve
                }
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routeConfig)
    ],
    exports: [
        RouterModule
    ]
})
export class MoradorRoutingModule { }