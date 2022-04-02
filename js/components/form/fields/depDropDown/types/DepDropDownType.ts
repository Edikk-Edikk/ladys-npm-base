import { ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react';
import { DepDropDownPropsType } from './DepDropDownPropsType';
import { HandlersType } from './HandlersType';

type DepDropDownType = ForwardRefExoticComponent<PropsWithoutRef<DepDropDownPropsType> & RefAttributes<HandlersType>>

export { DepDropDownType };
