import React from 'react';

import { Layout, Typography } from 'semi';

import './index.scss';

const START_YEAR = 2021 as const;

function Footer() {
  const calculateYearRange = React.useMemo(() => {
    const nowYear = new Date().getFullYear();

    return nowYear === START_YEAR ? `${nowYear}` : `${START_YEAR}-${nowYear}`;
  }, []);

  return (
    <Layout.Footer className={'site-footer'}>
      <Typography.Text type={'tertiary'} size={'small'}>
        Copyright &copy; {calculateYearRange}
        &nbsp;<a href={'https://www.wqh4u.cn'} target={'_blank'} rel={'noopener noreferrer'}>Euphoria</a>.
        &nbsp;All Rights Reserved.
      </Typography.Text>
      <Typography.Text type={'tertiary'} size={'small'}>
        Powered by <a href={'https://semi.design'} target={'_blank'} rel={'noopener noreferrer'}>@douyinfe/semi-ui</a>
      </Typography.Text>
    </Layout.Footer>
  );
}

export default Footer;
