import { atom } from 'jotai';
import { createJotaiHook } from '@/common/utils';

export const userAtom = atom<Omit<IUser, 'password'> | null>(null);

export const useUserAtom = createJotaiHook(userAtom);
