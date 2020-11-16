import { NgBrazilValidators, MASKS } from 'ng-brazil';
import { FormGroup, FormBuilder, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';

import { Observable, fromEvent, merge } from 'rxjs';

import { Moradia } from '../models/morador';
import { MoradorService } from './../services/morador.service';
import { ValidationMessages, DisplayMessage, GenericValidator } from './../../utils/generic-form-validation';
@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  MASKS = MASKS;
  moradias: Moradia[] = [];

  novoFormGroup: FormGroup;
  alteracaoNaoSalva: Boolean = false;
  textoDocumento: string = "CPF (Requerido)";
  errors: string[] = [];

  validationMessage: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(private formBuilder: FormBuilder,
    private moradorService: MoradorService) {
    this.validationMessage = {
      casaId: {
        required: 'Selecione a casa do morador'
      },
      nomeCompleto: {
        required: 'Informe o nome completo'
      },
      receitaMensal: {
        required: 'Informe a receita mensal',
        currency: 'O valor informado é inválido'
      },
      contribuicao: {
        required: 'Informe a contribuição mensal',
        currency: 'O valor informado é inválido'
      },
      foto: {
        required: 'Informe a foto'
      },
      dataNascimento: {
        required: 'Informe a data de nascimento'
      },
      tipoMorador: {
        required: 'Informe o tipo'
      },
      documento: {
        required: 'Informe o documento',
        cpf: 'O CPF informado não é válido',
        cnpj: 'O CNPJ informado não é válido'
      },
      tipoDocumento: {
        required: 'Informe o tipo de documento'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessage);
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

    this.moradorService.obterMoradias()
      .subscribe(response => this.moradias = response);
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControlElement: ElementRef) => fromEvent(formControlElement.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.trocarValidacaoDocumento();
      this.processarMensagens();
    });
  }

  processarMensagens() {
    this.alteracaoNaoSalva = true;
    this.displayMessage = this.genericValidator.processarMensagens(this.novoFormGroup);
  }

  trocarValidacaoDocumento() {
    if (this.tipoDocumentoForm().value === '1') {
      this.documentoForm().clearValidators();
      this.documentoForm().setValidators([Validators.required, NgBrazilValidators.cnpj]);
      this.textoDocumento = "CNPJ (Requerido)";
    }
    else {
      this.documentoForm().clearValidators();
      this.documentoForm().setValidators([Validators.required, NgBrazilValidators.cpf]);
      this.textoDocumento = "CPF (Requerido)";
    }
  }

  tipoDocumentoForm(): AbstractControl {
    return this.novoFormGroup.get('tipoDocumento');
  }

  documentoForm(): AbstractControl {
    return this.novoFormGroup.get('documento');
  }

  salvar() {

  }
}