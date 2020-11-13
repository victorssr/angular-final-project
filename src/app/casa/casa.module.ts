import { CasaGuard } from './services/casa.guard';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgBrazil } from 'ng-brazil'
import { TextMaskModule } from 'angular2-text-mask';

import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { CasaRoutingModule } from './casa.route';
import { CasaAppComponent } from './casa.app.component';
import { CasaService } from './services/casa.service';
import { EditarComponent } from './editar/editar.component';
import { CasaResolve } from './services/casa.resolve';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';

@NgModule({
  declarations: [
    CasaAppComponent,
    ListaComponent,
    NovoComponent,
    EditarComponent,
    DetalhesComponent,
    ExcluirComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CasaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgBrazil,
    TextMaskModule,
    NgxSpinnerModule
  ],
  providers: [
    CasaService,
    CasaResolve,
    CasaGuard
  ]
})
export class CasaModule { }