import React from 'react';
import { useTranslation } from 'react-i18next';

import { Tabs, TabPane } from 'semi';
import { IconBeaker, IconArticle } from 'semi-icons';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import QuestionDescription from '@/components/QuestionDescription';
import DraggableWrapper from '@/components/DraggableWrapper';
import CodeEditor from '@/components/CodeEditor';

import './index.scss';

interface IProps {
  record?: IQuestionItem;
  loading?: boolean;
  contentHeight?: string | number;
}

function QuestionViewer(props: IProps) {
  const { t } = useTranslation();

  const { loading, record = {} as IQuestionItem } = props;

  const contentStyle: React.CSSProperties = !!props.contentHeight ? {
    maxHeight: props.contentHeight,
    overflow: 'hidden'
  } : {};

  const answerStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    padding: 20,
    overflow: 'auto',
    maxHeight: props.contentHeight,
  };

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
          <DraggableWrapper style={contentStyle}>
            <QuestionDescription
              record={record}
              loading={loading}
              maxHeight={props.contentHeight}
            />
            <CodeEditor
              language={'tsx'}
              maxHeight={props.contentHeight}
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
          <div style={answerStyle}>
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
