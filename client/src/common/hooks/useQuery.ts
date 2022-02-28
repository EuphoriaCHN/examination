import { useLocation } from 'react-router-dom';
import qs from 'qs';

export function useQuery<T extends {} = any>(): T {
  const _location = useLocation();

  const searchStr = (_location.search || '?').split(/^\?/)[1];

  return qs.parse(searchStr) as T;
}