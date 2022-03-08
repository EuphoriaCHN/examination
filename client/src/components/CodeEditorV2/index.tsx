import { useSemiMode } from '@/common/hooks/useSemiMode';
import React from 'react';
import * as monaco from 'monaco-editor';

import './index.scss'

// ! 这个要和 Webpack config 对齐
export const SUPPORT_LANGUAGES = [
  'css',
  'scss',
  'less',
  'markdown',
  'javascript',
  'typescript',
  'json'
] as const;

interface IProps {
  language: typeof SUPPORT_LANGUAGES[number];
  onChange?: (value: string, ev: monaco.editor.IModelContentChangedEvent) => void;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  value?: string;
  placeholder?: string;
  simple?: boolean;
  onInitInstance?: (editor: monaco.editor.IStandaloneCodeEditor) => void;
}

function CodeEditor(props: IProps) {
  const { mode: semiMode } = useSemiMode();
  const [isFocus, setIsFocus] = React.useState(false);

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
        language: props.language,
        minimap: { enabled: false },
        wordWrap: 'on',
        automaticLayout: true,
        scrollbar: {
          verticalScrollbarSize: 8
        },
        tabSize: 2,
        insertSpaces: true,
      });

      typeof props.onInitInstance === 'function' && props.onInitInstance(editorRef.current);
    }

    return () => {
      editorRef.current?.dispose?.();
    };
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
        overviewRulerLanes: 0,
        overviewRulerBorder: false
      });
    } else {
      editorRef.current?.updateOptions({
        lineDecorationsWidth: 10,
        folding: true,
        renderLineHighlight: 'line',
        lineNumbers: 'on',
        overviewRulerLanes: 3,
        overviewRulerBorder: true
      });
    }
  }, [props.simple]);

  return (
    <div
      className={'code-editor-wrapper'}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
    >
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
  );
}

export default CodeEditor;
