import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Empty, Button } from 'semi';
import { IllustrationNotFound, IllustrationNotFoundDark } from '@douyinfe/semi-illustrations';
import { withFallbackRenderer } from '@/components/FallbackRenderer';
import { createIllustration } from '@/common/utils';

import './index.scss';

const Illustration = createIllustration({
  image: IllustrationNotFound,
  darkImage: IllustrationNotFoundDark
});

function NotFound() {
  const { t } = useTranslation();
  const _navigate = useNavigate();

  const handleGoHome = React.useCallback(() => {
    _navigate('/');
  }, []);

  return (
    <Empty
      image={<Illustration />}
      title={t('Ops! 页面找不到了')}
    >
      <Button theme={'solid'} onClick={handleGoHome} block>{t('回到主页')}</Button>
    </Empty>
  );
}

export default withFallbackRenderer()(NotFound);
