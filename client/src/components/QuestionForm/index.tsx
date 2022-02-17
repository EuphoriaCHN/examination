import React from 'react';
import { useTranslation } from 'react-i18next';

import { Form, Row, Col } from 'semi';
import LevelSlider from '@/components/LevelSlider';

import { createOptionalFormLabel } from '@/common/utils';

import './index.scss';

type FormProps = GetComponentProps<typeof Form>;

type IProps = Exclude<Partial<FormProps>, 'ref'>;

function QuestionForm(props: IProps) {
  const { t } = useTranslation();

  return (
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
      <Form.TextArea
        field={'content'}
        placeholder={t('请输入题面')}
        label={t('题面')}
        rules={[{
          required: true,
          message: t('题面为必填项')
        }]}
      />
      <Form.TextArea
        field={'comment'}
        placeholder={t('请输入题目注释（选填）')}
        label={createOptionalFormLabel(t('注释'))}
      />
      <Form.TextArea
        field={'answer'}
        placeholder={t('请输入题目答案（选填）')}
        label={createOptionalFormLabel(t('答案'))}
      />
      {/* 所属分类 & 标签 */}
      <Row gutter={24}>
        <Col span={6}>
          <Form.Select
            field={'categories'}
            label={createOptionalFormLabel(t('所属分类'))}
            placeholder={t('请选择所属分类（选填）')}
            style={{ width: '100%' }}
            dropdownMatchSelectWidth
          />
        </Col>
        <Col span={6}>
          <Form.Select
            field={'tags'}
            label={createOptionalFormLabel(t('标签'))}
            placeholder={t('请选择标签')}
            style={{ width: '100%' }}
            dropdownMatchSelectWidth
          />
        </Col>
        <Col span={12}>
          <LevelSlider field={'level'} />
        </Col>
      </Row>
    </Form>
  );
}

export default QuestionForm;
