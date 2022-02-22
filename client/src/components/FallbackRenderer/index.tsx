import React from 'react';
import I18n from '@/i18n';

import { Empty, Typography, Button, Modal } from 'semi';
import { IconRefresh } from 'semi-icons';
import { IllustrationFailure, IllustrationFailureDark } from '@douyinfe/semi-illustrations';
import HighlightCodeRenderer from '@/components/HighlightCodeRenderer';
import { createIllustration } from '@/common/utils';

import './index.scss';
import withMaxClick from '../MaxClickListener';

const Illustration = withMaxClick({
  count: 5,
  message: (count, target) => I18n.t('再点击 {count} 次以查看错误日志', { count: target - count }),
  messageWatermark: 3
})(createIllustration({
  image: IllustrationFailure,
  darkImage: IllustrationFailureDark
}));

interface IWithFallbackRendererOptions {
  homePage?: string;
}

interface IWithFallbackRendererState {
  isError: boolean;
  errorData: {
    error: Error;
    errorInfo: React.ErrorInfo;
  } | null;
}

export function withFallbackRenderer(options?: IWithFallbackRendererOptions) {
  return function <T extends {}>(
    Component: React.ComponentType<T>
  ): React.ComponentClass<T, IWithFallbackRendererState> {
    return class extends React.Component<T, IWithFallbackRendererState> {
      constructor(props: T) {
        super(props);

        this.state = {
          isError: false,
          errorData: null,
        };
      }

      componentDidMount() {
        this.setState({ isError: false, errorData: null });
      }

      componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        this.setState({
          isError: true,
          errorData: { error, errorInfo }
        });
      }

      handleRefresh = () => {
        window.location.reload();
      };

      handleGoHome = () => {
        window.location.href = options?.homePage ?? '/';
      };

      onMaxClick = () => {
        const { message, stack } = this.state.errorData?.error || {};

        Modal.info({
          title: I18n.t('错误日志'),
          content: (
            <div style={{ paddingTop: 24 }}>
              <HighlightCodeRenderer
                children={`${message}\n\n${stack || ''}`}
                className='language-text'
              />
            </div>
          ),
          okButtonProps: { style: { display: 'none' } },
          cancelText: I18n.t('关闭'),
          width: 646
        });
      };

      render() {
        const isError = this.state.isError;

        if (!isError) {
          return <Component {...this.props} />;
        }

        return (
          <Empty
            image={<Illustration onMaxClick={this.onMaxClick} />}
            className={'fallback-empty'}
          >
            <Typography.Title heading={6}>
              {I18n.t('Ops! 出现了未知的错误')}
            </Typography.Title>
            <div className={'fallback-empty-content'}>
              <Button icon={<IconRefresh />} onClick={this.handleRefresh}>
                {I18n.t('刷新页面')}
              </Button>
              <Button icon={<IconRefresh />} theme={'solid'} onClick={this.handleGoHome}>
                {I18n.t('回到主页')}
              </Button>
            </div>
          </Empty>
        );
      }
    }
  }
}