import React from 'react';
import cls from 'classnames';
import { useKeydown } from '@/common/hooks/useKeydown';

import SimpleCodeEditor from 'react-simple-code-editor';

// @ts-ignore
import { highlight, languages } from 'prismjs';

import 'prismjs/components/prism-css.min';
import 'prismjs/components/prism-javascript.min';
import 'prismjs/components/prism-jsx.min';
import 'prismjs/components/prism-typescript.min';
import 'prismjs/components/prism-tsx.min';
import 'prismjs/components/prism-markdown.min';

import './index.scss';

export const SUPPORT_LANGUAGES = [
  'css',
  'javascript',
  'jsx',
  'typescript',
  'tsx',
  'markdown'
] as const;

interface IProps {
  language: typeof SUPPORT_LANGUAGES[number];

  value?: string;
  defaultValue?: string;
  placeholder?: string;

  onChange?: (value: string) => void;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;

  className?: string;
  noLineNumber?: boolean;
  maxHeight?: number | string;
}

function CodeEditor(props: IProps) {
  const [value, setValue] = React.useState('');
  const [activeLine, setActiveLine] = React.useState<{ start: number, end: number } | null>(null);
  const editorRef = React.useRef<SimpleCodeEditor>(null);

  const calculateHighlightLine = React.useCallback(() => {
    // @ts-ignore
    const inputEl: HTMLTextAreaElement = editorRef.current?.['_input'];

    if (!inputEl) return;

    const value = inputEl.value;
    const { selectionStart, selectionEnd } = inputEl;

    const rawData = value.split(/\n/);

    const ans: { start: number; end: number } = { start: 0, end: 0 };

    let count = 0;
    for (let i = 0; i < rawData.length; i++) {
      const val = rawData[i];

      if (count <= selectionStart && count + val.length + 1 >= selectionStart) {
        ans.start = i;
      }
      if (count <= selectionEnd && count + val.length + 1 >= selectionEnd) {
        ans.end = i;
      }

      count += val.length + 1;
    }

    setActiveLine(ans);
  }, []);

  useKeydown(ev => {
    setTimeout(() => calculateHighlightLine());
  }, {
    // @ts-ignore
    element: editorRef.current?.['_input']
  });

  const handleHighlight = React.useCallback((code: string) => {
    if (!!props.noLineNumber) {
      return highlight(code, languages[props.language], props.language);
    }

    const actLine = activeLine || { start: -1, end: -1 };
    const rowData = code.split(/\n/);

    return rowData
      .map((line, ind) => {
        // 和 Vscode 对齐，只看光标位置
        const isLineActive = actLine.start >= ind && actLine.end <= ind;

        return `<span class="${cls('token', 'line-no', {
          'active-line': isLineActive
        })}">${ind + 1}</span>${highlight(line, languages[props.language], props.language)}<span class="${cls('line-content', {
          'active-line-content': isLineActive
        })}"></span>`
      })
      .join('\n');
  }, [props.language, props.noLineNumber, activeLine]);

  const handleOnFocus = React.useCallback<React.FocusEventHandler<HTMLTextAreaElement>>(ev => {
    typeof props.onFocus === 'function' && props.onFocus(ev);
  }, [props.onFocus]);

  const handleOnBlur = React.useCallback<React.FocusEventHandler<HTMLTextAreaElement>>(ev => {
    typeof props.onBlur === 'function' && props.onBlur(ev);

    setActiveLine(null);
  }, [props.onBlur])

  const handleOnClick = React.useCallback<React.MouseEventHandler<HTMLDivElement>>(() => {
    calculateHighlightLine();
  }, []);

  const onChange = React.useCallback((value: string) => {
    setValue(value);
    props.onChange?.(value);
  }, [props.onChange]);

  React.useEffect(() => {
    setValue(props.value ?? '');
  }, [props.value]);

  React.useEffect(() => {
    setValue(props.defaultValue ?? props.value ?? '');
  }, []);


  return (
    <div className={'code-editor-wrapper'} style={{ maxHeight: props.maxHeight }}>
      <SimpleCodeEditor
        value={value}
        onValueChange={onChange}
        highlight={handleHighlight}
        placeholder={props.placeholder}
        onBlur={handleOnBlur as any}
        onFocus={handleOnFocus as any}
        onClick={handleOnClick as any}
        className={cls('code-editor', props.className, {
          'code-editor-with-line-no': !props.noLineNumber
        })}
        textareaClassName={'code-editor-textarea'}
        preClassName={'code-editor-preview'}
        ref={editorRef as any}
      />
    </div>
  );
}

export default CodeEditor;
