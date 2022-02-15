import React from 'react';
import { useNavigate } from 'react-router-dom';
import cls from 'classnames';
import { useTranslation } from '@/i18n';

import { Table, Button, Dropdown, Modal } from 'semi';
import { IconMore, IconDelete, IconEdit } from 'semi-icons';

import './index.scss';

import type { ColumnProps } from '@douyinfe/semi-ui/lib/es/table/interface';

interface IProps {
  dataSource: IQuestionItem[];
  className?: string;
  loading?: boolean;

  onDelete: (record: IQuestionItem) => Promise<void>;
}

function QuestionTable(this: any, props: IProps) {
  const { t } = useTranslation();
  const _navigate = useNavigate();

  const handleClickDeleteQuestion = async (record: IQuestionItem) => {
    Modal.warning({
      title: t('删除题目？'),
      content: t('删除后不可恢复'),
      okText: t('删除'),
      onOk: () => props.onDelete(record),
      okButtonProps: { type: 'danger' }
    })
  };

  const columns: ColumnProps<IQuestionItem>[] = [{
    title: t('题目名称'),
    dataIndex: 'title'
  }, {
    title: t('题目难度'),
    dataIndex: 'level'
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
              onClick={() => _navigate('/questions/edit')}
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
  }];

  return (
    <Table
      columns={columns}
      dataSource={props.dataSource}
      className={cls(props.className, 'question-table')}
      loading={props.loading}
    />
  );
}

export default QuestionTable;
