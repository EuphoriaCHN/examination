import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Question } from '@/api';
import QuestionViewer from '@/components/QuestionViewer';

import { Toast } from 'semi';
import ContentHeader from '@/components/ContentHeader';

function QuestionDetail() {
  const [loading, setLoading] = React.useState(false);
  const [questionDetail, setQuestionDetail] = React.useState<IQuestionItem>();

  const { questionId } = useParams<{ questionId: string }>();
  const { t } = useTranslation();

  const getQuestionDetail = React.useCallback(async (id: unknown): Promise<any> => {
    id = Number(id);

    if (isNaN(id as any) || typeof id !== 'number') {
      return Toast.error(t('无效 ID'));
    }

    try {
      setLoading(true);
      const detail = await Question.detail({ id });
      setQuestionDetail(detail);
    } catch (err) {
      Toast.error(t('获取题目信息失败'));
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    getQuestionDetail(questionId);
  }, [questionId]);

  return (
    <div className={'question-detail'}>
      <ContentHeader allowGoBack />
      <QuestionViewer record={questionDetail} loading={loading} />
    </div>
  );
}

export default QuestionDetail;
