import React from 'react';
import { useTranslation } from 'react-i18next';

import ContentHeader from '@/components/ContentHeader';
import { withFallbackRenderer } from '@/components/FallbackRenderer';

import './index.scss';

function Exercise() {
  const { t } = useTranslation();

  return (
    <div className={'exercise'}>
      <ContentHeader
        title={`${t('刷题模式')} (beta)`}
        brief={t('在这里进行自我练习，提升个人能力')}
      />
    </div>
  );
}

export default withFallbackRenderer()(Exercise);
