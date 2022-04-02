import React from 'react';
import { DropDownDataType } from './DropDownDataType';

type SelectType = React.SelectHTMLAttributes<any> & {
  data: DropDownDataType,
  placeholder?: string,
}

export { SelectType };
