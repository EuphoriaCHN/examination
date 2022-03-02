import React from 'react';
import I18n from '@/i18n';

import { Tabs, TabPane } from 'semi';
import CategoryManager from '@/components/CategoryManager';
import TagManager from '@/components/TagManager';

import { withFallbackRenderer } from '@/components/FallbackRenderer';
import { withMultiHoc } from '@/common/utils';
import { withAuthWrapper } from '@/components/AuthWrapper';
import { RouterBlocked } from '@/common/utils/constants';

import './index.scss';

const TABS = [{
  label: I18n.t('分类管理'),
  itemKey: 'categories',
  Component: CategoryManager
}, {
  label: I18n.t('标签管理'),
  itemKey: 'tags',
  Component: TagManager
}] as const;

function Management() {
  return (
    <div className={'management'}>
      <Tabs
        tabPosition={'left'}
        className={'management-tabs'}
        keepDOM={false}
      >
        {TABS.map(item => (
          <TabPane
            tab={item.label}
            itemKey={item.itemKey}
            key={item.itemKey}
          >
            <div className={'management-content'}>
              {<item.Component />}
            </div>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}

export default withMultiHoc([
  withFallbackRenderer(),
  withAuthWrapper({ blockList: RouterBlocked.Management })
], Management);
