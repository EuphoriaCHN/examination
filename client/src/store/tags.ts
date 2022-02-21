import { atom } from 'jotai';
import { createJotaiHook } from '@/common/utils';

export const tagsAtom = atom<ITagItem[]>([]);

export const useTagsAtom = createJotaiHook(tagsAtom);
