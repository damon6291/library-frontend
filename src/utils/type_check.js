import _ from 'lodash';

export function isEmpty(value) {
  if (_.isArray(value)) {
    return value.length === 0;
  } else if (_.isDate(value)) {
    return false;
  } else if (isObject(value)) {
    return _.isEmpty(value);
  } else {
    return value === '' || value == null;
  }
}

export function isNumber(value) {
  return _.isNumber(value);
}

export function isInteger(value) {
  return _.isInteger(value);
}

export function isString(value) {
  return _.isString(value);
}

export function isArray(value) {
  return _.isArray(value);
}

export function isObject(value) {
  return _.isObject(value);
}

export function isBoolean(value) {
  return _.isBoolean(value);
}

export function toBool(value) {
  if (isBoolean(value)) return value;
  if (value === 1) return true;
  if (value === 0) return false;
  if (value === '1') return true;
  if (value === '0') return false;
  if (value.toLowerCase() === 'false') return false;
  if (value.toLowerCase() === 'true') return true;
}

export function onlyContains(set, values) {
  var ret = true;
  set.forEach((element) => {
    if (!values.includes(element)) {
      ret = false;
    }
  });

  return ret;
}
