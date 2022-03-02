import React from 'react';

import { withFallbackRenderer } from '@/components/FallbackRenderer';
import { withMultiHoc } from '@/common/utils';
import { withAuthWrapper } from '@/components/AuthWrapper';
import { RouterBlocked } from '@/common/utils/constants';

import './index.scss';

function AutoGen() {
  return <span>AutoGen</span>;
}

export default withMultiHoc([
  withFallbackRenderer(),
  withAuthWrapper({ blockList: RouterBlocked.Generate })
], AutoGen);
