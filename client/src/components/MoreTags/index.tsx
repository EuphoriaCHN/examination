import React from 'react';

import { Tag, Tooltip, Typography } from 'semi';

import './index.scss';

interface IProps<T> {
  items: T[];
  maxCount: number;
  labelKey: keyof T;
}

function MoreTags<T>(props: IProps<T>) {
  if (!Array.isArray(props.items) || !props.items.length) {
    return <div className={'more-tags'}>{'-'}</div>
  }

  const showTags = props.items.slice(0, props.maxCount);
  const hidedTags = props.items.slice(props.maxCount);

  return (
    <div className={'more-tags'}>
      {showTags.map((item, index) => <Tag key={index}>{item[props.labelKey]}</Tag>)}
      {!!hidedTags.length && (
        <Tooltip content={hidedTags.map(item => item[props.labelKey]).join(', ')}>
          <Typography.Text type={'tertiary'}>+{hidedTags.length}</Typography.Text>
        </Tooltip>
      )}
    </div>
  );
}

export default MoreTags;