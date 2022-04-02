import React, { ChangeEvent } from 'react';
import { FieldInputProps, FieldMetaState, useForm } from 'react-final-form';
import classNames from 'classnames';
import { Options } from 'select2';
import { Select2 } from '../Select2';
import { Label } from '../Label';
import { DropDownDataType } from '../types/DropDownDataType';
import { ValueType } from './types/ValueType';
import { VariantType } from './types/VariantType';
import { VARIANT_SELECT2 } from './constants';

type PropsType = {
  variant: VariantType,
  label?: string,
  isRequired?: boolean,
  input: FieldInputProps<any>,
  meta: FieldMetaState<any>,
  data: DropDownDataType,
  multiple: boolean,
  onChange: (value: ValueType) => void,
  placeholder?: string,
  select2Options?: Options,
}

const DepDropDownContent: React.FC<PropsType> = ({
  variant,
  label,
  isRequired,
  input,
  meta,
  data,
  multiple,
  onChange,
  placeholder,
  select2Options,
}) => {
  const form = useForm();

  const renderVariantDefault = () => {
    const handlerChange = (e: ChangeEvent<HTMLSelectElement>): void => {
      input.onChange(e);
      // @ts-ignore
      if (!getValue(e.target)) {
        form.mutators.setValue(input.name, null);
      }
      // @ts-ignore
      onChange(getValue(e.target));
    };

    const renderOptions = () => {
      const options = data.map((item) => (
        <option key={item.id} value={item.id}>
          {item.text}
        </option>
      ));
      options.unshift((
        <option key={0}>
          {placeholder}
        </option>
      ));
      return options;
    };

    return (
      <select {...input} id={input.name} multiple={multiple} onChange={handlerChange} style={{ height: '150px' }}>
        {renderOptions()}
      </select>
    );
  };

  const renderVariantSelect2 = () => {
    const handlerChange = (value: ValueType): void => {
      onChange(value);
    };

    return (
      <Select2
        data={data}
        additionalClassName={classNames({ 'is-invalid': meta.submitError || meta.error })}
        options={{
          multiple,
          placeholder,
          ...select2Options,
        }}
        {...input}
        onChange={handlerChange}
      />
    );
  };

  const renderContent = () => {
    if (variant === VARIANT_SELECT2) {
      return renderVariantSelect2();
    }
    return renderVariantDefault();
  };

  return (
    <div className="form-group">
      <Label label={label} isRequired={isRequired} htmlFor={input.name} />
      {renderContent()}
      <div className="invalid-feedback">
        {meta.submitError || meta.error}
      </div>
    </div>
  );
};

export { DepDropDownContent };
