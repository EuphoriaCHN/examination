import { atom } from 'jotai';
import { createJotaiHook } from '@/common/utils';

export const questionAtom = atom<IQuestionItem | null>(null);

export const useQuestionAtom = createJotaiHook(questionAtom);
