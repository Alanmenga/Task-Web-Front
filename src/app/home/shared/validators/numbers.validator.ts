import { FormControl } from '@angular/forms';

export function numbersValidator(control: FormControl) {
  const value: string = control.value;
  const numbersCharacters = /\d/;

  if (!numbersCharacters.test(value)) {
    return { numbersCharacters: true };
  } else {
    return null;
  }
}