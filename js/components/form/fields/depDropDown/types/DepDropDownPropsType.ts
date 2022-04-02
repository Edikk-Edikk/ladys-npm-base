import { RefObject } from 'react';
import { Options } from 'select2';
import { HandlersType } from './HandlersType';
import { VariantType } from './VariantType';
import { DropDownDataType } from '../../types/DropDownDataType';

type DepDropDownPropsType = {
  initialData: DropDownDataType,
  label?: string,
  isRequired?: boolean,
  name: string,
  dependency?: RefObject<HandlersType>,
  placeholder?: string,
  variant?: VariantType,
  multiple?: boolean,
  url?: string,
  select2Options?: Options,
}

export { DepDropDownPropsType };
