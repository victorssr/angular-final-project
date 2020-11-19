import { TextMaskModule } from 'angular2-text-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageCropperModule } from 'ngx-image-cropper';
import { NgBrazil } from 'ng-brazil';

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
    TextMaskModule,
    ImageCropperModule
  ],
  providers: [
    MoradorService,
    MoradorGuard
  ]
})
export class MoradorModule { }
