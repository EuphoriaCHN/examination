import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Question } from '@/api';

import { Button, Toast } from 'semi';
import { IconPlus } from 'semi-icons';
import ContentHeader from '@/components/ContentHeader';
import QuestionTable from '@/components/QuestionTable';

import { useQuestionAtom } from '@/containers/CreateQuestion/store';

import './index.scss';

type QuestionTableProps = GetComponentProps<typeof QuestionTable>;

function QuestionsList() {
  const [loading, setLoading] = React.useState(false);
  const [questionList, setQuestionList] = React.useState<IQuestionItem[]>([]);
  const [_total, setTotal] = React.useState(0);

  const { dispatcher: setCreateQuestionAtom } = useQuestionAtom();

  const { t } = useTranslation();
  const _navigate = useNavigate();

  const loadQuestionList = React.useCallback(async () => {
    try {
      setLoading(true);
      const { data, total } = await Question.list({});

      setQuestionList(data);
      setTotal(total);
    } catch (err) {
      Toast.error(t('获取题目列表失败'));
    } finally {
      setLoading(false);
    }
  }, []);

  const onDelete = React.useCallback<QuestionTableProps['onDelete']>(async record => {
    try {
      await Question.delete({ id: record.id });
      Toast.success(t('题目已删除'));
      loadQuestionList();
    } catch (err) {
      Toast.error(t('删除题目失败'));
    }
  }, []);

  const handleOnCreateQuestion = React.useCallback(() => {
    setCreateQuestionAtom(null);
    _navigate('/questions/create');
  }, []);

  React.useEffect(() => {
    loadQuestionList();
  }, []);

  return (
    <div className={'question-list'}>
      <ContentHeader
        title={t('题目列表')}
        brief={t('在这里进行题目的增删改查管理')}
      />
      <div className={'question-list-opts'}>
        <div />
        <div>
          <Button
            icon={<IconPlus />}
            theme={'solid'}
            onClick={handleOnCreateQuestion}
          >
            {t('添加题目')}
          </Button>
        </div>
      </div>
      <QuestionTable
        dataSource={questionList}
        className={'question-list-table'}
        onDelete={onDelete}
        loading={loading}
        onRowClick={record => _navigate(`/questions/detail/${record.id}`)}
      />
    </div>
  );
}

export default QuestionsList;
