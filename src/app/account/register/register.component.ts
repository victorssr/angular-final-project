import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlName } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';

import { CustomValidators } from 'ng2-validation';
import { ToastrService } from 'ngx-toastr';
import { Observable, fromEvent, merge } from 'rxjs';

import { ValidationMessages, GenericValidator, DisplayMessage } from './../../utils/generic-form-validation';
import { AccountService } from './../services/account.service';
import { Usuario } from './../models/usuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];

  usuario: Usuario;
  registerForm: FormGroup;

  alteracaoNaoSalva: Boolean = false;

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(private fb: FormBuilder,
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router) {

    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Informe um e-mail válido',
      },
      password: {
        required: 'Informe sua senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
      },
      confirmPassword: {
        required: 'Confirme a sua senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
        equalTo: 'As senhas não conferem'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    let senha = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15])]);
    let confirmacaoSenha = new FormControl('', [Validators.required, CustomValidators.equalTo(senha)]);

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: senha,
      confirmPassword: confirmacaoSenha,
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, "blur"));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.registerForm);
      this.alteracaoNaoSalva = true;
    });
  }

  finalizarCadastro() {
    if (this.registerForm.dirty && this.registerForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.registerForm.value);

      this.accountService.registrarUsuario(this.usuario)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso); },
          falha => { this.processarFalha(falha); }
        );

      this.alteracaoNaoSalva = false;
    }
  }

  processarSucesso(response: any) {
    this.registerForm.reset();
    this.errors = [];

    this.accountService.localStorage.salvarDadosLocaisUsuario(response);

    let toast = this.toastr.success('Sua conta foi registrada com sucesso.', 'Sucesso!');
    toast.onHidden.subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;

    this.toastr.error('Não foi possível registrar a sua conta.', 'Ocorreu um problema!');
  }
}
