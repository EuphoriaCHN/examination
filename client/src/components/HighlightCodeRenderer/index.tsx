import React from 'react';
import Highlight, { defaultProps as highlightDefaultProps, Language } from 'prism-react-renderer';
import cls from 'classnames';

import { IconCopy } from 'semi-icons';
import CopyToClipboard from '@/components/CopyToClipboard';
import { useSemiMode } from '@/common/hooks/useSemiMode';

import darkTheme from 'prism-react-renderer/themes/vsDark';
import lightTheme from 'prism-react-renderer/themes/vsLight';

import './index.scss';

function HighlightChildren(props: any) {
  const { className, tokens, getLineProps, getTokenProps, style, language, sourceCode } = props;

  const renderLanguage = () => {
    return (
      <header className={'highlight-code-header'}>
        <div>{language}</div>
        <CopyToClipboard content={sourceCode} position={'topRight'}>
          <div className={'highlight-code-header-copy'}>
            <IconCopy />
          </div>
        </CopyToClipboard>
      </header>
    );
  };

  return (
    <pre className={cls(className, 'highlight-code')}>
      {renderLanguage()}
      {tokens.map((line: any, i: number) => {
        const lineProps = getLineProps({ line, key: i });

        return (
          <div key={i} {...lineProps} className={cls('highlight-code-line', lineProps?.classNames)} >
            <span key={`highlight-line-no-${i}`} className={'highlight-code-line-no'}>{i + 1}</span>
            <span className={'highlight-code-line-content'}>
              {line.map((token: any, key: number) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </span>
          </div>
        );
      })}
    </pre>
  );
}

interface IProps {
  children: string;
  className: string;
};

function HighlightCodeRenderer(props: IProps) {
  const { mode } = useSemiMode();

  let { className = '', children = '' } = props;
  const languageCode = className.split(/-/)[1] as Language;

  if (typeof languageCode !== 'string') {
    return <code className='md md-code'>{props.children}</code>
  }

  className = typeof className === 'string' ? className : '';
  children = Array.isArray(children) ? children.join('') : typeof children === 'string' ? children : '';

  return (
    <Highlight
      {...highlightDefaultProps}
      code={children.replace(/\n$/, '')}
      language={languageCode}
      theme={mode === 'dark' ? darkTheme : lightTheme}
    >
      {props => <HighlightChildren {...props} language={languageCode} sourceCode={children} />}
    </Highlight>
  );
}

export default HighlightCodeRenderer;
