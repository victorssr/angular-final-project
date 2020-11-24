import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlName } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';

import { CustomValidators } from 'ng2-validation';
import { ToastrService } from 'ngx-toastr';
import { merge } from 'rxjs';

import { ValidationMessages } from './../../utils/generic-form-validation';
import { AccountService } from './../services/account.service';
import { Usuario } from './../models/usuario';
import { FormBaseComponent } from 'src/app/base-components/form.base.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent extends FormBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  usuario: Usuario;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router) {

    super();

    const validationMessages: ValidationMessages = {
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

    super.setGenericValidator(validationMessages);
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
    const controlBlurs = super.getBlurControls(this.formInputElements);

    merge(...controlBlurs).subscribe(() => {
      super.processarMensagens(this.registerForm);
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

      super.alteracaoNaoSalva = false;
    }
  }

  processarSucesso(response: any) {
    this.registerForm.reset();
    super.errors = [];

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
