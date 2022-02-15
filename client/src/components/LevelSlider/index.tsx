import React from 'react';
import cls from 'classnames';
import { useTranslation } from '@/i18n';

import { Form, Slider } from 'semi';

import { QuestionDifficultyLabel } from '@/common/utils/constants';

import './index.scss';

type SliderProps = GetComponentProps<typeof Slider>;

interface IProps {
  field?: string;
  className?: string;
}

export const PIECES = Object.keys(QuestionDifficultyLabel).length;
export const STEP = ~~(100 / (PIECES - 1));

function LevelSlider(props: IProps) {
  const [trackType, setTrackType] = React.useState<'low' | 'mid' | 'high'>('low');

  const { t } = useTranslation();
  const Component = typeof props.field === 'string' ? Form.Slider : Slider;

  const sliderMarks = React.useMemo(() => Object
    .values(QuestionDifficultyLabel)
    .reduce((prev, next, index) => {
      prev[index * STEP] = next;
      return prev;
    }, {} as Record<number, string>), []);

  const handleOnChange = React.useCallback<SliderProps['onChange']>(val => {
    if (typeof val !== 'number') return;
    if (val < 100 * 0.3) setTrackType('low');
    else if (val > 100 * 0.6) setTrackType('high');
    else setTrackType('mid');
  }, []);

  return (
    <Component
      field={props.field as any}
      label={t('题目难度')}
      step={STEP}
      marks={sliderMarks}
      tipFormatter={val => {
        if (typeof val !== 'number') return val;
        return (QuestionDifficultyLabel as any)[val / STEP];
      }}
      className={cls('level-slider', `level-slider-${trackType}`, props.className)}
      transform={val => typeof val === 'number' ? ~~(val / STEP) : val}
      onChange={handleOnChange}
    />
  );
}

export default LevelSlider;
