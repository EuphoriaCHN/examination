import React from 'react';
import { useTranslation } from 'react-i18next';
import { createOptionalFormLabel } from '@/common/utils';

import { Modal, Form, Typography } from 'semi';

import type { BaseFormApi as FormApi } from '@douyinfe/semi-foundation/lib/es/form/interface';

interface IProps {
  visible: boolean;
  onCancel: () => void;
  onCreate: (data: { name: string, description: string }) => Promise<unknown>;
  onUpdate: (data: { name: string, description: string }) => Promise<unknown>;
  record?: ITagItem | null;
}

function TagOpModal(props: IProps) {
  const formApiRef = React.useRef<FormApi>();
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(false);

  const type: 'update' | 'create' = !!props.record ? 'update' : 'create';

  const handleSubmit = React.useCallback(async () => {
    try {
      await formApiRef.current!.validate();
    } catch (err) {
      return;
    }

    setLoading(true);
    const { name, description = '' } = formApiRef.current!.getValues();

    const cb = type === 'update' ? props.onUpdate : props.onCreate;

    await cb({ name, description });

    setLoading(false);
  }, [type, props.onCreate, props.onUpdate]);

  React.useEffect(() => {
    if (!props.visible) return;

    if (type === 'update' && !!props.record?.id) {
      setTimeout(() => {
        formApiRef.current?.setValues({
          name: props.record?.name || '',
          description: props.record?.description || ''
        });
      });
    }
  }, [props.visible, type]);

  return (
    <Modal
      title={type === 'create' ? t('新建标签') : t('更新标签')}
      onCancel={loading ? undefined : props.onCancel}
      onOk={handleSubmit}
      okButtonProps={{ loading }}
      visible={props.visible}
      width={452}
      maskClosable={false}
      closeOnEsc
    >
      <Form getFormApi={_ => formApiRef.current = _}>
        <Form.Input
          field={'name'}
          label={t('标签名称')}
          // @ts-ignore
          placeholder={t('请输入标签名称')}
          rules={[{
            required: true,
            message: t('标签名称为必填项')
          }, {
            max: 32,
            message: t('标签名称最长 32 字符')
          }]}
          showClear
          autofocus
        />
        <Form.Input
          field={'description'}
          label={createOptionalFormLabel(t('标签描述'))}
          // @ts-ignore
          placeholder={t('请输入标签描述（选填）')}
          rules={[{
            max: 32,
            message: t('标签描述最长 128 字符')
          }]}
          showClear
        />
      </Form>
    </Modal>
  );
}

export default TagOpModal;
