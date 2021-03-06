import React from 'react';
import { connect } from 'react-redux';
import { StateNotifierType } from '../types/StateNotifierType';
import { REDUCER_NOTIFIER_NAME } from '../constants';
import { Item } from '../components/Item';

type PropsType = StateNotifierType;

const Notifier: React.VFC<PropsType> = ({
  items,
}) => {
  const renderItems = () => Object.entries(items).map(([key, item]) => (
    <Item
      key={key}
      id={item.id}
      message={item.message}
      timeout={item.timeout}
      variant={item.variant}
      isVisible={item.isVisible}
    />
  ));

  return (
    <div className="notifier">
      {renderItems()}
    </div>
  );
};

const mapStateToProps = (state: object) => state[REDUCER_NOTIFIER_NAME];

export default connect<StateNotifierType>(
  mapStateToProps,
)(Notifier);
