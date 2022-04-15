import { useDispatch } from 'react-redux';
import { notifierShow } from '../actions';
import { notifierHide } from '../actions';
import { ItemType } from '../types';

const useNotifier = () => {
  const dispatch = useDispatch();

  const show = (item: ItemType) => dispatch(notifierShow(item));

  const hide = (id: string, force: boolean = false) => dispatch(notifierHide(id, force));

  return {
    notifierShow: show,
    notifierHide: hide,
  };
};

export { useNotifier };
