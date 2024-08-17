import { isArray, isEmpty } from './type_check';

export const getURL = (url, searchParam) => {
  const searchParams = getSearchParams(searchParam);
  return `${url}?${searchParams}`;
};

export const getSearchParams = (searchParam) => {
  const searchParams = new URLSearchParams();
  for (var propName in searchParam) {
    var obj = searchParam[propName];
    if (isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
        searchParams.append(propName, obj[i]);
      }
    } else {
      searchParams.append(propName, obj);
    }
  }

  return searchParams.toString();
};

export const cleanParams = (obj) => {
  for (var propName in obj) {
    if (isEmpty(obj[propName])) {
      delete obj[propName];
    }
  }
  return obj;
};
