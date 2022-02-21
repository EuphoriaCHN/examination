import { atom } from 'jotai';
import { createJotaiHook } from '@/common/utils';

export const categoriesAtom = atom<ICategoryItem[]>([]);

export const useCategoriesAtom = createJotaiHook(categoriesAtom);
