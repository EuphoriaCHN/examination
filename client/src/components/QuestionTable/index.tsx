import React from 'react';
import { useNavigate } from 'react-router-dom';
import cls from 'classnames';
import { useTranslation } from 'react-i18next';

import { Table, Button, Dropdown, Modal, Tag } from 'semi';
import { IconMore, IconDelete, IconEdit } from 'semi-icons';

import { useQuestionAtom } from '@/containers/CreateQuestion/store';
import { QuestionDifficultyColors, QuestionDifficultyLabel, QuestionDifficultyLevel } from '@/common/utils/constants';

import './index.scss';

import type { ColumnProps, OnRow } from '@douyinfe/semi-ui/lib/es/table/interface';

interface IProps {
  dataSource: IQuestionItem[];
  className?: string;
  loading?: boolean;

  onDelete: (record: IQuestionItem) => Promise<void>;
  onRowClick?: (record: IQuestionItem, e: React.MouseEvent<Element, MouseEvent>) => void;
}

function QuestionTable(this: any, props: IProps) {
  const { t } = useTranslation();
  const _navigate = useNavigate();
  const { dispatcher: setCreateQuestionAtom } = useQuestionAtom();

  const handleClickDeleteQuestion = React.useCallback(async (record: IQuestionItem) => {
    Modal.warning({
      title: t('删除题目？'),
      content: t('删除后不可恢复'),
      okText: t('删除'),
      onOk: () => props.onDelete(record),
      okButtonProps: { type: 'danger' }
    });
  }, [props.onDelete]);

  const handleClickUpdateQuestion = React.useCallback((record: IQuestionItem) => {
    setCreateQuestionAtom(record);
    _navigate('/questions/edit');
  }, []);

  const onRow: OnRow<IQuestionItem> = record => ({
    onClick: ev => props.onRowClick?.(record as IQuestionItem, ev)
  });

  const columns = React.useMemo<ColumnProps<IQuestionItem>[]>(() => [{
    title: t('题目名称'),
    dataIndex: 'title'
  }, {
    title: t('题目难度'),
    dataIndex: 'level',
    render: (level: QuestionDifficultyLevel) => {
      const colors = QuestionDifficultyColors[level] || {};
      const label = QuestionDifficultyLabel[level] || 'Unknown';

      return <Tag style={colors}>{label}</Tag>;
    }
  }, {
    title: t('更新时间'),
    dataIndex: 'updateTime',
    render: timestamp => t('{updateTime, date, long} {updateTime, time, medium}', {
      updateTime: new Date(timestamp)
    })
  }, {
    render: (record: IQuestionItem) => (
      <Dropdown
        render={(
          <Dropdown.Menu>
            <Dropdown.Item
              icon={<IconEdit />}
              type={'tertiary'}
              onClick={handleClickUpdateQuestion.bind(this, record)}
            >
              {t('编辑题目')}
            </Dropdown.Item>
            <Dropdown.Item
              type={'danger'}
              icon={<IconDelete />}
              onClick={handleClickDeleteQuestion.bind(this, record)}
            >
              {t('删除题目')}
            </Dropdown.Item>
          </Dropdown.Menu>
        )}
        position={'bottomRight'}
        clickToHide
        stopPropagation
      >
        <Button icon={<IconMore />} type={'tertiary'} />
      </Dropdown>
    )
  }], [handleClickDeleteQuestion]);

  return (
    <Table
      columns={columns}
      dataSource={props.dataSource}
      className={cls(props.className, 'question-table')}
      loading={props.loading}
      onRow={onRow}
    />
  );
}

export default QuestionTable;
