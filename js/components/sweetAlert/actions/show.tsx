import React from 'react';
import { TYPE_DEFAULT, TYPE_ERROR } from '../base/constants';
import { SWEET_ALERT_SHOW, SWEET_ALERT_UPDATE } from '../constants';
import { ActionWithPayloadType } from '../../redux';
import { OptionalPropsType } from '../base/types/OptionalPropsType';
import { StateSweetAlertType } from '../types/StateSweetAlertType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons/faLongArrowAltRight';

const sweetAlertShow = (config: StateSweetAlertType): ActionWithPayloadType<StateSweetAlertType> => ({
  type: SWEET_ALERT_SHOW,
  payload: {
    show: true,
    type: TYPE_DEFAULT,
    ...config,
  },
});

const sweetAlertUpdate = (config: OptionalPropsType): ActionWithPayloadType<StateSweetAlertType> => ({
  type: SWEET_ALERT_UPDATE,
  payload: {
    show: true,
    type: TYPE_DEFAULT,
    ...config,
  },
});

const sweetAlertErrorShow = (config: StateSweetAlertType = {}): ActionWithPayloadType<StateSweetAlertType> => {
  const title = config.title || 'Error';

  return ({
    type: SWEET_ALERT_SHOW,
    payload: {
      show: true,
      title,
      type: TYPE_ERROR,
      cancelBtnIsVisible: false,
      confirmBtnFocus: false,
      btnSize: null,
      confirmBtnText: (
        <>
          Come back
          <i className="fal fa-long-arrow-right" />
          <FontAwesomeIcon icon={faLongArrowAltRight} />
        </>
      ),
      ...config,
    },
  });
};

const sweetAlertSuccessShow = (config: StateSweetAlertType = {}): ActionWithPayloadType<StateSweetAlertType> => ({
  type: SWEET_ALERT_SHOW,
  payload: {
    show: true,
    title: 'Excellent!',
    type: TYPE_ERROR,
    cancelBtnIsVisible: false,
    confirmBtnFocus: false,
    btnSize: null,
    confirmBtnText: (
      <>
        Come back
        <i className="fal fa-long-arrow-right" />
      </>
    ),
    ...config,
  },
});

export {
  sweetAlertShow,
  sweetAlertUpdate,
  sweetAlertErrorShow,
  sweetAlertSuccessShow,
};
