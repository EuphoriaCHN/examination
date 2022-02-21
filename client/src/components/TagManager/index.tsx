import React from 'react';
import { useTranslation } from 'react-i18next';

import { Input, Button, Toast, Table, Typography, Dropdown, Modal } from 'semi';
import { IconPlus, IconSearch, IconDelete, IconEdit, IconMore } from 'semi-icons';
import ContentHeader from '@/components/ContentHeader';
import TagOpModal from '@/components/TagOpModal';

import { useTagsAtom } from '@/store/tags';
import { Tag } from '@/api';

import './index.scss';

import type { ColumnProps } from '@douyinfe/semi-ui/lib/es/table/interface';

function TagManager(this: any) {
  const { t } = useTranslation();
  const [tags, setTags] = useTagsAtom();
  const [total, setTotal] = React.useState(0);

  const [loading, setLoading] = React.useState(false);
  const [opModalVisible, setOpModalVisible] = React.useState(false);

  const [searchVal, setSearchVal] = React.useState('');

  const opRecordRef = React.useRef<null | ITagItem>(null);

  const fuzzyTags = React.useMemo(() =>
    !!searchVal ? tags.filter(item => item.name.indexOf(searchVal) !== -1) : tags
    , [searchVal, tags]
  );

  const loadTags = React.useCallback(async () => {
    setLoading(true);

    try {
      const { data, total } = await Tag.list({});

      setTags(data);
      setTotal(total);
    } catch (err) {
      Toast.error(t('获取题目分类失败'));
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadTags();
  }, []);

  const handleOpenOpModal = React.useCallback((record: ITagItem | null = null) => {
    setOpModalVisible(true);
    opRecordRef.current = record;
  }, []);

  const handleCloseOpModal = React.useCallback(() => {
    setOpModalVisible(false);
    opRecordRef.current = null;
  }, []);

  const handleClickDeleteTag = React.useCallback(async (record: ITagItem) => {
    Modal.warning({
      title: t('删除标签？'),
      content: t('删除后不可恢复'),
      okText: t('删除'),
      onOk: async () => {
        try {
          await Tag.delete({ id: record.id });
          Toast.success(t('标签已删除'));

          loadTags();
          setTimeout(() => handleCloseOpModal());
        } catch (err) {
          Toast.error(t('删除标签失败'));
        }
      },
      okButtonProps: { type: 'danger' }
    });
  }, []);

  const columns = React.useMemo<ColumnProps<ITagItem>[]>(() => [{
    title: t('标签名称'),
    dataIndex: 'name'
  }, {
    title: t('标签描述'),
    dataIndex: 'description',
    render: desc => <Typography.Text type={'tertiary'}>{desc || '-'}</Typography.Text>
  }, {
    title: t('最近操作'),
    dataIndex: 'updateTime',
    render: updateTime => t('{updateTime, date, long} {updateTime, time, medium}', { updateTime })
  }, {
    render: (record: ITagItem) => (
      <Dropdown
        render={(
          <Dropdown.Menu>
            <Dropdown.Item
              icon={<IconEdit />}
              type={'tertiary'}
              onClick={handleOpenOpModal.bind(this, record)}
            >
              {t('编辑题目')}
            </Dropdown.Item>
            <Dropdown.Item
              type={'danger'}
              icon={<IconDelete />}
              onClick={handleClickDeleteTag.bind(this, record)}
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
  }], []);

  const handleCreateTag = React.useCallback(async (
    data: { name: string, description: string }
  ) => {
    try {
      await Tag.create(data);
      Toast.success(t('标签已创建'));

      loadTags();
      setTimeout(() => handleCloseOpModal());
    } catch (err) {
      Toast.error(t('创建标签失败'));
    }
  }, []);

  const handleUpdateTag = React.useCallback(async (
    data: { name: string, description: string }
  ) => {
    try {
      await Tag.update(Object.assign({}, data, {
        id: opRecordRef.current?.id || 0
      }));
      Toast.success(t('标签已更新'));

      loadTags();
      setTimeout(() => handleCloseOpModal());
    } catch (err) {
      Toast.error(t('更新标签失败'));
    }
  }, []);

  return (
    <React.Fragment>
      <div className={'tag-manager'}>
        <ContentHeader
          title={t('标签管理')}
          brief={t('在这里进行对题目标签的管理')}
          className={'tag-manager-header'}
        />
        <div className={'tag-manager-opts'}>
          <div className={'tag-manager-opts-left'}>
            <Input
              placeholder={t('搜索标签') as string}
              prefix={<IconSearch />}
              onChange={val => setSearchVal(val)}
              showClear
            />
          </div>
          <div className={'tag-manager-opts-right'}>
            <Button
              theme={'solid'}
              icon={<IconPlus />}
              onClick={handleOpenOpModal.bind(this, null)}
            >
              {t('添加标签')}
            </Button>
          </div>
        </div>
        <div className={'tag-manager-content'}>
          <Table
            columns={columns}
            dataSource={fuzzyTags}
            loading={loading}
            pagination={{ total: fuzzyTags.length }}
          />
        </div>
      </div>
      <TagOpModal
        visible={opModalVisible}
        onCancel={handleCloseOpModal}
        onCreate={handleCreateTag}
        onUpdate={handleUpdateTag}
        record={opRecordRef.current}
      />
    </React.Fragment>
  );
}

export default TagManager;
