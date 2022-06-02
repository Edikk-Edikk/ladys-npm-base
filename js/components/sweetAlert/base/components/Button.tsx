import React, { ReactNode, useEffect, useRef } from 'react';
import ButtonBootstrap, { ButtonProps } from 'react-bootstrap/Button';
import { LaddaButton } from '../../../ladda';

type PropsType = {
  text: ReactNode | string;
  variant: ButtonProps['variant'];
  className: string;
  isVisible: boolean;
  focus: boolean;
  size: ButtonProps['size'];
  disabled: boolean;
  onClick: () => void;
  loading: boolean;
  isEntered: boolean;
}

const Button: React.FC<PropsType> = ({
  text,
  variant,
  isVisible,
  focus,
  size,
  disabled,
  onClick,
  loading,
  isEntered,
}) => {
  if (!isVisible) {
    return null;
  }

  const ref = useRef<HTMLButtonElement>();

  useEffect(() => {
    if (isEntered && focus) {
      ref.current.focus();
    }
  }, [isEntered]);

  return (
    <LaddaButton loading={loading} disabled={disabled && !loading}>
      <ButtonBootstrap
        variant={variant}
        size={size}
        ref={ref}
        className="flex-sm-grow-0 flex-grow-1"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onClick();
        }}
      >
        {text}
      </ButtonBootstrap>
    </LaddaButton>
  );
};

export { Button };
