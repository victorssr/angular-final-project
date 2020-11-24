import { ToastrService } from 'ngx-toastr';
import { MoradorService } from './../services/morador.service';
import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormGroup, AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControlName } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { NgBrazilValidators } from 'ng-brazil';

import { environment } from './../../../environments/environment';
import { StringUtils } from './../../utils/string-utils';
import { Moradia } from './../models/morador';
import { MoradorFormBaseComponent } from '../morador-form.base.component';

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html'
})
export class EdicaoComponent extends MoradorFormBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  moradias: Moradia[];
  edicaoFormGroup: FormGroup;

  urlImages: string = environment.urlImages;
  currentImagePath: string;

  selectedImageBase64: string;
  selectedImagePreview: string;
  selectedImageName: string;

  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private moradorService: MoradorService,
    private toastr: ToastrService,
    private route: Router) {

    super();

    this.morador = this.activatedRoute.snapshot.data['morador'];
    this.moradias = this.activatedRoute.snapshot.data['moradias'];
  }

  ngOnInit(): void {
    this.edicaoFormGroup = this.formBuilder.group({
      casaId: ['', [Validators.required]],
      nomeCompleto: ['', [Validators.required]],
      receitaMensal: ['', [Validators.required, NgBrazilValidators.currency]],
      contribuicao: ['', [Validators.required, NgBrazilValidators.currency]],
      foto: [''],
      dataNascimento: ['', [Validators.required]],
      tipoMorador: ['', [Validators.required]],
      tipoDocumento: ['', [Validators.required]],
      documento: ['', [Validators.required, NgBrazilValidators.cpf]],
    });

    this.preencherValores();

    this.currentImagePath = this.urlImages + '/imagens/' + this.morador.foto;
  }

  preencherValores() {
    this.edicaoFormGroup.patchValue({
      casaId: this.morador.casaId,
      nomeCompleto: this.morador.nomeCompleto,
      foto: this.morador.foto,
      receitaMensal: StringUtils.formatNumberToMask(this.morador.receitaMensal),
      contribuicao: StringUtils.formatNumberToMask(this.morador.contribuicao),
      dataNascimento: this.datePipe.transform(this.morador.dataNascimento, 'yyyy-MM-dd'),
      tipoMorador: this.morador.tipoMorador.toString(),
      tipoDocumento: this.morador.tipoDocumento.toString(),
      documento: this.morador.documento,
    });
  }

  ngAfterViewInit(): void {
    super.setControlBlurs(this.formInputElements, this.edicaoFormGroup, this.tipoDocumentoForm(), this.documentoForm());
  }

  tipoDocumentoForm(): AbstractControl {
    return this.edicaoFormGroup.get('tipoDocumento');
  }

  documentoForm(): AbstractControl {
    return this.edicaoFormGroup.get('documento');
  }

  fotoFileChanged(file: any) {
    this.selectedImageName = file[0].name;

    const fileReader = new FileReader();
    fileReader.onload = this.fileReaderLoad.bind(this);
    fileReader.readAsBinaryString(file[0]);
  }

  fileReaderLoad(readerEvent: any) {
    const binaryString = readerEvent.target.result;

    this.selectedImageBase64 = btoa(binaryString);
    this.selectedImagePreview = "data:image/jpeg;base64," + this.selectedImageBase64;
  }

  salvar() {
    if (this.edicaoFormGroup.dirty && this.edicaoFormGroup.valid) {
      this.morador = Object.assign({}, this.morador, this.edicaoFormGroup.value);

      this.morador.documento = StringUtils.somenteNumeros(this.morador.documento);
      this.morador.contribuicao = StringUtils.currencyStringToNumber(this.morador.contribuicao.toString());
      this.morador.receitaMensal = StringUtils.currencyStringToNumber(this.morador.receitaMensal.toString());

      this.morador.tipoDocumento = +this.morador.tipoDocumento;
      this.morador.tipoMorador = +this.morador.tipoMorador;

      if (this.selectedImageBase64) {
        this.morador.fotoImagem = this.selectedImageBase64;
        this.morador.foto = this.selectedImageName;
      }

      this.moradorService.atualizar(this.morador)
        .subscribe(
          success => this.processarSucesso(success),
          fail => this.processarFalha(fail)
        );
    }
  }

  processarSucesso(response: any) {
    const activeToast = this.toastr.success('Morador atualizado com sucesso.', 'Sucesso!');

    activeToast.onHidden.subscribe(() => this.route.navigate(['/morador/lista']));
  }

  processarFalha(fail: any) {
    if (fail.error.errors) {
      this.errors = fail.error.errors;
    }

    this.toastr.error('Não foi possível atualizar os dados do morador.', 'Ocorreu um problema!');
  }
}