import { useDispatch, useSelector } from 'react-redux';
import { addItem, deleteItem, setItem } from './productSlice';

export function useProduct() {
  const dispatch = useDispatch();
  const threadstate = useSelector((state) => state.thread);
  function setItemAction(post) {
    dispatch(setItem(post));
  }
  function addItemAction(post) {
    dispatch(addItem(post));
  }
  function deleteItemAction(id) {
    dispatch(deleteItem(id));
  }
  function getItem() {
    return threadstate;
  }
  return {
    setItemAction,
    getItem,
    addItemAction,
    deleteItemAction,
  };
}
