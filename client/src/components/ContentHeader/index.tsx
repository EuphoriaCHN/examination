import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cls from 'classnames';

import { Typography } from 'semi';
import { IconArrowLeft } from 'semi-icons';

import './index.scss';

interface IProps {
  breadcrumb?: any[];
  title?: React.ReactNode;
  brief?: React.ReactNode;
  allowGoBack?: boolean;
  marginBottom?: number;
  footer?: React.ReactNode;

  className?: string;
  style?: React.CSSProperties;
}

function ContentHeader(props: IProps) {
  const { t } = useTranslation();
  const _navigate = useNavigate();

  const { breadcrumb, title, brief, allowGoBack } = props;

  const renderTitle = React.useMemo(() => {
    if (!title) return null;

    if (typeof title === 'string') {
      return <Typography.Title heading={6}>{title}</Typography.Title>;
    }

    return title;
  }, [title]);

  const renderBrief = React.useMemo(() => {
    if (!brief) return null;

    if (typeof brief === 'string') {
      return <Typography.Text type={'tertiary'} size={'small'}>{brief}</Typography.Text>;
    }

    return brief;
  }, [brief]);

  return (
    <header
      className={cls('content-header', props.className)}
      style={Object.assign(props.style || {}, { marginBottom: props.marginBottom })}
    >
      <div>
        {!!allowGoBack ? (
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
        {renderTitle}
        {renderBrief}
      </div>
      <div>
        {props.footer}
      </div>
    </header>
  );
}

export default ContentHeader;
