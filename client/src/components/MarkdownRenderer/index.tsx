import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';

import remarkGfm from 'remark-gfm';
import { MarkdownComponents } from './components';
import { Skeleton, Empty } from 'semi';
import { IllustrationNoContent, IllustrationNoContentDark } from '@douyinfe/semi-illustrations';

import { createIllustration } from '@/common/utils';

import './index.scss';

const Illustration = createIllustration({
  image: IllustrationNoContent,
  darkImage: IllustrationNoContentDark
});

interface IProps {
  children: string;
  loading?: boolean;
  renderEmpty?: boolean | React.ReactNode | (() => React.ReactNode);
  className?: string;
}

function MarkdownRenderer(props: IProps) {
  const { t } = useTranslation();

  const renderContent = () => {
    if (!!props.renderEmpty && !props.children) {
      let el: React.ReactNode;

      if (typeof props.renderEmpty === 'boolean') {
        el = <Empty style={{ paddingTop: 24 }} title={t('暂无数据')} image={<Illustration />} />;
      } else if (typeof props.renderEmpty === 'function') {
        el = props.renderEmpty();
      } else {
        el = props.renderEmpty;
      }

      return el;
    }

    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={MarkdownComponents}
        className={props.className}
      >
        {props.children}
      </ReactMarkdown>
    );
  };

  return (
    <div className={'markdown-renderer'}>
      <Skeleton
        placeholder={(
          <React.Fragment>
            <Skeleton.Paragraph />
            <Skeleton.Paragraph style={{ marginTop: 32 }} />
          </React.Fragment>
        )}
        loading={!!props.loading}
        active
      >
        {renderContent()}
      </Skeleton>
    </div>
  );
}

export default MarkdownRenderer;
