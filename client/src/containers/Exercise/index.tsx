import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Toast } from 'semi';
import { IconSync } from 'semi-icons';
import { withFallbackRenderer } from '@/components/FallbackRenderer';
import QuestionViewer from '@/components/QuestionViewer';

import { Question } from '@/api';

import type { SUPPORT_LANGUAGES_TYPE } from '@/components/CodeEditorV2';

import './index.scss';

function Exercise() {
  const { t } = useTranslation();
  const [record, setRecord] = React.useState<IQuestionItem>();
  const [loading, setLoading] = React.useState(false);
  const [activeLang, setActiveLang] = React.useState<SUPPORT_LANGUAGES_TYPE>('javascript');

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

  const renderQuestionEditorFooter = React.useCallback<GetComponentProps<typeof QuestionViewer>['renderCodeEditorFooter']>(([exec]) => {
    return (
      <React.Fragment>
        {exec}
        <Button
          icon={<IconSync />}
          type={'tertiary'}
          onClick={loadQuestion}
        >
          {t('随机一题')}
        </Button>
      </React.Fragment>
    );
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
          contentHeight={'calc(100vh - 216px)'}
          activeLang={activeLang}
          onActiveLangChange={setActiveLang}
          renderCodeEditorFooter={renderQuestionEditorFooter}
        />
      </div>
    </div>
  );
}

export default withFallbackRenderer()(Exercise);
