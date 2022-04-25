import React from 'react';
import { Button, Modal } from '@kwd/ui';

function ConfirmModal({
  isOpen,
  contentLabel,
  content,
  onRequestClose,
  handleSubmit,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
    >
      <div className="pb-4 text-xl font-medium">Are you sure?</div>
      {content && <div className="py-4">{content}</div>}
      <div className="flex flex-row justify-center gap-1 pt-4">
        <Button
          color="primary"
          onClick={handleSubmit}
          className="justify-center w-20"
        >
          Yes
        </Button>
        <Button onClick={onRequestClose} className="justify-center w-20">
          No
        </Button>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
