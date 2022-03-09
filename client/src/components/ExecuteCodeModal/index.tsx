import React from 'react';
import { Execute } from '@/api';

import { Modal, Skeleton } from 'semi';

import type { SUPPORT_LANGUAGES_TYPE } from '@/components/CodeEditorV2';
import { t } from 'i18next';
import { withModalPortalWrapper } from '../WithModalPortalWrapper';

interface IProps {
  lang: Exclude<SUPPORT_LANGUAGES_TYPE, 'json' | 'markdown' | 'css'>;
  code: string;
}

const ExecuteCodeModal = withModalPortalWrapper()(function (props: IProps) {
  const [visible, setVisible] = React.useState(true);
  const [loading, setLoading] = React.useState(true);

  const onCancel = React.useCallback(() => {
    setVisible(false);
    setTimeout(() => ExecuteCodeModal.close());
  }, []);

  const run = React.useCallback(async (data: IProps) => {
    try {
    } catch (err) {

    }
  }, []);

  React.useEffect(() => {
    run(props);
  }, []);

  return (
    <Modal
      onCancel={onCancel}
      visible={visible}
      width={960}
      footer={null}
      title={t('提交代码')}
    >
      <Skeleton
        placeholder={(
          <React.Fragment>
            <Skeleton.Title />
          </React.Fragment>
        )}
        loading={loading}
        active
      >
        111
      </Skeleton>
    </Modal>
  );
});

export default ExecuteCodeModal;
