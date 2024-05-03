import { FormControl } from '@angular/forms';

export function noSpecialCharactersValidator(control: FormControl) {
  const value: string = control.value;
  const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  if (specialCharacters.test(value)) {
    return { hasSpecialCharacters: true };
  } else {
    return null;
  }
}