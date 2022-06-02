import React, { useEffect } from 'react';
import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from 'redux';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { StateSweetAlertType } from '../types/StateSweetAlertType';
import { REDUCER_SWEET_ALERT_NAME } from '../constants';
import { sweetAlertHide, sweetAlertHideComplete } from '../actions/hide';
import { SweetAlertBase } from '../base/SweetAlertBase';

type DispatchPropsType = {
  hide: () => void,
  hideComplete: () => void,
}

type PropsType = StateSweetAlertType & DispatchPropsType

const SweetAlert: React.VFC<PropsType> = ({
  show,
  hide,
  hideComplete,
  content,
  ...props
}) => {
  const history = useHistory();

  useEffect(() => {
    const historyUnListen = history.listen((location, historyAction) => {
      if (historyAction === 'REPLACE') {
        return;
      }

      hide();
    });

    return () => {
      historyUnListen();
    };
  }, []);

  const renderContent = () => {
    if (!content) {
      return null;
    }

    return content();
  };

  return (
    <SweetAlertBase
      show={show}
      onClose={() => {
        hide();
      }}
      onTransitionExited={() => {
        hideComplete();
      }}
      {...props}
    >
      {renderContent()}
    </SweetAlertBase>
  );
};

const mapStateToProps = (state: StateSweetAlertType) => state[REDUCER_SWEET_ALERT_NAME];
// noinspection TypeScriptValidateTypes
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators<ActionCreatorsMapObject, DispatchPropsType>({
  hide: sweetAlertHide,
  hideComplete: sweetAlertHideComplete,
}, dispatch);

export default connect<StateSweetAlertType, DispatchPropsType>(
  mapStateToProps,
  mapDispatchToProps,
)(SweetAlert);
