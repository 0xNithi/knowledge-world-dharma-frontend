import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal } from './ModalReducer';

export function useModal() {
  const dispatch = useDispatch();
  const ModalState = useSelector((state) => state.modal);
  function showModal() {
    dispatch(openModal());
  }
  function unShowModal() {
    dispatch(closeModal());
  }
  function getModal() {
    return ModalState;
  }
  return {
    getModal,
    showModal,
    unShowModal,
  };
}
