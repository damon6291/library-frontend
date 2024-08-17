const ROOTS = {
  auth: '/auth',
  common: '/common',
  admin: '/admin',
};

export const PATHS = {
  home: '/',
  auth: {
    login: `${ROOTS.auth}/login`,
    register: `${ROOTS.auth}/register`,
  },
  common: {
    search: `${ROOTS.common}/search`,
    book: (bookId) => `${ROOTS.common}/book/${bookId}`,
    books: `${ROOTS.common}/books`,
    userBook: `${ROOTS.common}/borrowed-books/`,
  },
  admin: {
    book_table: `${ROOTS.admin}/books`,
    book_add: `${ROOTS.admin}/books/new`,
    book_edit: (bookId) => `${ROOTS.admin}/books/edit/${bookId}`,
    return: `${ROOTS.admin}/return`,
  },
};
