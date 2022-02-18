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

/**
 * 题目难度 TextColor
 */
export const QuestionDifficultyColors = {
  [QuestionDifficultyLevel.TEST]: {
    color: 'rgba(var(--semi-light-blue-6), 1)',
    backgroundColor: 'rgba(var(--semi-light-blue-1), 1)'
  },
  [QuestionDifficultyLevel.EASY]: {
    color: 'rgba(var(--semi-green-6), 1)',
    backgroundColor: 'rgba(var(--semi-green-1), 1)',
  },
  [QuestionDifficultyLevel.NORMAL]: {
    color: 'rgba(var(--semi-orange-6), 1)',
    backgroundColor: 'rgba(var(--semi-orange-1), 1)'
  },
  [QuestionDifficultyLevel.HARD]: {
    color: 'rgba(var(--semi-red-6), 1)',
    backgroundColor: 'rgba(var(--semi-red-1), 1)',
  },
  [QuestionDifficultyLevel.HELL]: {
    color: 'rgba(var(--semi-pink-6), 1)',
    backgroundColor: 'rgba(var(--semi-pink-1), 1)',
  },
} as const;
