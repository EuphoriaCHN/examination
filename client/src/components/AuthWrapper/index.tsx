import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Tooltip, Empty, Button } from 'semi';
import { IllustrationNoAccess, IllustrationNoAccessDark } from '@douyinfe/semi-illustrations';

import { useUserAtom } from '@/store/user';
import { AuthLevel } from '@/common/utils/constants';
import { createIllustration } from '@/common/utils';

import type { TooltipProps } from '@douyinfe/semi-ui/lib/es/tooltip';

type WithAuthConfig = {
  blockList?: Array<AuthLevel>;
  activeType?: 'hidden' | 'disable';
  tooltips?: TooltipProps;
};

type HocInjectProps = {
  auth?: WithAuthConfig;
};

export function withAuth(config: WithAuthConfig) {
  return function <P extends { disabled?: boolean }>(Component: React.ComponentType<P>): React.ComponentType<P & HocInjectProps> {
    return function (props: P & HocInjectProps) {
      const [user] = useUserAtom();
      const { t } = useTranslation();

      const blockList = props.auth?.blockList ?? config.blockList ?? [AuthLevel.User];
      const activeType = props.auth?.activeType ?? config.activeType ?? 'disable';
      const tooltips = props.auth?.tooltips ?? config.tooltips ?? null;

      const isDisabled = !user || (props.disabled ?? blockList.includes(user.permission));

      if (isDisabled && activeType === 'hidden') return null;

      const el = <Component {...props} />

      if (!tooltips) {
        return el;
      }

      return (
        <Tooltip {...tooltips} content={tooltips.content ?? t('普通用户没有权限')}>
          {el}
        </Tooltip>
      );
    }
  }
}

interface IAuthWrapperProps {
  blockList?: Array<AuthLevel>;
}

const Illustration = createIllustration({
  image: IllustrationNoAccess,
  darkImage: IllustrationNoAccessDark
});

export function AuthWrapper(props: React.PropsWithChildren<IAuthWrapperProps>) {
  const [user] = useUserAtom();
  const { t } = useTranslation();
  const _navigate = useNavigate();

  const blockList = props.blockList ?? [AuthLevel.User];
  const shouldBeBlocked = !user || blockList.includes(user.permission);

  const handleGoHome = React.useCallback(() => {
    _navigate('/');
  }, []);

  if (!shouldBeBlocked) return <React.Fragment>{props.children}</React.Fragment>;

  return (
    <Empty
      image={<Illustration />}
      title={t('Ops! 你没有访问权限')}
    >
      <Button theme={'solid'} onClick={handleGoHome} block>{t('回到主页')}</Button>
    </Empty>
  );
}

export function withAuthWrapper(config: IAuthWrapperProps = {}) {
  return function <P extends {}>(Component: React.ComponentType<P>) {
    return function (props: P) {
      return (
        <AuthWrapper {...config}>
          <Component {...props} />
        </AuthWrapper>
      );
    }
  }
}

export default AuthWrapper;