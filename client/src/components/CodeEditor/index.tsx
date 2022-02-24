import React from 'react';
import { noop } from 'lodash';

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

const SUPPORT_LANGUAGES = [
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
}

function CodeEditor(props: IProps) {
  const [value, setValue] = React.useState('');

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
    <SimpleCodeEditor
      value={value}
      onValueChange={onChange}
      highlight={code => highlight(code, languages[props.language], props.language)}
      placeholder={props.placeholder}
      onBlur={props.onBlur as any}
      onFocus={props.onFocus as any}
      className={'code-editor'}
      textareaClassName={'code-editor-textarea'}
      preClassName={'code-editor-preview'}
    />
  );
}

export default CodeEditor;
