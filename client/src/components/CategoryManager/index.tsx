import React from 'react';
import { useTranslation } from 'react-i18next';

import { Spin, Toast, Empty, Button, Tree, Tooltip, Modal, Typography, Input, Row, Col } from 'semi';
import { IconPlus, IconDelete } from 'semi-icons';
import { IllustrationNoContent, IllustrationNoContentDark } from '@douyinfe/semi-illustrations';
import ContentHeader from '@/components/ContentHeader';
import CategoryOpModal from '@/components/CategoryOpModal';

import { useSemiMode } from '@/common/hooks/useSemiMode';
import { useCategoriesAtom } from '@/store/categories';

import { Category } from '@/api';

import './index.scss';

import type { TreeNodeData, SearchRenderProps } from '@douyinfe/semi-ui/lib/es/tree/interface';

type TreeProps = GetComponentProps<typeof Tree>;

function CategoryManager(this: any) {
  const { t } = useTranslation();
  const [categories, setCategories] = useCategoriesAtom();
  const { mode } = useSemiMode();
  const [loading, setLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  const opRecordRef = React.useRef<null | ICategoryItem>(null);

  /**
   * categories structure to semi tree data
   */
  const categoriesTreeData = React.useMemo(() => {
    function process(items: Array<ICategoryItem>): Array<TreeNodeData> {
      return items.map(item => ({
        label: item.name,
        value: item.id,
        key: `${item.id}`,
        children: process(item.children),
        record: item
      }) as TreeNodeData)
    }

    return process(categories);
  }, [categories]);

  const loadCategories = React.useCallback(async () => {
    setLoading(true);

    try {
      const data = await Category.list({});
      setCategories(data);
    } catch (err) {
      Toast.error(t('获取题目分类失败'));
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (!categories.length) loadCategories();
  }, []);

  const handleCloseOpModal = React.useCallback(() => {
    setModalVisible(false);
    opRecordRef.current = null;
  }, []);

  const handleOpenCategoryOpModal = React.useCallback((record?: ICategoryItem | null) => {
    setModalVisible(true);
    opRecordRef.current = record ?? null;
  }, []);

  const handleCategoryOpModalSubmit = React.useCallback(async (
    data: { name: string, description: string }
  ) => {
    try {
      await Category.create({
        name: data.name,
        description: data.description,
        parentId: opRecordRef.current?.id || 0
      });

      Toast.success(t('创建分类成功'));
      setTimeout(() => handleCloseOpModal());

      // 创建成功后，重新 loading
      loadCategories();
    } catch (err) {
      Toast.error(t('创建分类失败'));
    }
  }, []);

  const handleDeleteCategory = React.useCallback(async (record: ICategoryItem) => {
    try {
      await Category.delete({ id: record.id });
      Toast.success(t('分类已删除'));

      // 删除成功后，重新 loading
      loadCategories();
    } catch (err) {
      Toast.error(t('删除分类失败'));
    }
  }, []);

  const handleClickDeleteCategory = React.useCallback((record: ICategoryItem) => {
    if (!!record.children.length) {
      return Modal.error({
        title: t('删除失败'),
        content: t('当前分类下还有 {length} 个子分类，无法删除', { length: record.children.length }),
        cancelButtonProps: { style: { display: 'none' } },
        okButtonProps: { type: 'danger' },
        okText: t('我知道了')
      });
    }

    return Modal.error({
      title: t('确认删除？'),
      content: t('删除后数据无法恢复'),
      okButtonProps: { type: 'danger' },
      okText: t('删除'),
      cancelText: t('取消'),
      onOk: () => handleDeleteCategory(record)
    });
  }, []);

  const renderTreeLabel = React.useCallback<TreeProps['renderLabel']>((label, treeNode) => {
    return (
      <div className={'category-manager-content-tree-label'}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',

        }}>
          {label}
          <Typography.Text type={'tertiary'} size={'small'}>
            {(treeNode!.record as ICategoryItem).description || '-'}
          </Typography.Text>
        </div>
        <div className={'category-manager-content-tree-label-opts'}>
          <Tooltip content={t('删除分类')} position={'topRight'}>
            <IconDelete
              style={{ color: 'var(--semi-color-danger)' }}
              onClick={ev => {
                ev.stopPropagation();
                handleClickDeleteCategory(treeNode!.record);
              }}
            />
          </Tooltip>
          <Tooltip content={t('新建子分类')} position={'topRight'}>
            <IconPlus
              onClick={ev => {
                ev.stopPropagation();
                handleOpenCategoryOpModal(treeNode!.record);
              }}
            />
          </Tooltip>
        </div>
      </div>
    );
  }, []);

  const renderEmpty = React.useMemo(() => (
    <Empty
      title={t('暂无分类')}
      image={mode === 'light' ? <IllustrationNoContent /> : <IllustrationNoContentDark />}
      description={t('开始创建第一个分类吧')}
    >
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button
          icon={<IconPlus />}
          theme={'solid'}
          onClick={handleOpenCategoryOpModal.bind(this, null)}
        >
          {t('新建分类')}
        </Button>
      </div>
    </Empty>
  ), [mode]);

  const treeSearchRender = React.useCallback((searchRenderProps: SearchRenderProps) => (
    <Row>
      <Col span={8}>
        <Input {...searchRenderProps} />
      </Col>
      <Col span={3} offset={13}>
        <Button
          icon={<IconPlus />}
          theme={'solid'}
          onClick={setModalVisible.bind(this, true)}
          block
        >
          {t('新建分类')}
        </Button>
      </Col>
    </Row>
  ), []);

  const renderContent = () => {
    if (!loading && !categories.length) return renderEmpty;

    return (
      <div className={'category-manager-content'}>
        <Tree
          treeData={categoriesTreeData}
          renderLabel={renderTreeLabel}
          className={'category-manager-content-tree'}
          expandAction={'click'}
          searchPlaceholder={t('搜索分类名称')}
          searchRender={treeSearchRender}
          filterTreeNode
          showFilteredOnly
        />
      </div>
    );
  };

  return (
    <React.Fragment>
      <Spin spinning={loading}>
        <div className={'category-manager'}>
          <ContentHeader
            title={t('分类管理')}
            brief={t('在这里进行对题目分类的管理')}
            className={'category-manager-header'}
          />
          {renderContent()}
        </div>
      </Spin>
      <CategoryOpModal
        visible={modalVisible}
        onCancel={handleCloseOpModal}
        onOk={handleCategoryOpModalSubmit}
        record={opRecordRef.current}
      />
    </React.Fragment>
  );
}

export default CategoryManager;
