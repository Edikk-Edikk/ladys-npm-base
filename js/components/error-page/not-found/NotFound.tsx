import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const NotFound = () => {
  return (
    <div className="error-page">
      <div className="error-page__title">
        4😵4
      </div>
      <div className="error-page__action">
        The page you were looking for was not found.
      </div>
      <Link to="/" className={classNames("error-page__action", 'btn btn-primary btn-lg')}>
        Click here to go home
      </Link>
    </div>
  );
};

export { NotFound };
