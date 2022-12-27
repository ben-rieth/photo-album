import { atom } from 'jotai';

export const tagsAtom = atom<string[]>([]);
export const filterAtom = atom<string | undefined>(undefined);
export const gridAtom = atom<number>(1);