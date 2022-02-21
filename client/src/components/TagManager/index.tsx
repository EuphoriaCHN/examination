import React from 'react';
import { useTranslation } from 'react-i18next';

import { Input, Button } from 'semi';
import { IconPlus, IconSearch } from 'semi-icons';
import ContentHeader from '@/components/ContentHeader';

import './index.scss';

function TagManager() {
  const { t } = useTranslation();

  return (
    <div className={'tag-manager'}>
      <ContentHeader
        title={t('标签管理')}
        brief={t('在这里进行对题目标签的管理')}
        className={'tag-manager-header'}
      />
      <div className={'tag-manager-opts'}>
        <div className={'tag-manager-opts-left'}>
          <Input
            placeholder={t('搜索标签') as string}
            prefix={<IconSearch />}
            showClear
          />
        </div>
        <div className={'tag-manager-opts-right'}>
          <Button theme={'solid'} icon={<IconPlus />}>{t('添加标签')}</Button>
        </div>
      </div>
      <div className={'tag-manager-content'}>

      </div>
    </div>
  );
}

export default TagManager;
