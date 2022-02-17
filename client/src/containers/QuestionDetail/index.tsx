import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from '@/i18n';

import { Question } from '@/api';

import { Toast } from 'semi';

function QuestionDetail() {
  const [loading, setLoading] = React.useState(false);

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
      console.log(detail);
    } catch (err) {

    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    getQuestionDetail(questionId);
  }, [questionId]);

  return <span>{questionId}</span>;
}

export default QuestionDetail;
