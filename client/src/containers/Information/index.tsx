import React from 'react';

import { withFallbackRenderer } from '@/components/FallbackRenderer';
import { withAuthWrapper } from '@/components/AuthWrapper';
import { withMultiHoc } from '@/common/utils';
import { RouterBlocked } from '@/common/utils/constants';

import './index.scss';

function Information() {
  return (
    <div>
      <span>Information</span>
    </div>
  );
}

export default withMultiHoc([
  withFallbackRenderer(),
  withAuthWrapper({ blockList: RouterBlocked.Information })
], Information);
