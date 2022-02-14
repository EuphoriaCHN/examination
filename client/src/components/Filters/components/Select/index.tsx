import React from 'react';
import cls from 'classnames';

import { Select, Button, Tooltip } from 'semi';
import { IconChevronDown, IconClose } from 'semi-icons';

import './index.scss';

type SelectProps = GetComponentProps<typeof Select>;

export interface ISelectFilterProps {
  field: string;
  placeholders: string;
  multiple?: boolean;
  maxTagCount?: number;
  maxWidth?: number;
  className?: string;
  optionList: SelectProps['optionList'];
}

function SelectFilter(props: ISelectFilterProps) {
  const { maxWidth, maxTagCount, placeholders, multiple } = props;

  const triggerRender = React.useCallback<SelectProps['triggerRender']>(params => {
    const { value, onClear } = params;

    if (!value.length) {
      return (
        <Button
          style={{ maxWidth: maxWidth }}
          type={'tertiary'}
          icon={<IconChevronDown />}
          iconPosition={'right'}
        >
          {placeholders}
        </Button>
      );
    }

    const showItems = !!multiple && typeof maxTagCount === 'number' ? value.slice(0, maxTagCount) : value
    const hideItems = !!multiple ? value.slice(maxTagCount) : [];

    const hideCounts = hideItems.length;

    return (
      <Button
        style={{ maxWidth: maxWidth }}
        className={'select-filter-active'}
        icon={<IconClose onClick={onClear} />}
        iconPosition={'right'}
      >
        <span className='select-filter-active-box'>
          <span style={{ marginRight: 8 }}>{placeholders}</span>
          <span className={'select-filter-active-info'}>
            {showItems.map((item: any) => item.label).join(',')}
          </span>
        </span>
        {!!hideCounts && (
          <Tooltip content={hideItems.map((item: any) => item.label).join(',')}>
            <span className={'select-filter-active-extra'}>+{hideCounts}</span>
          </Tooltip>
        )}
      </Button>
    );
  }, [placeholders, maxTagCount, maxWidth]);

  return (
    <Select
      // field={props.field}
      className={cls('select-filter', props.className)}
      triggerRender={triggerRender}
      multiple={multiple}
      optionList={props.optionList}
      dropdownMatchSelectWidth
    />
  );
}

export default SelectFilter;
