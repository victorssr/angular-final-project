import { TextMaskModule } from 'angular2-text-mask';
import { NgBrazil } from 'ng-brazil';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoradorService } from './services/morador.service';
import { MoradorGuard } from './services/morador.guard';
import { MoradorRoutingModule } from './morador.route';
import { MoradorAppComponent } from './morador.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';

@NgModule({
  declarations: [
    MoradorAppComponent,
    ListaComponent,
    NovoComponent
  ],
  imports: [
    CommonModule,
    MoradorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgBrazil,
    TextMaskModule
  ],
  providers: [
    MoradorService,
    MoradorGuard
  ]
})
export class MoradorModule { }
