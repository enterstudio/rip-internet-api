import { bookshelf } from '../orm';
import { Writer } from '../writers/models';

export const Memory = bookshelf.Model.extend({
  tableName: 'memorys',
  hasTimeStamps: true,
  writer() {
    return this.hasOne(Writer, 'writer_id');
  },
});
