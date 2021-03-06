import React from 'react';
import * as monaco from 'monaco-editor';
import { useTranslation } from 'react-i18next';
import { useSemiMode } from '@/common/hooks/useSemiMode';

import { Button, Toast } from 'semi';
import { IconTreeTriangleRight } from 'semi-icons';
import { withAuth } from '@/components/AuthWrapper';
import ExecuteCodeModal from '@/components/ExecuteCodeModal';

import './index.scss'

// ! monacoAlias 的并集要和 Webpack config 对齐
export const SUPPORT_LANGUAGES = {
  'CSS': {
    monacoAlias: 'css',
    allowExec: false,
    initVal: require('./constants/css.txt')
  },
  'JavaScript V8': {
    monacoAlias: 'javascript',
    allowExec: true,
    initVal: require('./constants/v8.txt')
  },
  'Node.js': {
    monacoAlias: 'javascript',
    allowExec: true,
    initVal: require('./constants/v8.txt')
  },
  'TypeScript': {
    monacoAlias: 'typescript',
    allowExec: true,
    initVal: require('./constants/v8.txt')
  },
  'JSON': {
    monacoAlias: 'json',
    allowExec: false,
    initVal: '{}'
  },
  'Markdown': {
    monacoAlias: 'markdown',
    allowExec: false,
    initVal: '## Hello, world'
  }
} as const;

export type SUPPORT_LANGUAGES_TYPE = keyof typeof SUPPORT_LANGUAGES;

// @ts-ignore Semi 2.5.0 Button DTS 有问题
const SubmitButton = withAuth({})(Button);

interface IProps {
  language: SUPPORT_LANGUAGES_TYPE;
  onChange?: (value: string, ev: monaco.editor.IModelContentChangedEvent) => void;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  value?: string;
  placeholder?: string;
  defaultValue?: string;
  simple?: boolean;
  onInitInstance?: (editor: monaco.editor.IStandaloneCodeEditor) => void;
  renderFooter?: (ori: [execute: JSX.Element]) => JSX.Element;
}

function CodeEditor(props: IProps) {
  const { mode: semiMode } = useSemiMode();
  const [isFocus, setIsFocus] = React.useState(false);
  const { t } = useTranslation();

  const editorElRef = React.useRef<HTMLDivElement>(null);
  const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleOnFocus = React.useCallback<React.FocusEventHandler<HTMLDivElement>>(ev => {
    setIsFocus(true);
    props.onFocus?.(ev);
  }, [props.onFocus]);

  const handleOnBlur = React.useCallback<React.FocusEventHandler<HTMLDivElement>>(ev => {
    setIsFocus(false);
    props.onBlur?.(ev);
  }, [props.onBlur]);

  React.useEffect(() => {
    if (!!editorElRef.current) {
      editorRef.current = monaco.editor.create(editorElRef.current, {
        // language: SUPPORT_LANGUAGES[props.language].monacoAlias,
        minimap: { enabled: false },
        wordWrap: 'on',
        automaticLayout: true,
        scrollbar: {
          verticalScrollbarSize: 8
        },
        tabSize: 2,
        insertSpaces: true,
        overviewRulerLanes: 0,
        // value: props.value ?? props.defaultValue ?? SUPPORT_LANGUAGES[props.language].initVal ?? ''
      });

      typeof props.onInitInstance === 'function' && props.onInitInstance(editorRef.current);
    }

    return () => {
      editorRef.current?.dispose?.();
    };
  }, []);

  React.useEffect(() => {
    const model = editorRef.current?.getModel();

    if (!!model) {
      const langConf = SUPPORT_LANGUAGES[props.language];

      monaco.editor.setModelLanguage(model, langConf.monacoAlias);
      model.setValue(langConf.initVal);
    }
  }, [props.language]);

  React.useEffect(() => {
    editorRef.current?.updateOptions({
      theme: semiMode === 'dark' ? 'vs-dark' : 'vs'
    });
  }, [semiMode]);

  React.useEffect(() => {
    const dispose = editorRef.current?.onDidChangeModelContent(ev => {
      if (typeof props.onChange === 'function') {
        props.onChange(editorRef.current?.getValue() || '', ev);
      }
    });

    return () => {
      dispose?.dispose();
    };
  }, [props.onChange]);

  React.useEffect(() => {
    if (typeof props.value === 'string') {
      editorRef.current?.setValue(props.value);
    }
  }, [props.value]);

  React.useEffect(() => {
    if (!!props.simple) {
      editorRef.current?.updateOptions({
        // 这两个可以完全去掉左侧的 padding
        lineDecorationsWidth: 0,
        folding: false,
        renderLineHighlight: 'none',
        lineNumbers: 'off',
        overviewRulerBorder: false,
      });
    } else {
      editorRef.current?.updateOptions({
        lineDecorationsWidth: 10,
        folding: true,
        renderLineHighlight: 'line',
        lineNumbers: 'on',
        overviewRulerBorder: true
      });
    }
  }, [props.simple]);

  const handleOnExecuteClick = React.useCallback((lang: any) => {
    const code = editorRef.current!.getValue();

    if (!code) {
      return Toast.error(t('不能提交空代码'));
    }

    return ExecuteCodeModal.open({ lang, code });
  }, []);

  const renderFooter = React.useMemo(() => {
    let el = (
      <SubmitButton
        icon={<IconTreeTriangleRight />}
        type={'secondary'}
        disabled={!SUPPORT_LANGUAGES[props.language].allowExec}
        auth={{
          tooltips: { content: t('不支持提交的语种') }
        }}
        onClick={() => handleOnExecuteClick(props.language)}
      >
        {t('执行代码')}
      </SubmitButton>
    );

    if (typeof props.renderFooter === 'function') {
      el = props.renderFooter([el]);
    }

    return (
      <footer className={'code-editor-footer'}>
        {el}
      </footer>
    );
  }, [props.renderFooter, props.language]);

  return (
    <div
      className={'code-editor-wrapper'}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
    >
      <div className={'code-editor-core-wrapper'}>
        <div
          className={'code-editor-placeholder'}
          style={{ display: !isFocus ? 'block' : 'none' }}
        >
          {props.placeholder}
        </div>
        <div
          ref={editorElRef}
          className={'code-editor'}
        />
      </div>
      {renderFooter}
    </div>
  );
}

export default CodeEditor;
