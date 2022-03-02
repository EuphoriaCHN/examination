import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUserAtom } from '@/store/user';
import { RouterBlocked } from '@/common/utils/constants';

import { Layout, Nav } from 'semi';
import {
  IconPieChart2Stroked,
  IconElementStroked,
  IconOrderedListStroked,
  IconSettingStroked,
  IconTrueFalseStroked,
  IconUserStroked
} from 'semi-icons';

import './index.scss';

type NavProps = GetComponentProps<typeof Nav>;

function Sider() {
  const [activeKey, setActiveKey] = React.useState<string>('');
  const [user] = useUserAtom();

  const { t } = useTranslation();
  const _navigate = useNavigate();
  const _location = useLocation();

  const NAV_ITEMS = React.useMemo<NavProps['items']>(() => [{
    itemKey: 'information',
    text: t('站点信息'),
    icon: <IconPieChart2Stroked />,
    blockList: RouterBlocked.Information
  }, {
    itemKey: 'exercise',
    text: `${t('自我练习')} (beta)`,
    icon: <IconTrueFalseStroked />
  }, {
    itemKey: 'generate',
    text: t('生成题目'),
    icon: <IconElementStroked />,
    blockList: RouterBlocked.Generate
  }, {
    itemKey: 'questions',
    text: t('题目列表'),
    icon: <IconOrderedListStroked />
  }, {
    itemKey: 'management',
    text: t('站点管理'),
    icon: <IconSettingStroked />,
    blockList: RouterBlocked.Management
  }, {
    itemKey: 'profile',
    text: t('个人中心'),
    icon: <IconUserStroked />
  }].filter(item => {
    if (!Array.isArray(item.blockList)) return true;
    if (!user) return true;
    return !item.blockList.includes(user.permission);
  }), [user]);

  React.useLayoutEffect(() => {
    (function () {
      for (const { itemKey } of NAV_ITEMS as any) {
        if (new RegExp(`^\/${itemKey}`).test(_location.pathname)) {
          return setActiveKey(itemKey);
        }
      }
      if (_location.pathname === '/') {
        return setActiveKey((NAV_ITEMS as any)[0].itemKey);
      }

      setActiveKey('');
    })();
  }, [_location.pathname, NAV_ITEMS]);

  const handleOnNavSelect = React.useCallback<NavProps['onSelect']>(({ itemKey }) => {
    typeof itemKey === 'string' && _navigate(itemKey);
  }, []);

  return (
    <Layout.Sider className={'site-sider'}>
      <Nav
        onSelect={handleOnNavSelect}
        className={'site-sider-nav'}
        items={NAV_ITEMS}
        selectedKeys={[activeKey]}
        footer={{ collapseButton: true }}
      />
    </Layout.Sider>
  );
}

export default Sider;
