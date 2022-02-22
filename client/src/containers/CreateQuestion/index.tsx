import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { pick } from 'lodash';

import { Question, Category, Tag } from '@/api';

import { Button, Toast, Spin } from 'semi';
import ContentHeader from '@/components/ContentHeader';
import QuestionForm from '@/components/QuestionForm';
import { withFallbackRenderer } from '@/components/FallbackRenderer';

import { STEP } from '@/components/LevelSlider';
import { QuestionDifficultyLevel } from '@/common/utils/constants';
import { useQuestionAtom } from './store';
import { useCategoriesAtom } from '@/store/categories';
import { useTagsAtom } from '@/store/tags';

import type { BaseFormApi as FormApi } from '@douyinfe/semi-foundation/lib/es/form/interface';

import './index.scss';

function CreateQuestion() {
  const [initLoading, setInitLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { t } = useTranslation();
  const formRef = React.useRef<FormApi>();
  const _navigate = useNavigate();
  const [questionAtom] = useQuestionAtom();
  const { dispatcher: setCategories } = useCategoriesAtom();
  const { dispatcher: setTags } = useTagsAtom();

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

  const initData = React.useCallback(async () => {
    try {
      const [categories, tags] = await Promise.all([
        Category.list({}),
        Tag.list({})
      ]);

      setCategories(categories);
      setTags(tags.data);

      if (pageType === 'edit') {
        // 拉项目详情
        const questionDetail = await Question.detail({ id: questionAtom?.id || 0 });

        formRef.current?.setValues(Object.assign(
          {
            level: questionDetail.level * STEP,
            categories: questionDetail.categories.map(item => item.id),
            tags: questionDetail.tags.map(item => item.id),
          },
          pick(questionDetail, ['title', 'content', 'comment', 'answer'])
        ));
      } else {
        // create
        formRef.current?.setValue('level', QuestionDifficultyLevel.EASY * STEP);
      }

      setInitLoading(false);
    } catch (err) {
      Toast.error(t('初始化数据失败，请重试'));
    }
  }, []);

  React.useEffect(() => {
    setInitLoading(true);

    setTimeout(initData);
  }, []);

  return (
    <Spin spinning={initLoading} size={'large'}>
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
    </Spin>
  );
}

export default withFallbackRenderer()(CreateQuestion);
