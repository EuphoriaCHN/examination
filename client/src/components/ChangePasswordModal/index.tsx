import React from 'react';
import { useTranslation } from 'react-i18next';
import { validateForm } from '@/common/utils';

import { Modal, Form } from 'semi';

import type { BaseFormApi as FormApi } from '@douyinfe/semi-foundation/lib/es/form/interface';

import './index.scss';

interface IProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (oldPass: string, newPass: string) => Promise<void>;
}

function ChangePasswordModal(props: IProps) {
  const [loading, setLoading] = React.useState(false);

  const { t } = useTranslation();
  const formApiRef = React.useRef<FormApi>();

  const onSubmit = React.useCallback(async () => {
    const { password = '', newPassword = '', newPasswordAgain = '' } = formApiRef.current?.getValues() || {};

    const passwordValidateRes = validateForm([
      [password.length > 16, t('密码长度不能大于 16 字符')],
      [password.length === 0, t('密码是必填项')],
      [password.length < 6, t('密码长度不能小于 6 字符')],
    ], errMsg => formApiRef.current!.setError('password', errMsg));

    const newPasswordValidateRes = validateForm([
      [newPassword.length > 16, t('密码长度不能大于 16 字符')],
      [newPassword.length === 0, t('密码是必填项')],
      [newPassword.length < 6, t('密码长度不能小于 6 字符')],
    ], errMsg => formApiRef.current!.setError('newPassword', errMsg));

    const newPasswordAgainValidateRes = validateForm([
      [newPasswordAgain !== newPassword, t('两次输入的新密码不一致')],
    ], errMsg => formApiRef.current!.setError('newPasswordAgain', errMsg));

    if (passwordValidateRes || newPasswordValidateRes || newPasswordAgainValidateRes) {
      return;
    }

    setLoading(true);
    await props.onSubmit(password, newPassword);
    setLoading(false);
  }, [props.onSubmit]);

  return (
    <Modal
      visible={props.visible}
      onCancel={loading ? undefined : props.onCancel}
      okButtonProps={{ loading }}
      onOk={onSubmit}
      title={t('修改密码')}
    >
      <Form getFormApi={_ => formApiRef.current = _}>
        <Form.Input
          field={'password'}
          label={t('旧密码')}
          placeholder={t('请在此输入旧密码') as string}
          type={'password'}
          autofocus
          showClear
        />
        <Form.Input
          field={'newPassword'}
          label={t('新密码')}
          type={'password'}
          placeholder={t('请在此输入新密码') as string}
          showClear
        />
        <Form.Input
          field={'newPasswordAgain'}
          label={t('再次确认')}
          type={'password'}
          placeholder={t('请再输入一次新密码') as string}
          showClear
        />
      </Form>
    </Modal>
  );
}

export default ChangePasswordModal;
