import { merge } from 'lodash';
import Progress from './linear_progress';

// ----------------------------------------------------------------------

export function componentsOverrides(theme) {
  const components = merge(Progress(theme));

  return components;
}
