import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Layout, Nav } from 'semi';
import {
  IconPieChart2Stroked,
  IconElementStroked,
  IconOrderedListStroked,
  IconSettingStroked,
  IconTrueFalseStroked
} from 'semi-icons';

import './index.scss';

type NavProps = GetComponentProps<typeof Nav>;

function Sider() {
  const [activeKey, setActiveKey] = React.useState<string>('');

  const { t } = useTranslation();
  const _navigate = useNavigate();
  const _location = useLocation();

  const NAV_ITEMS = React.useMemo<NavProps['items']>(() => [{
    itemKey: 'information',
    text: t('站点信息'),
    icon: <IconPieChart2Stroked />
  }, {
    itemKey: 'exercise',
    text: t('自我练习'),
    icon: <IconTrueFalseStroked />
  }, {
    itemKey: 'generate',
    text: t('生成题目'),
    icon: <IconElementStroked />
  }, {
    itemKey: 'questions',
    text: t('题目列表'),
    icon: <IconOrderedListStroked />
  }, {
    itemKey: 'management',
    text: t('站点管理'),
    icon: <IconSettingStroked />
  }], []);

  React.useLayoutEffect(() => {
    (function () {
      for (const { itemKey } of NAV_ITEMS as any) {
        if (new RegExp(`^\/${itemKey}`).test(_location.pathname)) {
          return setActiveKey(itemKey);
        }
      }
      setActiveKey((NAV_ITEMS as any)[0].itemKey);
    })();
  }, [_location.pathname]);

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
