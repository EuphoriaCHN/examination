import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Question } from '@/api';

import { Button, Toast } from 'semi';
import { IconPlus } from 'semi-icons';
import ContentHeader from '@/components/ContentHeader';
import QuestionTable from '@/components/QuestionTable';

import './index.scss';

function QuestionsList() {
  const [questionList, setQuestionList] = React.useState<IQuestionItem[]>([]);
  const [_total, setTotal] = React.useState(0);

  const { t } = useTranslation();
  const _navigate = useNavigate();

  const loadQuestionList = React.useCallback(async () => {
    try {
      const { data, total } = await Question.list({});

      setQuestionList(data);
      setTotal(total);
    } catch (err) {
      Toast.error(t('获取题目列表失败'));
    }
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
            onClick={() => _navigate('/questions/create')}
          >
            {t('添加题目')}
          </Button>
        </div>
      </div>
      <QuestionTable
        dataSource={questionList}
        className={'question-list-table'}
      />
    </div>
  );
}

export default QuestionsList;
