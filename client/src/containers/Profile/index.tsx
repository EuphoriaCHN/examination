import React from 'react';
import { useTranslation } from 'react-i18next';
import { pick } from 'lodash';
import { User } from '@/api';
import { setAuthCache } from '@/common/utils';
import { useLoginPage } from '@/common/hooks/useLoginPage';

import { Avatar, Skeleton, Descriptions, Button, Form, Spin, Toast } from 'semi';
import ContentHeader from '@/components/ContentHeader';
import ChangePasswordModal from '@/components/ChangePasswordModal';

import { useUserAtom } from '@/store/user';

import type { AxiosError } from 'axios';
import type { BaseFormApi as FormApi } from '@douyinfe/semi-foundation/lib/es/form/interface';

import './index.scss';

function Profile(this: any) {
  const [pageType, setPageType] = React.useState<'preview' | 'edit'>('preview');
  const [loading, setLoading] = React.useState(false);
  const [changePasswordModalVisible, setChangePasswordModalVisible] = React.useState(false);

  const { t } = useTranslation();
  const [user, setUser] = useUserAtom();
  const formApiRef = React.useRef<FormApi>();
  const { routeToLoginPage } = useLoginPage();

  const isLoading = !user;

  const handleUpdateUserInfo = React.useCallback(async () => {
    if (!formApiRef.current) return;

    const { nickname } = formApiRef.current.getValues();

    if (!nickname) {
      // 清空了 nickname，就当没有改动，直接取消
      return setPageType('preview');
    }

    if (nickname.length > 32) {
      return formApiRef.current.setError('nickname', t('昵称长度不能超过 32 字符'));
    }

    try {
      setLoading(true);
      await User.update({ nickname });

      Toast.success(t('信息已更新'));
      setPageType('preview');
      setUser(prev => {
        prev!.nickname = nickname;
        return Object.assign({}, prev);
      });
    } catch (err) {
      Toast.error(t('更新用户信息失败'));
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmitChangePassword = React.useCallback(async (pass: string, newPass: string) => {
    try {
      await User.updatePassword({ password: pass, newPassword: newPass });
      Toast.success(t('密码已修改，请重新登录'));

      setTimeout(() => {
        setChangePasswordModalVisible(false);
        setAuthCache(null);
        setUser(null);
        routeToLoginPage();
      });
    } catch (err) {
      if ((err as AxiosError)?.response?.status === 400) {
        Toast.error(t('旧密码错误，请重试'));
      } else {
        Toast.error(t('修改密码失败'));
      }
    }
  }, []);

  const renderProfileContentInfo = () => {
    if (pageType === 'edit') {
      return (
        <Spin spinning={loading}>
          <Form initValues={pick(user, ['email', 'nickname'])} getFormApi={_ => formApiRef.current = _}>
            <Form.Input field='email' label={t('邮箱')} disabled />
            <Form.Input field='nickname' label={t('昵称')} autofocus />
          </Form>
          <footer className={'profile-content-info-footer'}>
            <Button theme={'solid'} onClick={handleUpdateUserInfo}>{t('保存')}</Button>
            <Button type={'tertiary'} onClick={setPageType.bind(this, 'preview')}>{t('取消')}</Button>
          </footer>
        </Spin>
      );
    }

    return (
      <React.Fragment>
        <Descriptions>
          <Descriptions.Item itemKey={t('邮箱') as string}>
            {user?.email || ''}
          </Descriptions.Item>
          <Descriptions.Item itemKey={t('昵称') as string}>
            {user?.nickname || ''}
          </Descriptions.Item>
          <Descriptions.Item itemKey={t('密码') as string}>
            ****************
            <Button
              theme={'borderless'}
              type={'secondary'}
              size={'small'}
              style={{ marginLeft: 8 }}
              onClick={setChangePasswordModalVisible.bind(this, true)}
            >
              {t('修改密码')}
            </Button>
          </Descriptions.Item>
        </Descriptions>
        <footer className={'profile-content-info-footer'}>
          <Button type={'tertiary'} onClick={setPageType.bind(this, 'edit')} block>{t('修改基本信息')}</Button>
        </footer>
      </React.Fragment>
    );
  };

  return (
    <div className={'profile'}>
      <ContentHeader
        title={t('个人中心')}
        brief={t('在这里进行个人账号信息管理')}
        marginBottom={32}
      />
      <div className={'profile-content'}>
        <Skeleton
          className={'profile-content-avatar'}
          loading={isLoading}
          placeholder={<Skeleton.Avatar size={'extra-large'} />}
          active
        >
          <Avatar size={'extra-large'} color={'light-blue'} className={'profile-content-avatar'}>
            {(user?.nickname || '').slice(0, 2)}
          </Avatar>
        </Skeleton>
        <Skeleton
          className={'profile-content-info'}
          loading={isLoading}
          placeholder={(
            <React.Fragment>
              <Skeleton.Paragraph />
              <Skeleton.Paragraph style={{ marginTop: 32 }} />
            </React.Fragment>
          )}
          active
        >
          <div className={'profile-content-info'}>
            {renderProfileContentInfo()}
          </div>
        </Skeleton>
      </div>
      <ChangePasswordModal
        visible={changePasswordModalVisible}
        onCancel={setChangePasswordModalVisible.bind(this, false)}
        onSubmit={handleSubmitChangePassword}
      />
    </div>
  );
}

export default Profile;
