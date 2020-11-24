import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';

import { Observable, fromEvent, merge } from 'rxjs';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { NgBrazilValidators } from 'ng-brazil';

import { StringUtils } from './../../utils/string-utils';
import { MoradorService } from './../services/morador.service';
import { MoradorFormBaseComponent } from './../morador-form.base.component';
import { Moradia } from '../models/morador';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends MoradorFormBaseComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  imageUrl: string = '';
  imageName: string = '';
  canvasRotation = 0;

  moradias: Moradia[];

  novoFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private moradorService: MoradorService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute) {
      
    super();

    this.moradias = this.activatedRoute.snapshot.data['moradias'];
  }

  ngOnInit(): void {
    this.novoFormGroup = this.formBuilder.group({
      casaId: ['', [Validators.required]],
      nomeCompleto: ['', [Validators.required]],
      receitaMensal: ['', [Validators.required, NgBrazilValidators.currency]],
      contribuicao: ['', [Validators.required, NgBrazilValidators.currency]],
      foto: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      tipoMorador: ['', [Validators.required]],
      tipoDocumento: ['', [Validators.required]],
      documento: ['', [Validators.required, NgBrazilValidators.cpf]],
    });

    this.novoFormGroup.patchValue({
      tipoMorador: '0',
      tipoDocumento: '0'
    });
  }

  ngAfterViewInit(): void {
    super.setControlBlurs(this.formInputElements, this.novoFormGroup, this.tipoDocumentoForm(), this.documentoForm())
  }

  tipoDocumentoForm(): AbstractControl {
    return this.novoFormGroup.get('tipoDocumento');
  }

  documentoForm(): AbstractControl {
    return this.novoFormGroup.get('documento');
  }

  salvar() {
    if (this.novoFormGroup.dirty && this.novoFormGroup.valid) {
      this.morador = Object.assign({}, this.morador, this.novoFormGroup.value);

      this.morador.foto = this.imageName;
      this.morador.fotoImagem = this.croppedImage.split(',')[1];

      this.morador.documento = StringUtils.somenteNumeros(this.morador.documento);

      this.morador.tipoDocumento = +this.morador.tipoDocumento;
      this.morador.tipoMorador = +this.morador.tipoMorador;

      this.morador.receitaMensal = StringUtils.currencyStringToNumber(this.morador.receitaMensal.toString());
      this.morador.contribuicao = StringUtils.currencyStringToNumber(this.morador.contribuicao.toString());

      this.moradorService.cadastrar(this.morador)
        .subscribe(
          sucesso => this.processarSucesso(sucesso),
          falha => this.processarFalha(falha)
        );
    }
  }

  processarSucesso(response: any) {
    this.errors = [];
    this.alteracaoNaoSalva = false;
    this.novoFormGroup.reset();
    this.croppedImage = '';
    this.showCropper = false;

    this.toastr.success('Morador cadastrado com sucesso.', 'Sucesso!');
  }

  processarFalha(fail: any) {
    if (fail.error.errors) {
      this.errors = fail.error.errors;
    }

    this.toastr.error('Não foi possível cadastrar o morador.', 'Ocorreu um problema!');
  }

  fotoFileChanged(event: any): void {
    this.imageChangedEvent = event;
    this.imageName = event.currentTarget.files[0].name;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    this.showCropper = true;
  }

  cropperReady() {
  }

  loadImageFailed() {
    this.errors.push(`O formato do arquivo ${this.imageName} não é aceito.`)
  }
}