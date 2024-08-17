const ROOTS = {
  auth: `/auth`,
  book: '/book',
};

export const ENDPOINTS = {
  auth: {
    login: `${ROOTS.auth}/login`,
    register: `${ROOTS.auth}/register`,
    refresh: `${ROOTS.auth}/refresh`,
  },
  user: {
    get_me: `${ROOTS.auth}/me`,
  },
  book: {
    get: (bookId) => `${ROOTS.book}/${bookId}`,
    get_list: `${ROOTS.book}`,
    get_user_book: `${ROOTS.book}/user`,
    get_reviews: (bookId) => `${ROOTS.book}/review/${bookId}`,
    post_review: `${ROOTS.book}/review`,
    rent_book: (bookId) => `${ROOTS.book}/rent/${bookId}`,
    return_book: (bookId) => `${ROOTS.book}/return/${bookId}`,
    delete_book: (bookId) => `${ROOTS.book}/${bookId}`,
    upsert: `${ROOTS.book}/upsert`,
  },
};
