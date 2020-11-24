import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlName } from '@angular/forms';
import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';

import { CustomValidators } from 'ng2-validation';
import { ToastrService } from 'ngx-toastr';
import { merge } from 'rxjs';

import { ValidationMessages } from './../../utils/generic-form-validation';
import { AccountService } from './../services/account.service';
import { Usuario } from './../models/usuario';
import { FormBaseComponent } from './../../base-components/form.base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  usuario: Usuario;
  loginForm: FormGroup;
  returnUrl: string;

  constructor(private fb: FormBuilder,
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router,
    private activedRoute: ActivatedRoute) {

    super();

    this.returnUrl = this.activedRoute.snapshot.queryParams['returnUrl'];

    const validationMessages: ValidationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Informe um e-mail válido',
      },
      password: {
        required: 'Informe sua senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
      }
    };

    super.setGenericValidator(validationMessages);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, CustomValidators.rangeLength([6, 15])]],
    });
  }

  ngAfterViewInit(): void {
    const controlBlurs = super.getBlurControls(this.formInputElements);

    merge(...controlBlurs).subscribe(() => {
      super.processarMensagens(this.loginForm);
    });
  }

  login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.loginForm.value);

      this.accountService.login(this.usuario)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso); },
          falha => { this.processarFalha(falha); }
        );
    }
  }

  processarSucesso(response: any) {
    this.loginForm.reset();
    this.errors = [];

    this.accountService.localStorage.salvarDadosLocaisUsuario(response);

    const toast = this.toastr.success('Login efetuado com sucesso.', 'Seja bem-vindo(a)!');
    toast.onHidden.subscribe(() => {
      this.returnUrl ? this.router.navigate([this.returnUrl]) : this.router.navigate(['/home']);
    });
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;

    this.toastr.error('Não foi possível efetuar o seu acesso.', 'Ocorreu um problema!');
  }
}