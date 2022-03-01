import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSemiMode } from '@/common/hooks/useSemiMode';

import { Layout, Nav, Dropdown, Button, Tooltip, Avatar } from 'semi';
import { IconLanguage, IconSun, IconMoon } from 'semi-icons';
import UserAvatarMenu from '@/components/UserAvatarMenu';

import './index.scss';

const LOCALE_LABEL: { [k: string]: string } = {
  'zh-CN': '简体中文',
  'en-US': 'English'
};

function Header(this: any) {
  const { i18n, t } = useTranslation();
  const { mode, setMode } = useSemiMode();

  const handleChangeLocale = React.useCallback((langCode: string) => {
    i18n.changeLanguage(langCode);
  }, []);

  const handleChangeMode = React.useCallback(() => {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const renderNavFooter = React.useMemo(() => (
    <div className={'site-header-nav-footer'}>
      <Tooltip
        position={'bottom'}
        content={t('切换到{mode}模式', { mode: mode === 'light' ? t('暗色') : t('亮色') })}
      >
        <Button
          icon={mode === 'light' ? <IconMoon size={'large'} /> : <IconSun size={'large'} />}
          onClick={handleChangeMode}
          theme={'borderless'}
          type={'tertiary'}
        />
      </Tooltip>
      <Dropdown
        trigger={'hover'}
        position={'bottomRight'}
        render={(
          <Dropdown.Menu>
            {Object.entries(LOCALE_LABEL).map(([langCode, label]) => (
              <Dropdown.Item
                active={i18n.language === langCode}
                key={langCode}
                onClick={handleChangeLocale.bind(this, langCode)}
              >
                {label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        )}
        showTick
      >
        <Button icon={<IconLanguage size={'large'} />} type={'tertiary'} theme={'borderless'} />
      </Dropdown>
      <UserAvatarMenu />
    </div>
  ), [mode, UserAvatarMenu]);

  return (
    <Layout.Header className={'site-header'}>
      <Nav
        mode={'horizontal'}
        footer={renderNavFooter}
      />
    </Layout.Header>
  );
}

export default Header;
