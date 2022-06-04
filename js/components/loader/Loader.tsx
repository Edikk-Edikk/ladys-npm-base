import React from 'react';
import loaderCss from './loader.module.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const Loader = () => {
  useStyles(loaderCss);
  return (
    <div className={loaderCss.loader}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <circle fill="#00a6fd" stroke="none" cx="24" cy="50" r="6">
          <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.1"
          />
        </circle>
        <circle fill="#00a6fd" stroke="none" cx="50" cy="50" r="6">
          <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.2"
          />
        </circle>
        <circle fill="#00a6fd" stroke="none" cx="76" cy="50" r="6">
          <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.3"
          />
        </circle>
      </svg>
    </div>
  );
};

export { Loader };
