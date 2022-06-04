import React from 'react';
import errorPageCss from '../assets/error-page.module.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import useStyles from 'isomorphic-style-loader/useStyles';

const NotFound = () => {
  useStyles(errorPageCss);
  return (
    <div className={errorPageCss.errorPage}>
      <div className={errorPageCss.errorPage__title}>
        4😵4
      </div>
      <div className={errorPageCss.errorPage__description}>
        The page you were looking for was not found.
      </div>
      <Link to="/" className={classNames(errorPageCss.errorPage__action, 'btn btn-primary btn-lg')}>
        Click here to go home
      </Link>
    </div>
  );
};

export { NotFound };
