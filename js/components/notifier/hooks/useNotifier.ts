import { useDispatch } from 'react-redux';
import { notifierShow } from '../actions/show';
import { notifierHide } from '../actions/hide';
import { ItemType } from '../types/ItemType';

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
