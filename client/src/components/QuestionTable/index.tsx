import React from 'react';
import cls from 'classnames';
import { useTranslation } from '@/i18n';

import { Table } from 'semi';

import './index.scss';

import type { ColumnProps } from '@douyinfe/semi-ui/lib/es/table/interface';

// type TableType = GetComponentProps<typeof Table>;

interface IProps {
  dataSource: IQuestionItem[];
  className?: string;
}

function QuestionTable(props: IProps) {
  const { t } = useTranslation();

  const columns = React.useMemo<ColumnProps<IQuestionItem>[]>(() => [{
    title: t('题目名称'),
    dataIndex: 'title'
  }, {
    title: t('题目难度'),
    dataIndex: 'level'
  }, {
    title: t('更新时间'),
    dataIndex: 'updateTime'
  }], []);

  return (
    <Table
      columns={columns}
      dataSource={props.dataSource}
      className={cls(props.className, 'question-table')}
    />
  );
}

export default QuestionTable;
