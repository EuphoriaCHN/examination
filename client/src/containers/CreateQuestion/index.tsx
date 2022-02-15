import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from '@/i18n';
import { pick } from 'lodash';

import { Question } from '@/api';

import { Button, Toast } from 'semi';
import ContentHeader from '@/components/ContentHeader';
import QuestionForm from '@/components/QuestionForm';

import { STEP } from '@/components/LevelSlider';
import { useQuestionAtom } from './store';

import type { BaseFormApi as FormApi } from '@douyinfe/semi-foundation/lib/es/form/interface';

import './index.scss';

function CreateQuestion() {
  const [loading, setLoading] = React.useState(false);
  const { t } = useTranslation();
  const formRef = React.useRef<FormApi>();
  const _navigate = useNavigate();
  const [questionAtom] = useQuestionAtom();

  const { type: pageType = 'create' } = useParams<{ type: 'create' | 'edit' }>();

  const handleSubmit = React.useCallback(async () => {
    if (!formRef.current) return;

    setLoading(true);

    try {
      await formRef.current.validate();
    } catch (err) {
      return setLoading(false);
    }

    const fields = formRef.current.getValues();
    fields.level = ~~(fields.level / STEP);

    try {
      if (pageType === 'create') {
        await Question.create(fields);
        Toast.success(t('题目已添加'));
      } else {
        await Question.update(Object.assign({
          id: questionAtom?.id
        }, fields));
        Toast.success(t('题目已保存'));
      }

      setTimeout(() => _navigate(-1));
    } catch (err) {
      Toast.error(pageType === 'create' ? t('添加题目失败') : t('修改题目失败'));
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      if (pageType === 'edit' && !!questionAtom) {
        formRef.current?.setValues(Object.assign({
          level: questionAtom.level * STEP
        }, pick(questionAtom, ['title', 'content', 'comment', 'answer'])));
      } else {
        formRef.current?.setValue('level', 1 * STEP);
      }
    });
  }, []);

  return (
    <div className={'create-question'}>
      <ContentHeader
        title={pageType === 'create' ? t('创建题目') : t('更新题目')}
        brief={pageType === 'create' ? t('在这里创建一个新的面试题目') : t('更新已有的面试题目')}
        allowGoBack
      />
      <QuestionForm getFormApi={_ => formRef.current = _} />
      <Button
        className={'create-question-submit'}
        theme={'solid'}
        onClick={handleSubmit}
        loading={loading}
        block
      >
        {pageType === 'create' ? t('确认创建') : t('更新题目')}
      </Button>
    </div>
  );
}

export default CreateQuestion;
