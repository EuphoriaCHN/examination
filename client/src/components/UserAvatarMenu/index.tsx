import React from 'react';
import { useTranslation } from 'react-i18next';
import { useUserAtom } from '@/store/user';

import { Avatar, Dropdown, Typography } from 'semi';
import { IconUser } from 'semi-icons';

import './index.scss';

function UserAvatarMenu() {
  const [user] = useUserAtom();
  const { t } = useTranslation();

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
          <Dropdown.Item icon={<IconUser />} type={'tertiary'}>
            {t('个人中心')}
          </Dropdown.Item>
          <Dropdown.Title className={'user-avatar-menu-footer'}>
            {t('退出登录')}
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
