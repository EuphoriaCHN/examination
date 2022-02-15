import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/i18n';

import { Typography } from 'semi';
import { IconArrowLeft } from 'semi-icons';

import './index.scss';

interface IProps {
  breadcrumb?: any[];
  title: string;
  brief?: string;
  allowGoBack?: boolean;
}

function ContentHeader(props: IProps) {
  const { t } = useTranslation();
  const _navigate = useNavigate();

  return (
    <header className={'content-header'}>
      {!!props.allowGoBack ? (
        <Typography.Text
          className={'content-header-back'}
          size={'small'}
          type={'tertiary'}
          onClick={() => _navigate(-1)}
        >
          <IconArrowLeft size={'small'} />
          <span>{t('返回')}</span>
        </Typography.Text>
      ) : null}
      <Typography.Title heading={6}>{props.title}</Typography.Title>
      {!!props.brief && <Typography.Text type={'tertiary'} size={'small'}>{props.brief}</Typography.Text>}
    </header>
  );
}

export default ContentHeader;
