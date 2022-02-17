import React from 'react';
import { useTranslation } from 'react-i18next';

import { Typography, Skeleton, Tabs, TabPane } from 'semi';
import { IconBeaker, IconArticle } from 'semi-icons';

import QuestionDescription from '@/components/QuestionDescription';

import './index.scss';

interface IProps {
  record?: IQuestionItem;
  loading?: boolean;
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
          <QuestionDescription record={record} loading={loading} />
        </TabPane>
        <TabPane
          // See: https://github.com/DouyinFE/semi-design/pull/631
          // @ts-ignore semi 2.3.1 DTS 有问题
          icon={<IconBeaker />}
          tab={t('题解')}
          itemKey='answer'
        >

        </TabPane>
      </Tabs>
    </div>
  );
}

export default QuestionViewer;
