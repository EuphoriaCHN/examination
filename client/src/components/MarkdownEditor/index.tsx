import React from 'react';
import { useTranslation } from 'react-i18next';
import cls from 'classnames';
import { useSwitcher } from '@/common/hooks/useSwitcher';

import MarkdownRenderer from '@/components/MarkdownRenderer';
import CodeEditor from '@/components/CodeEditor';

import { Button, Typography } from 'semi';
import { IconEyeOpened, IconEyeClosed } from 'semi-icons';

import './index.scss';

type CodeEditorProps = GetComponentProps<typeof CodeEditor>;

interface IProps {
  maxHeight?: number;
  defaultHidePreviewer?: boolean;
  hideViewerChange?: boolean;
  placeholder?: string;

  onChange?: CodeEditorProps['onChange'];
  onBlur?: CodeEditorProps['onBlur'];
  onFocus?: CodeEditorProps['onFocus'];

  value?: string;
  defaultValue?: string;

  validateStatus?: 'error' | undefined;
}

function MarkdownEditor(props: IProps) {
  const [value, setValue] = React.useState('');
  const [isFocus, updateIsFocus] = useSwitcher(false);
  const [showPreviewer, updateShowPreviewer] = useSwitcher(!props.defaultHidePreviewer);
  const { t } = useTranslation();

  const onChange = React.useCallback<CodeEditorProps['onChange']>((value) => {
    setValue(value);

    props.onChange?.(value);
  }, [props.onChange]);

  const onBlur = React.useCallback<CodeEditorProps['onBlur']>(ev => {
    updateIsFocus(false);

    typeof props.onBlur === 'function' && props.onBlur(ev);
  }, [props.onBlur]);

  const onFocus = React.useCallback<CodeEditorProps['onFocus']>(ev => {
    updateIsFocus(true);

    typeof props.onFocus === 'function' && props.onFocus(ev);
  }, [props.onFocus]);

  const onContentClick = React.useCallback(() => {
  }, []);

  React.useEffect(() => {
    setValue(props.value ?? '');
  }, [props.value]);

  React.useEffect(() => {
    setValue(props.value ?? props.defaultValue ?? '');
  }, []);

  const renderHeader = React.useMemo(() => {
    const ChangeViewerIcon = showPreviewer ? IconEyeClosed : IconEyeOpened;
    const changeViewerMessage = showPreviewer ? t('隐藏预览') : t('打开预览');

    return (
      <header className={'markdown-editor-header'}>
        {!props.hideViewerChange && (
          <Button
            size={'small'}
            icon={<ChangeViewerIcon size={'small'} />}
            type={'tertiary'}
            onClick={() => updateShowPreviewer()}
            className={'markdown-editor-previewer-switcher'}
          >
            <Typography.Text size={'small'} type={'tertiary'}>{changeViewerMessage}</Typography.Text>
          </Button>
        )}
      </header>
    );
  }, [showPreviewer, props.hideViewerChange]);

  return (
    <div className={'markdown-editor'}>
      {renderHeader}
      <div
        className={cls('markdown-editor-content', {
          'markdown-editor-content-only-editor': !showPreviewer,
          'markdown-editor-content-error': props.validateStatus === 'error',
          'markdown-editor-content-focus': isFocus
        })}
        onClick={onContentClick}
      >
        <div className={'markdown-editor-core-wrapper'} style={{ maxHeight: props.maxHeight }}>
          <CodeEditor
            language={'markdown'}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={props.placeholder}
          />
        </div>
        <div className={'markdown-editor-previewer-wrapper'} style={{ maxHeight: props.maxHeight }}>
          <MarkdownRenderer className={'markdown-editor-previewer'}>{value}</MarkdownRenderer>
        </div>
      </div>
      <footer className={'markdown-editor-footer'}>

      </footer>
    </div>
  );
}

export default MarkdownEditor;
