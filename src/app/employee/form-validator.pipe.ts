import {Pipe, PipeTransform} from '@angular/core';
import {ValidationErrors} from "@angular/forms";

@Pipe({
    name: 'formValidator',
    standalone: true
})
export class FormValidatorPipe implements PipeTransform {

    private errorResolver: any = {
        required: () => 'This field is required',
        minlength: () => 'Min length is not met'
    };

    transform(errorKeys: ValidationErrors | null): string {
        if (!errorKeys) return "";
        const validatorError = Object.keys(errorKeys)[0];
        console.log(Object.keys(errorKeys))

        if (this.errorResolver[validatorError]) {
            return this.errorResolver[validatorError](errorKeys[validatorError]);
        }

        return '';
    }

}
