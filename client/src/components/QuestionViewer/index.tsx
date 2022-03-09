import React from 'react';
import { useTranslation } from 'react-i18next';

import { Tabs, TabPane, Select, Button } from 'semi';
import { IconBeaker, IconArticle } from 'semi-icons';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import QuestionDescription from '@/components/QuestionDescription';
import DraggableWrapper from '@/components/DraggableWrapper';
import CodeEditor, { SUPPORT_LANGUAGES, SUPPORT_LANGUAGES_TYPE } from '@/components/CodeEditorV2';

import './index.scss';

interface IProps {
  record?: IQuestionItem;
  loading?: boolean;
  contentHeight?: string | number;
  activeLang?: SUPPORT_LANGUAGES_TYPE;
  onActiveLangChange?: (newVal: SUPPORT_LANGUAGES_TYPE) => void;
  renderCodeEditorFooter?: GetComponentProps<typeof CodeEditor>['renderFooter'];
}

function QuestionViewer(props: IProps) {
  const { t } = useTranslation();
  const [activeLang, setActiveLang] = React.useState<SUPPORT_LANGUAGES_TYPE>(props.activeLang || 'javascript');

  const { loading, record = {} as IQuestionItem } = props;

  const contentStyle: React.CSSProperties = !!props.contentHeight ? {
    maxHeight: props.contentHeight,
    overflow: 'hidden'
  } : {};

  const answerStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    padding: 20,
    overflow: 'auto',
    maxHeight: props.contentHeight,
  };

  const onActiveLangSelect = React.useCallback((val: any) => {
    if (typeof props.onActiveLangChange === 'function') {
      props.onActiveLangChange(val);
    } else {
      setActiveLang(val);
    }
  }, [props.onActiveLangChange]);

  const renderTabExtraContent = React.useMemo(() => (
    <div className={'question-viewer-extra'}>
      <Select
        onSelect={onActiveLangSelect}
        style={{ width: 120 }}
        value={activeLang}
        filter
      >
        {SUPPORT_LANGUAGES.map(lang => <Select.Option key={lang} value={lang}>{lang}</Select.Option>)}
      </Select>
    </div>
  ), [activeLang, onActiveLangSelect]);

  React.useEffect(() => {
    if (typeof props.activeLang === 'string') {
      setActiveLang(props.activeLang);
    }
  }, [props.activeLang]);

  return (
    <div className={'question-viewer'}>
      <Tabs type={'line'} size={'small'} tabBarExtraContent={renderTabExtraContent}>
        <TabPane
          // See: https://github.com/DouyinFE/semi-design/pull/631
          // @ts-ignore semi 2.3.1 DTS 有问题
          icon={<IconArticle />}
          tab={t('题目描述')}
          itemKey='description'
        >
          <DraggableWrapper style={contentStyle}>
            <QuestionDescription
              record={record}
              loading={loading}
              maxHeight={props.contentHeight}
            />
            <CodeEditor
              language={activeLang}
              renderFooter={props.renderCodeEditorFooter}
              defaultValue={`console.log('Hello, world');\n\nconsole.log('haha')`}
            />
          </DraggableWrapper>
        </TabPane>
        <TabPane
          // See: https://github.com/DouyinFE/semi-design/pull/631
          // @ts-ignore semi 2.3.1 DTS 有问题
          icon={<IconBeaker />}
          tab={t('题解')}
          itemKey='answer'
        >
          <div style={answerStyle}>
            <MarkdownRenderer loading={props.loading} renderEmpty>
              {record?.answer || ''}
            </MarkdownRenderer>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default QuestionViewer;
