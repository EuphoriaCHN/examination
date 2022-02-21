import React from 'react';
import { useTranslation } from 'react-i18next';
import { createOptionalFormLabel } from '@/common/utils';

import { Modal, Form, Typography } from 'semi';

import type { BaseFormApi as FormApi } from '@douyinfe/semi-foundation/lib/es/form/interface';

interface IProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (data: { name: string, description: string }) => Promise<unknown>;
  record?: ICategoryItem | null;
}

function CategoryOpModal(props: IProps) {
  const formApiRef = React.useRef<FormApi>();
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = React.useCallback(async () => {
    try {
      await formApiRef.current!.validate();
    } catch (err) {
      return;
    }

    setLoading(true);
    const { name, description = '' } = formApiRef.current!.getValues();

    await props.onOk({ name, description });
    setLoading(false);
  }, [props.onOk]);

  const renderHeader = (
    <Typography.Paragraph type={'tertiary'}>
      {
        !!props.record?.id ?
          t('正在给 "{categoryName}" 节点创建子分类', { categoryName: props.record!.name }) :
          t('正在创建一个顶层分类')
      }
    </Typography.Paragraph>
  );

  return (
    <Modal
      title={t('新建分类')}
      onCancel={loading ? undefined : props.onCancel}
      onOk={handleSubmit}
      okButtonProps={{ loading }}
      visible={props.visible}
      width={452}
      maskClosable={false}
      closeOnEsc
    >
      {renderHeader}
      <Form getFormApi={_ => formApiRef.current = _}>
        <Form.Input
          field={'name'}
          label={t('分类名称')}
          // @ts-ignore
          placeholder={t('请输入分类名称')}
          rules={[{
            required: true,
            message: t('分类名称为必填项')
          }, {
            max: 32,
            message: t('分类名称最长 32 字符')
          }]}
          showClear
          autofocus
        />
        <Form.Input
          field={'description'}
          label={createOptionalFormLabel(t('分类描述'))}
          // @ts-ignore
          placeholder={t('请输入分类描述（选填）')}
          rules={[{
            max: 32,
            message: t('分类描述最长 128 字符')
          }]}
          showClear
        />
      </Form>
    </Modal>
  );
}

export default CategoryOpModal;
