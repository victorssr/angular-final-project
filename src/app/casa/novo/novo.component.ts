import { ToastrService } from 'ngx-toastr';
import { Moradia } from './../models/moradia';
import { StringUtils } from './../../utils/string-utils';

import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';

import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { Observable, fromEvent, merge } from 'rxjs';

import { DisplayMessage, ValidationMessages, GenericValidator } from './../../utils/generic-form-validation';
import { CepBusca } from './../models/cep';
import { CasaService } from './../services/casa.service';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  public MASKS = MASKS;

  moradia: Moradia;

  novoFormGroup: FormGroup;
  alteracaoNaoSalva: Boolean = false;

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  errors: string[] = [];

  constructor(private formBuilder: FormBuilder,
    private casaService: CasaService,
    private toastr: ToastrService) {

    this.validationMessages = {
      valorDespesas: {
        required: 'O valor das despesas é obrigatório',
        min: 'O valor das despesas é obrigatório',
        currency: 'O valor da despesas está inválido'
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
      valorDespesas: ['', [Validators.required, NgBrazilValidators.currency]],
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
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.processarMensagens();
    });
  }

  processarMensagens() {
    this.displayMessage = this.genericValidator.processarMensagens(this.novoFormGroup);
    this.alteracaoNaoSalva = true;
  }

  salvar() {
    if (this.novoFormGroup.dirty && this.novoFormGroup.valid) {
      this.moradia = Object.assign({}, this.moradia, this.novoFormGroup.value);

      this.moradia.valorDespesas = StringUtils.currencyStringToNumber(this.moradia.valorDespesas.toString());
      this.moradia.endereco.cep = StringUtils.somenteNumeros(this.moradia.endereco.cep);

      this.casaService.novaMoradia(this.moradia)
        .subscribe(
          sucesso => this.processarSucesso(sucesso),
          falha => this.processarFalha(falha)
        );

      this.alteracaoNaoSalva = false;
    }
  }

  processarSucesso(response: any) {
    this.novoFormGroup.reset();
    this.errors = [];

    this.toastr.success('Moradia registrada com sucesso.', 'Sucesso!');
  }

  processarFalha(fail: any) {
    if (fail.error.errors) {
      this.errors = fail.error.errors;
    }

    this.toastr.error('Não foi possível registrar a moradia', "Ocorreu um problema");
  }

  buscarCep(cep: string) {
    const numeroCep = StringUtils.somenteNumeros(cep);
    if (numeroCep.length != 8) return;

    this.casaService.buscarCep(numeroCep)
      .subscribe(
        cepRetorno => this.preencherEndereco(cepRetorno),
        erro => this.errors.push(erro)
      );
  }

  preencherEndereco(cep: CepBusca) {
    this.novoFormGroup.patchValue({
      endereco: {
        logradouro: cep.logradouro,
        bairro: cep.bairro,
        cidade: cep.localidade,
        estado: cep.uf,
        cep: cep.cep,
      }
    });

    this.processarMensagens();
  }

}