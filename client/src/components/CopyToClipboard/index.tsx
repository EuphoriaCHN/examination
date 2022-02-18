import React from 'react';
import { useTranslation } from 'react-i18next';
import copy from 'copy-to-clipboard';

import { Tooltip } from 'semi';

type TooltipProps = GetComponentProps<typeof Tooltip>;

interface IProps {
  onHoverText?: string;
  onCopiedText?: string;

  content: string;
  position?: TooltipProps['position'];
}

function CopyToClipboard(props: React.PropsWithChildren<IProps>) {
  const [copied, setCopied] = React.useState(false);
  const { t } = useTranslation();

  const handleOnClick = () => {
    if (copied) return;

    setCopied(true);
    copy(props.content);
  };

  const onMouseEnter = () => {
    setCopied(false);
  };

  return (
    <Tooltip
      content={
        copied ?
          props.onCopiedText ?? t('已复制到剪贴板') :
          props.onHoverText ?? t('点击复制')
      }
      position={props.position}
    >
      <span
        onClick={handleOnClick}
        onMouseEnter={onMouseEnter}
        style={{ cursor: 'pointer' }}
      >
        {props.children}
      </span>
    </Tooltip>
  );
}

export default CopyToClipboard;
