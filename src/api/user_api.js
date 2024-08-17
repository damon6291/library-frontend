import { getToken } from 'src/utils/token';
import { ENDPOINTS } from './endpoints';
import useSWR from 'swr';
import { fetcher, noRevalidateOnlyStaleOptions } from 'src/utils/axios';
import { useMemo } from 'react';

export function useGetMe() {
  var URL = null;
  if (getToken()) URL = ENDPOINTS.user.get_me;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, noRevalidateOnlyStaleOptions);
  const memoizedValue = useMemo(
    () => ({
      searchResult: data?.result || {},
      role: data?.result?.role || '',
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
    }),
    [data?.result, error, isLoading, isValidating],
  );
  return memoizedValue;
}
