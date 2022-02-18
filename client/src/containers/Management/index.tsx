import React from 'react';
import { useTranslation } from 'react-i18next';

import { Tabs, TabPane } from 'semi';
import CategoryManager from '@/components/CategoryManager';
import TagManager from '@/components/TagManager';

import './index.scss';

function Management() {
  const { t } = useTranslation();

  const TABS = React.useMemo(() => [{
    label: t('分类管理'),
    itemKey: 'categories',
    component: <CategoryManager />
  }, {
    label: t('标签管理'),
    itemKey: 'tags',
    component: <TagManager />
  }] as const, []);

  return (
    <div className={'management'}>
      <Tabs
        tabPosition={'left'}
      >
        {TABS.map(item => (
          <TabPane
            tab={item.label}
            itemKey={item.itemKey}
            key={item.itemKey}
          >
            {item.component}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}

export default Management;
