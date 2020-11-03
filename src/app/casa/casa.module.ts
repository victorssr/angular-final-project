import { HttpClientModule } from '@angular/common/http';
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

@NgModule({
  declarations: [
    CasaAppComponent,
    ListaComponent,
    NovoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CasaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgBrazil,
    TextMaskModule
  ],
  providers: [
    CasaService
  ]
})
export class CasaModule { }