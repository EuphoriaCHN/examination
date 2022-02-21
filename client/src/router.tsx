import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Information from '@/containers/Information';
import Management from '@/containers/Management';
import QuestionsList from '@/containers/QuestionsList';
import QuestionDetail from '@/containers/QuestionDetail';
import CreateQuestion from '@/containers/CreateQuestion';
import AutoGen from '@/containers/AutoGen';
import NotFound from '@/containers/NotFound';

import { withFallbackRenderer } from '@/components/FallbackRenderer';

function Router() {
  const ROUTES = [{
    path: '/management',
    element: Management
  }, {
    path: '/questions/detail/:questionId',
    element: QuestionDetail
  }, {
    path: '/questions/:type',
    element: CreateQuestion
  }, {
    path: '/questions',
    element: QuestionsList
  }, {
    path: '/generate',
    element: AutoGen
  }, {
    path: '/information',
    element: Information
  }, {
    path: '/',
    element: Information
  }, {
    path: '*',
    element: NotFound
  }];

  return (
    <Routes>
      {ROUTES.map(({ path, element }) => {
        const Component = withFallbackRenderer()(element);
        return <Route path={path} element={<Component />} />;
      })}
    </Routes>
  );
}

export default Router;
