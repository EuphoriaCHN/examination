import React from 'react';
import { useTranslation } from 'react-i18next';

import { Form, Row, Col, withField } from 'semi';
import LevelSlider from '@/components/LevelSlider';
import MarkdownEditor from '@/components/MarkdownEditor';
import Prompt from '@/components/Prompt';

import { createOptionalFormLabel } from '@/common/utils';
import { useTagsAtom } from '@/store/tags';
import { useCategoriesAtom } from '@/store/categories';
import { convertCategoriesToSemiTreeData } from '@/common/utils';

import './index.scss';

type FormProps = GetComponentProps<typeof Form>;

type IProps = Exclude<Partial<FormProps>, 'ref'>;

const FieldedMarkdownEditor = withField(MarkdownEditor);

function QuestionForm(props: IProps) {
  const { t } = useTranslation();
  const [tags] = useTagsAtom();
  const [categories] = useCategoriesAtom();

  /**
   * categories structure to semi tree data
   */
  const categoriesTreeData = React.useMemo(() =>
    convertCategoriesToSemiTreeData(categories),
    [categories]
  );

  return (
    <React.Fragment>
      <Form {...props}>
        <Form.Input
          field={'title'}
          placeholder={t('请输入题目名称') as any}
          label={t('题目名称')}
          rules={[{
            required: true,
            message: t('题目名称为必填项')
          }, {
            max: 128,
            message: t('题目名称最长 128 字符')
          }]}
          autofocus
        />
        <FieldedMarkdownEditor
          field={'content'}
          placeholder={t('请输入题面')}
          label={t('题面')}
          rules={[{
            required: true,
            message: t('题面为必填项')
          }]}
          maxHeight={300}
          defaultHidePreviewer
        />
        <FieldedMarkdownEditor
          field={'comment'}
          placeholder={t('请输入题目注释（选填）')}
          label={createOptionalFormLabel(t('注释'))}
          maxHeight={300}
          defaultHidePreviewer
        />
        <FieldedMarkdownEditor
          field={'answer'}
          placeholder={t('请输入题目答案（选填）')}
          label={createOptionalFormLabel(t('答案'))}
          maxHeight={300}
          defaultHidePreviewer
        />
        {/* 所属分类 & 标签 */}
        <Row gutter={24}>
          <Col span={6}>
            <Form.TreeSelect
              field={'categories'}
              label={createOptionalFormLabel(t('所属分类'))}
              placeholder={t('请选择所属分类（选填）')}
              style={{ width: '100%' }}
              treeData={categoriesTreeData}
              searchPosition={'trigger'}
              checkRelation={'unRelated'}
              maxTagCount={2}
              dropdownMatchSelectWidth
              filterTreeNode
              multiple
            />
          </Col>
          <Col span={6}>
            <Form.Select
              field={'tags'}
              label={createOptionalFormLabel(t('标签'))}
              placeholder={t('请选择标签')}
              style={{ width: '100%' }}
              optionList={tags.map(item => ({
                label: item.name,
                value: item.id
              }))}
              maxTagCount={2}
              dropdownMatchSelectWidth
              multiple
              filter
            />
          </Col>
          <Col span={12}>
            <LevelSlider field={'level'} />
          </Col>
        </Row>
      </Form>
      <Prompt
        modalProps={{
          title: t('离开当前页面？'),
          content: t('系统可能不会保存您所做的更改。'),
          okText: t('离开')
        }}
        when
      />
    </React.Fragment>
  );
}

export default QuestionForm;
