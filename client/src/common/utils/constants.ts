import I18n from "@/i18n";

/**
 * 题目难度
 */
export const enum QuestionDifficultyLevel {
  TEST = 0,
  EASY = 1,
  NORMAL = 2,
  HARD = 3,
  HELL = 4
};

/**
 * 题目难度 Label
 */
export const QuestionDifficultyLabel = {
  [QuestionDifficultyLevel.TEST]: I18n.t('入门'),
  [QuestionDifficultyLevel.EASY]: I18n.t('简单'),
  [QuestionDifficultyLevel.NORMAL]: I18n.t('中等'),
  [QuestionDifficultyLevel.HARD]: I18n.t('困难'),
  [QuestionDifficultyLevel.HELL]: I18n.t('地狱')
} as const;
