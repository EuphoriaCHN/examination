import React from 'react';
import { Route, Routes } from 'react-router-dom';

// @loadable-components-start
import Information from '@/containers/Information';
import Management from '@/containers/Management';
import QuestionsList from '@/containers/QuestionsList';
import CreateQuestion from '@/containers/CreateQuestion';
import AutoGen from '@/containers/AutoGen';
import NotFound from '@/containers/NotFound';
// @loadable-components-end

function Router() {
  return (
    <Routes>
      <Route path={'/management'} element={<Management />} />
      <Route path={'/questions/create'} element={<CreateQuestion />} />
      <Route path={'/questions'} element={<QuestionsList />} />
      <Route path={'/generate'} element={<AutoGen />} />
      <Route path={'/information'} element={<Information />} />
      <Route path={'/'} element={<Information />} />
      <Route path={'*'} element={<NotFound />} />
    </Routes>
  );
}

export default Router;
