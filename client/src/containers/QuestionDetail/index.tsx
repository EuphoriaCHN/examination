import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Toast, Button } from 'semi';
import { IconEdit } from 'semi-icons';
import QuestionViewer from '@/components/QuestionViewer';
import ContentHeader from '@/components/ContentHeader';
import { withFallbackRenderer } from '@/components/FallbackRenderer';

import { useQuestionAtom } from '@/containers/CreateQuestion/store';

import { Question } from '@/api';

function QuestionDetail() {
  const [loading, setLoading] = React.useState(false);
  const [questionDetail, setQuestionDetail] = React.useState<IQuestionItem>();

  const { questionId } = useParams<{ questionId: string }>();
  const { t } = useTranslation();
  const { dispatcher: setCreateQuestionAtom } = useQuestionAtom();
  const _navigate = useNavigate();

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

  const handleClickEditQuestion = React.useCallback(() => {
    if (!questionDetail) return;

    setCreateQuestionAtom(questionDetail);
    _navigate('/questions/edit');
  }, [questionDetail]);

  React.useEffect(() => {
    getQuestionDetail(questionId);
  }, [questionId]);

  return (
    <div className={'question-detail'}>
      <ContentHeader
        footer={(
          <Button
            theme={'solid'}
            icon={<IconEdit />}
            onClick={handleClickEditQuestion}
          >
            {t('编辑题目')}
          </Button>
        )}
        allowGoBack
      />
      <QuestionViewer record={questionDetail} loading={loading} />
    </div>
  );
}

export default withFallbackRenderer()(QuestionDetail);
