import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

import './Modal.css';

const Modal = React.forwardRef(({ size, ...props }, ref) => {
  return (
    <ReactModal
      overlayClassName="modal-overlay"
      className={`modal modal-${size}`}
      closeTimeoutMS={1000}
      {...props}
      ref={ref}
    />
  );
});

Modal.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

Modal.defaultProps = {
  size: 'sm',
};

export default Modal;
