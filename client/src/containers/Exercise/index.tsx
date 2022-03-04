import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Toast } from 'semi';
import { IconSync } from 'semi-icons';
import { withFallbackRenderer } from '@/components/FallbackRenderer';
import QuestionViewer from '@/components/QuestionViewer';

import { Question } from '@/api';

import './index.scss';

function Exercise() {
  const { t } = useTranslation();
  const [record, setRecord] = React.useState<IQuestionItem>();
  const [loading, setLoading] = React.useState(false);

  // 随机加载一个题目
  const loadQuestion = React.useCallback(async () => {
    try {
      setLoading(true);

      const record = await Question.random({});
      setRecord(record);
      setLoading(false);
    } catch (err) {
      Toast.error(t('获取题目失败'));
    }
  }, []);

  React.useEffect(() => {
    loadQuestion();
  }, []);

  return (
    <div className={'exercise'}>
      <div className={'exercise-content'}>
        <QuestionViewer
          loading={loading}
          record={record}
          // header & footer each 60
          // content padding top & bottom each 32
          // tabs header 32
          // exercise footer 41
          contentHeight={'calc(100vh - 257px)'}
        />
      </div>
      <footer className={'exercise-footer'}>
        <Button
          icon={<IconSync />}
          type={'tertiary'}
          onClick={loadQuestion}
        >
          {t('随机一题')}
        </Button>
      </footer>
    </div>
  );
}

export default withFallbackRenderer()(Exercise);
