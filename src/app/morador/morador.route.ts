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