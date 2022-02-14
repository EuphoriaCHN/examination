import React from 'react';
import { useTranslation } from '@/i18n';

import ContentHeader from '@/components/ContentHeader';
import Editor from '@/components/Editor';

function CreateQuestion() {
  const { t } = useTranslation();

  return (
    <div>
      <ContentHeader
        title={t('创建题目')}
        brief={t('在这里创建一个新的面试题目')}
        allowGoBack
      />
      {/* todo:: https://ui.toast.com/tui-editor */}
      <Editor />
    </div>
  );
}

export default CreateQuestion;
