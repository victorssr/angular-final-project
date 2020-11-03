import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';

import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { Observable, fromEvent, merge } from 'rxjs';

import { DisplayMessage, ValidationMessages, GenericValidator } from './../../utils/generic-form-validation';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  public MASKS = MASKS;

  novoFormGroup: FormGroup;
  alteracaoNaoSalva: Boolean = false;

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(private formBuilder: FormBuilder) {
    this.validationMessages = {
      valorDespesas: {
        required: 'O valor das despesas é obrigatório',
        min: 'O valor das despesas é obrigatório'
      },
      logradouro: {
        required: 'O logradouro é obrigatório'
      },
      numero: {
        required: 'O número é obrigatório'
      },
      bairro: {
        required: 'O bairro é obrigatório'
      },
      cidade: {
        required: 'O cidade é obrigatório'
      },
      estado: {
        required: 'O estado é obrigatório'
      },
      cep: {
        required: 'O cep é obrigatório',
        cep: 'O cep informado é inválido',
      },
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.novoFormGroup = this.formBuilder.group({
      valorDespesas: ['', [Validators.required, Validators.min(1), NgBrazilValidators.currency]],
      endereco: this.formBuilder.group({
        logradouro: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        complemento: [''],
        bairro: ['', [Validators.required]],
        cidade: ['', [Validators.required]],
        estado: ['', [Validators.required]],
        cep: ['', [Validators.required, NgBrazilValidators.cep]],
      }),
    });
  }

  ngAfterViewInit(): void {
    let controBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.novoFormGroup);
      this.alteracaoNaoSalva = true;
    });
  }

  salvar() {
    if (this.novoFormGroup.dirty && this.novoFormGroup.valid) {

    }
  }

  processarSucesso(response: any) {
    this.novoFormGroup.reset();
  }

  processarFalha(fail: any) {

  }

}