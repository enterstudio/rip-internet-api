import { bookshelf } from '../orm';

export const Memory = bookshelf.Model.extend({
  tableName: 'memorys',
  hasTimeStamps: true,
});
