import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';

import { MASKS } from 'ng-brazil';
import { merge } from 'rxjs';

import { Moradia } from './models/moradia';
import { FormBaseComponent } from '../base-components/form.base.component';

export abstract class CasaBaseFormComponent extends FormBaseComponent {
    MASKS = MASKS;

    moradia: Moradia;

    constructor() {
        super();

        const validationMessages = {
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

        super.setGenericValidator(validationMessages);
    }

    setControlBlurs(formInputElements: ElementRef[], formGroup: FormGroup) {
        const controlBlurs = super.getBlurControls(formInputElements);

        merge(...controlBlurs).subscribe(() => {
            super.processarMensagens(formGroup);
        });
    }

}