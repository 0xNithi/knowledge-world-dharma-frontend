import { useDispatch, useSelector } from 'react-redux';
import { addItem, deleteItem } from './productSlice';

export function useProduct() {
  const dispatch = useDispatch();
  const threadstate = useSelector((state) => state.thread);
  function addItemAction(post) {
    dispatch(addItem(post));
  }
  function delteItemAction(id) {
    deleteItem(id);
  }
  function getItem() {
    return threadstate;
  }
  return {
    getItem,
    addItemAction,
    delteItemAction,
  };
}
