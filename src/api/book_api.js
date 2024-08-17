import useSWR, { mutate } from 'swr';
import { ENDPOINTS } from './endpoints';
import axiosInstance, { fetcher, revalidateOnlyStaleOptions } from 'src/utils/axios';
import { getURL } from 'src/utils/url';
import { useMemo } from 'react';

var url = null;

export function useGetBooks(params) {
  const URL = getURL(ENDPOINTS.book.get_list, params);
  url = URL;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, revalidateOnlyStaleOptions);

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.result?.books || [],
      searchCount: data?.result?.count || 0,
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
    }),
    [data?.result, error, isLoading, isValidating],
  );
  return memoizedValue;
}
export function useGetBook(bookId) {
  const URL = ENDPOINTS.book.get(bookId);
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, revalidateOnlyStaleOptions);

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.result || {},
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
    }),
    [data?.result, error, isLoading, isValidating],
  );
  return memoizedValue;
}
export function useGetBookReviews(bookId, params) {
  const URL = getURL(ENDPOINTS.book.get_reviews(bookId), params);
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, revalidateOnlyStaleOptions);

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.result?.reviews || [],
      searchCount: data?.result?.count || 0,
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
    }),
    [data?.result, error, isLoading, isValidating],
  );
  return memoizedValue;
}
export function useGetBorrowedBooks(params) {
  const URL = getURL(ENDPOINTS.book.get_user_book, params);
  url = URL;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, revalidateOnlyStaleOptions);

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.result?.books || [],
      searchCount: data?.result?.count || 0,
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
    }),
    [data?.result, error, isLoading, isValidating],
  );
  return memoizedValue;
}

export async function upsertBook(data) {
  var ret = await axiosInstance.post(ENDPOINTS.book.upsert, data);
  return ret.data;
}

export async function deleteBook(bookId) {
  var ret = await axiosInstance.delete(ENDPOINTS.book.delete_book(bookId));
  return ret.data;
}

export async function rentBook(bookId) {
  var ret = await axiosInstance.put(ENDPOINTS.book.rent_book(bookId));
  mutate(ENDPOINTS.book.get(bookId));
  mutate(url);
  return ret.data;
}

export async function returnBook(bookId) {
  var ret = await axiosInstance.put(ENDPOINTS.book.return_book(bookId));
  return ret.data;
}
export async function writeReview(data) {
  var ret = await axiosInstance.post(ENDPOINTS.book.post_review, data);
  mutate(url);
  return ret.data;
}
