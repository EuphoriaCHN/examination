import I18n from '@/i18n';

export const LOCAL_STORAGE_AUTH_KEY = 'authorization';

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
 * 题目类型
 */
export const enum QuestionType {
  // 选择
  Choice = 0,
  MultiChoice = 1,
  // 主观题
  Subjective = 2,
  // 编程
  Programming = 3
}

/**
 * 用户权限
 */
export const enum AuthLevel {
  Admin = 0,
  Manager = 1,
  User = 2
}

/**
 * 题目类型 Label
 */
export const QuestionTypeLabel = {
  [QuestionType.Choice]: I18n.t('单项题'),
  [QuestionType.MultiChoice]: I18n.t('多选题'),
  [QuestionType.Subjective]: I18n.t('主观题'),
  [QuestionType.Programming]: I18n.t('编程题'),
} as const;

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

/**
 * 用户权限 Label
 */
export const AuthLevelLabel = {
  [AuthLevel.Admin]: I18n.t('超级管理员'),
  [AuthLevel.Manager]: I18n.t('管理员'),
  [AuthLevel.User]: I18n.t('普通用户')
} as const;

/**
 * Router Block
 */
export const RouterBlocked = {
  Information: [AuthLevel.Manager, AuthLevel.User],
  Generate: [AuthLevel.User],
  Management: [AuthLevel.User],
};