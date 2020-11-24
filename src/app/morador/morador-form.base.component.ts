import { Validators, FormGroup, AbstractControl } from '@angular/forms';
import { ElementRef } from '@angular/core';

import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { merge } from 'rxjs';

import { ValidationMessages } from './../utils/generic-form-validation';
import { Morador } from './models/morador';
import { FormBaseComponent } from 'src/app/base-components/form.base.component';

export abstract class MoradorFormBaseComponent extends FormBaseComponent {

    MASKS = MASKS;

    morador: Morador;
    textoDocumento: string = "CPF (Requerido)";

    constructor() {
        super();

        const validationMessage: ValidationMessages = {
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

        super.setGenericValidator(validationMessage);
    }

    protected setControlBlurs(formInputElements: ElementRef[], formGroup: FormGroup,
        tipoDocumentoForm: AbstractControl, documentoForm: AbstractControl) {
        const controlBlurs = super.getBlurControls(formInputElements);

        merge(...controlBlurs).subscribe(() => {
            this.trocarValidacaoDocumento(tipoDocumentoForm, documentoForm);
            this.processarMensagens(formGroup);
        });
    }

    private trocarValidacaoDocumento(tipoDocumentoForm, documentoForm) {
        if (tipoDocumentoForm.value === '1') {
            documentoForm.clearValidators();
            documentoForm.setValidators([Validators.required, NgBrazilValidators.cnpj]);
            this.textoDocumento = "CNPJ (Requerido)";
        }
        else {
            documentoForm.clearValidators();
            documentoForm.setValidators([Validators.required, NgBrazilValidators.cpf]);
            this.textoDocumento = "CPF (Requerido)";
        }
    }

}