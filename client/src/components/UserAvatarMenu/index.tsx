import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUserAtom } from '@/store/user';
import { setAuthCache } from '@/common/utils';
import { useLoginPage } from '@/common/hooks/useLoginPage';

import { Avatar, Dropdown, Toast, Typography } from 'semi';
import { IconUser } from 'semi-icons';

import './index.scss';

function UserAvatarMenu() {
  const [user, setUser] = useUserAtom();
  const { t } = useTranslation();
  const { routeToLoginPage } = useLoginPage();
  const _navigate = useNavigate();

  const handleOnClickLogout = React.useCallback(() => {
    // 前端删除 local storage 即可
    setAuthCache(null);
    setUser(null);

    Toast.success(t('用户已登出'));
    routeToLoginPage(true);
  }, []);

  if (!user) return null;

  const renderUserAvatar = (
    <Avatar size={'small'} color={'light-blue'} className={'user-avatar'}>
      {user.nickname.slice(0, 2)}
    </Avatar>
  );

  return (
    <Dropdown
      render={(
        <Dropdown.Menu className={'user-avatar-menu'}>
          <Dropdown.Title className={'user-avatar-menu-title'}>
            {renderUserAvatar}
            <div className={'user-avatar-menu-title-info'}>
              <Typography.Paragraph ellipsis={{ rows: 1 }} strong>
                {user.nickname}
              </Typography.Paragraph>
              <Typography.Paragraph ellipsis={{ rows: 1 }} size={'small'} type={'tertiary'}>
                {user.email}
              </Typography.Paragraph>
            </div>
          </Dropdown.Title>
          <Dropdown.Item icon={<IconUser />} type={'tertiary'} onClick={() => _navigate('/profile')}>
            {t('个人中心')}
          </Dropdown.Item>
          <Dropdown.Title className={'user-avatar-menu-footer'}>
            <div onClick={handleOnClickLogout}>
              {t('退出登录')}
            </div>
          </Dropdown.Title>
        </Dropdown.Menu>
      )}
      trigger={'click'}
      position={'bottomRight'}
    >
      {renderUserAvatar}
    </Dropdown>
  );
}

export default UserAvatarMenu;
