import { AbstractControl, ValidationErrors } from '@angular/forms';

export function cedulaValidator(control: AbstractControl): ValidationErrors | null {
    const cedula = control.value;
    if (!cedula || !/^\d{10}$/.test(cedula)) {
        return { invalidCedula: true };
    }

    const digits = cedula.split('').map(Number);
    const regionCode = parseInt(cedula.substring(0, 2), 10);
    if (regionCode < 1 || regionCode > 24) {
        return { invalidRegion: true };
    }

    const oddSum = digits[0] * 2 - (digits[0] * 2 >= 10 ? 9 : 0) +
        digits[2] * 2 - (digits[2] * 2 >= 10 ? 9 : 0) +
        digits[4] * 2 - (digits[4] * 2 >= 10 ? 9 : 0) +
        digits[6] * 2 - (digits[6] * 2 >= 10 ? 9 : 0) +
        digits[8] * 2 - (digits[8] * 2 >= 10 ? 9 : 0);

    const evenSum = digits[1] + digits[3] + digits[5] + digits[7];

    const totalSum = oddSum + evenSum;
    const verifierDigit = Math.ceil(totalSum / 10) * 10 - totalSum;
    if (verifierDigit !== digits[9]) {
        return { invalidVerifierDigit: true };
    }

    return null;
}
