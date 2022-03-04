import React from 'react';
import { useTranslation } from 'react-i18next';

import { Skeleton, Typography } from 'semi';
import { IconLikeThumb, IconFlag, IconLayers, IconColorPalette } from 'semi-icons';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import MoreTags from '@/components/MoreTags';

import { QuestionDifficultyColors, QuestionDifficultyLevel, QuestionDifficultyLabel } from '@/common/utils/constants';

import './index.scss';

export type QuestionDescriptionRecord = TypeHelper.ConvertStructure<Partial<IQuestionItem>, {
  required: 'title' | 'id' | 'level' | 'hotCount' | 'content';
}>;

export interface IProps {
  record?: QuestionDescriptionRecord
  loading?: boolean;
  maxHeight?: string | number;
}

function QuestionDescription(props: IProps) {
  const { t } = useTranslation();

  const { record = {} as QuestionDescriptionRecord, loading } = props;

  const TAGS = [{
    label: t('难度'),
    key: 'level',
    render: (level: QuestionDifficultyLevel) => (
      <span style={{ color: QuestionDifficultyColors[level]?.color }}>
        {QuestionDifficultyLabel[level]}
      </span>
    ),
    icon: <IconFlag size={'small'} />
  }, {
    label: t('热度'),
    key: 'hotCount',
    render: (hotCount: number) => (
      <span>
        {hotCount}
      </span>
    ),
    icon: <IconLikeThumb size={'small'} />
  }, {
    label: t('分类'),
    key: 'categories',
    render: (categories: ICategoryItem[]) => <MoreTags items={categories} maxCount={2} labelKey={'name'} />,
    icon: <IconLayers size={'small'} />,
  }, {
    label: t('标签'),
    key: 'tags',
    render: (tags: ITagItem[]) => <MoreTags items={tags} maxCount={2} labelKey={'name'} />,
    icon: <IconColorPalette size={'small'} />
  }] as const;

  return (
    <div className={'question-description'} style={{ maxHeight: props.maxHeight }}>
      <header className={'question-description-header'}>
        <Skeleton
          placeholder={<Skeleton.Title />}
          loading={loading}
          active
        >
          <Typography.Title heading={6}>{record.id}. {record.title}</Typography.Title>
        </Skeleton>
        <div className={'question-description-header-tags'}>
          {TAGS.map(item => (
            <Skeleton
              placeholder={<Skeleton.Title />}
              loading={loading}
              style={{ width: 80 }}
              key={item.key}
              active
            >
              <Typography.Text
                type={'tertiary'}
                size={'small'}
                className={'question-description-header-tags-item'}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.render(record[item.key] as any)}
              </Typography.Text>
            </Skeleton>
          ))}
        </div>
      </header>
      <div className={'question-description-content'}>
        <MarkdownRenderer loading={loading}>
          {record.content}
        </MarkdownRenderer>
      </div>
    </div>
  );
}

export default QuestionDescription;
