import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';

import { NgBrazilValidators } from 'ng-brazil';
import { ToastrService } from 'ngx-toastr';

import { StringUtils } from './../../utils/string-utils';
import { CepBusca } from './../models/cep';
import { CasaService } from './../services/casa.service';
import { CasaBaseFormComponent } from '../casa-form.app.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends CasaBaseFormComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  novoFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private casaService: CasaService,
    private toastr: ToastrService) { super(); }

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
    super.setControlBlurs(this.formInputElements, this.novoFormGroup);
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
    }
  }

  processarSucesso(response: any) {
    this.alteracaoNaoSalva = false;
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

    super.processarMensagens(this.novoFormGroup);
  }

}