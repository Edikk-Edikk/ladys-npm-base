import React, { FC, HTMLProps, ReactNode } from 'react';
import { PulseLoader } from 'react-spinners';
import classNames from 'classnames';

type PropsType = {
  children: ReactNode;
  loading: boolean;
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  Tag?: string;
  tagProps?: HTMLProps<any>;
  loaderSize?: number;
  loaderColor?: string;
};

const defaultProps: Partial<PropsType> = {
  disabled: false,
  Tag: 'button',
  tagProps: {
    className: 'btn btn-success',
  },
  loaderSize: 10,
  loaderColor: '#fff',
};

const ButtonLoader: FC<PropsType> = ({
  children,
  loading,
  disabled,
  Tag,
  tagProps,
  onClick,
  loaderSize,
  loaderColor,
}) => (
  <>
    {/* @ts-ignore */}
    <Tag
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...tagProps}
      className={classNames(tagProps.className, 'button-loader')}
      onClick={onClick}
      disabled={disabled}
    >
      <div className={classNames('button-loader__content', { 'button-loader__content_hide': loading })}>
        {children}
      </div>
      <div className={classNames('button-loader__loader', { 'button-loader__loader_visible': loading })}>
        <PulseLoader size={loaderSize} color={loaderColor} />
      </div>
    </Tag>
  </>
);

ButtonLoader.defaultProps = defaultProps;

export { ButtonLoader };
