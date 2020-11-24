import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { ValidationMessages, GenericValidator, DisplayMessage } from './../utils/generic-form-validation';
import { Observable, fromEvent, merge } from 'rxjs';


export abstract class FormBaseComponent {

    errors: any[] = [];
    alteracaoNaoSalva: boolean = false;

    private genericValidator: GenericValidator;
    displayMessage: DisplayMessage = {};

    setGenericValidator(validationMessages: ValidationMessages) {
        this.genericValidator = new GenericValidator(validationMessages);
    }

    getBlurControls(formInputElements: ElementRef[]) {
        return formInputElements.map((formControl: ElementRef) => fromEvent(formControl.nativeElement, "blur"));
    }

    processarMensagens(formGroup: FormGroup) {
        this.displayMessage = this.genericValidator.processarMensagens(formGroup);
        this.alteracaoNaoSalva = true;
    }

}