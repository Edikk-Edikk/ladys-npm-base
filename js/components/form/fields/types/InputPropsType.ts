import React, { ForwardedRef } from 'react';
import Inputmask from 'inputmask';

type InputPropsType = React.InputHTMLAttributes<HTMLInputElement> & {
  ref?: ForwardedRef<HTMLInputElement>,
  additionalClassName?: string;
  errorAdditionalClassName?: string;
  inputmask?: Inputmask.Options;
}

export { InputPropsType };
