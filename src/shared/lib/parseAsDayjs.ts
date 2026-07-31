import dayjs, { type Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { createParser } from 'nuqs';

import { DATE_FORMAT } from './zodDate';

dayjs.extend(customParseFormat);

export const parseAsDayjs = createParser({
  parse(value) {
    const parsed = dayjs(value, DATE_FORMAT, true);
    return parsed.isValid() ? parsed : null;
  },
  serialize(value: Dayjs) {
    return value.format(DATE_FORMAT);
  },
  eq(a, b) {
    return a.isSame(b, 'day');
  },
});
