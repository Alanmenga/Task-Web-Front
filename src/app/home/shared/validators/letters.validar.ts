import { FormControl } from '@angular/forms';

export function lettersValidator(control: FormControl) {
  const value: string = control.value;
  const minusCharacters = /[a-z]/;
  const mayusCharacters = /[A-Z]/;

  if (!(minusCharacters.test(value) && mayusCharacters.test(value))) {
    return { lettersCharacters: true };
  } else {
    return null;
  }
}