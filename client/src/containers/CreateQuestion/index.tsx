import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/i18n';

import { Question } from '@/api';

import { Button, Toast } from 'semi';
import ContentHeader from '@/components/ContentHeader';
import QuestionForm from '@/components/QuestionForm';

import { STEP } from '@/components/LevelSlider';

import type { BaseFormApi as FormApi } from '@douyinfe/semi-foundation/lib/es/form/interface';

import './index.scss';

function CreateQuestion() {
  const [loading, setLoading] = React.useState(false);
  const { t } = useTranslation();
  const formRef = React.useRef<FormApi>();
  const _navigate = useNavigate();

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
      await Question.create(fields);
      Toast.success(t('题目已添加'));

      setTimeout(() => _navigate(-1));
    } catch (err) {
      Toast.error(t('添加题目失败'));
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      formRef.current?.setValue('level', 25);
    });
  }, []);

  return (
    <div className={'create-question'}>
      <ContentHeader
        title={t('创建题目')}
        brief={t('在这里创建一个新的面试题目')}
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
        {t('确认创建')}
      </Button>
    </div>
  );
}

export default CreateQuestion;
