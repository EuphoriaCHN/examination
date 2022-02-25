import { useBlocker } from '@/common/hooks/useBlocker';

import { Modal } from 'semi';

import type { ModalReactProps } from '@douyinfe/semi-ui/lib/es/modal/Modal';

interface IProps {
  when: boolean;
  modalType?: 'warning' | 'error';
  modalProps: ModalReactProps;
}

function Prompt(props: IProps) {
  useBlocker(tx => {
    Modal[props.modalType ?? 'error']({
      ...props.modalProps,
      onOk(e) {
        tx.retry();
        props.modalProps.onOk?.(e);
      }
    });
  }, props.when);

  return null;
}

export default Prompt;
