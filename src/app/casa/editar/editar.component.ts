import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgBrazilValidators } from 'ng-brazil';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CasaService } from './../services/casa.service';
import { StringUtils } from './../../utils/string-utils';
import { Endereco } from './../models/endereco';
import { CasaBaseFormComponent } from '../casa-form.app.component';
import { CepBusca } from './../models/cep';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends CasaBaseFormComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElement: ElementRef[];

  formGroupMoradia: FormGroup;
  formGroupEndereco: FormGroup;

  errorsEndereco: string[] = [];
  endereco: Endereco;

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private casaService: CasaService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal,
    private spinnerService: NgxSpinnerService) {

    super();

    this.moradia = this.route.snapshot.data['casa'];
  }

  ngAfterViewInit(): void {
    super.setControlBlurs(this.formInputElement, this.formGroupMoradia)
  }

  ngOnInit(): void {
    this.spinnerService.show();

    this.formGroupMoradia = this.formBuilder.group({
      id: '',
      valorDespesas: ['', [Validators.required, NgBrazilValidators.currency]]
    });

    this.formGroupEndereco = this.formBuilder.group({
      id: '',
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      complemento: [''],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      cep: ['', [Validators.required, NgBrazilValidators.cep]],
      casaId: ''
    });

    this.preencherForm();

    setTimeout(() => {
      this.spinnerService.hide();
    }, 1000);
  }

  preencherForm() {
    this.formGroupMoradia.patchValue({
      id: this.moradia.id,
      valorDespesas: this.moradia.valorDespesas.toString().replace(".", ","),
    });

    if (this.moradia.endereco) {
      this.formGroupEndereco.patchValue({
        id: this.moradia.endereco.id,
        logradouro: this.moradia.endereco.logradouro,
        numero: this.moradia.endereco.numero,
        complemento: this.moradia.endereco.complemento,
        bairro: this.moradia.endereco.bairro,
        cidade: this.moradia.endereco.cidade,
        estado: this.moradia.endereco.estado,
        cep: this.moradia.endereco.cep,
        casaId: this.moradia.endereco.casaId,
      });
    }
  }

  salvar() {
    if (this.formGroupMoradia.dirty && this.formGroupMoradia.valid) {
      this.moradia = Object.assign({}, this.moradia, this.formGroupMoradia.value);

      this.moradia.valorDespesas = StringUtils.currencyStringToNumber(this.moradia.valorDespesas.toString());

      this.casaService.atualizar(this.moradia)
        .subscribe(
          sucesso => this.processarSucesso(sucesso),
          falha => this.processarFalha(falha)
        );
    }
  }

  processarSucesso(response: any) {
    let toastr = this.toastr.success('Moradia atualizada com sucesso.', 'Sucesso!');

    toastr.onHidden.subscribe(() => this.router.navigate(['/casa/lista']));
  }

  processarFalha(fail: any) {
    if (fail.error.errors) {
      this.errors = fail.error.errors;
    }

    this.toastr.error('Não foi possível atualizar a moradia.', 'Ocorreu um problema!');
  }

  open(content) {
    this.modalService.open(content);
  }

  buscarCep(cep: string) {
    const numeroCep = StringUtils.somenteNumeros(cep);
    if (numeroCep.length != 8) return;

    this.casaService.buscarCep(numeroCep)
      .subscribe(
        cepRetorno => this.preencherCep(cepRetorno),
        erro => this.errorsEndereco.push(erro)
      );
  }

  preencherCep(cep: CepBusca) {
    this.formGroupEndereco.patchValue({
      logradouro: cep.logradouro,
      bairro: cep.bairro,
      cidade: cep.localidade,
      estado: cep.uf,
      cep: cep.cep
    });
  }

  atualizarEndereco() {
    if (this.formGroupEndereco.dirty) {
      this.endereco = Object.assign({}, this.endereco, this.formGroupEndereco.value);

      this.casaService.atualizarEndereco(this.endereco)
        .subscribe(
          sucesso => this.processarSucessoEndereco(sucesso),
          falha => this.processarFalhaEndereco(falha)
        )
    }
  }

  processarSucessoEndereco(response: any) {
    this.errorsEndereco = [];

    this.toastr.success("Endereço atualizado com sucesso.", "Sucesso!");

    this.moradia.endereco = this.endereco;
    this.modalService.dismissAll();
  }

  processarFalhaEndereco(fail: any) {
    if (fail.error.errors) {
      this.errorsEndereco = fail.error.errors;
    }

    this.toastr.error('Não foi possível atualizar a moradia.', 'Ocorreu um problema!');
  }

}