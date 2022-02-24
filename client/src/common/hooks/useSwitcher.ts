import { useReducer } from 'react';

function switcherReducer(state: boolean, action: boolean): boolean {
  return typeof action === 'boolean' ? action : !state;
}

type SwitcherDispatcher = React.Dispatch<boolean | void>;

export function useSwitcher(initialState?: boolean) {
  const [flag, dispatcher] = useReducer(switcherReducer, !!initialState);

  return {
    flag,
    dispatcher,
    0: flag,
    1: dispatcher
  } as [boolean, SwitcherDispatcher] & {
    flag: boolean;
    dispatcher: SwitcherDispatcher
  };
}
