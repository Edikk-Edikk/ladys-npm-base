import { FormState } from 'final-form';

const getError = (form: FormState<any>, name: string): string | null => {
  if (name in form.errors) {
    return form.errors[name];
  }

  return name in form.submitErrors ? form.submitErrors[name] : null;
};

export { getError };
