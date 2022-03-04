import React from 'react';
import { useTranslation } from 'react-i18next';

import { Tabs, TabPane } from 'semi';
import { IconBeaker, IconArticle } from 'semi-icons';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import QuestionDescription from '@/components/QuestionDescription';
import DraggableWrapper from '@/components/DraggableWrapper';

import './index.scss';

interface IProps {
  record?: IQuestionItem;
  loading?: boolean;
  contentHeight?: string | number;
}

function QuestionViewer(props: IProps) {
  const { t } = useTranslation();

  const { loading, record = {} as IQuestionItem } = props;

  return (
    <div className={'question-viewer'}>
      <Tabs type={'line'} size={'small'}>
        <TabPane
          // See: https://github.com/DouyinFE/semi-design/pull/631
          // @ts-ignore semi 2.3.1 DTS 有问题
          icon={<IconArticle />}
          tab={t('题目描述')}
          itemKey='description'
        >
          <DraggableWrapper>
            <QuestionDescription
              record={record}
              loading={loading}
            />
            <QuestionDescription
              record={record}
              loading={loading}
            />
          </DraggableWrapper>
        </TabPane>
        <TabPane
          // See: https://github.com/DouyinFE/semi-design/pull/631
          // @ts-ignore semi 2.3.1 DTS 有问题
          icon={<IconBeaker />}
          tab={t('题解')}
          itemKey='answer'
        >
          <div style={{ boxSizing: 'border-box', padding: '20px' }}>
            <MarkdownRenderer loading={props.loading} renderEmpty>
              {record?.answer || ''}
            </MarkdownRenderer>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default QuestionViewer;
