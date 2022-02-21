import React from 'react';
import { useTranslation } from 'react-i18next';

import { Modal, Form } from 'semi';

interface IProps {
  visible: boolean;
  onCancel: () => void;
}

function TagOpModal(props: IProps) {
  const { t } = useTranslation();

  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
    >

    </Modal>
  );
}

export default TagOpModal;
