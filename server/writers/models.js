import { bookshelf } from '../orm';
import { Memory } from '../memorys/models';

export const Writer = bookshelf.Model.extend({
  tableName: 'writers',
  hasTimeStamps: true,
  memorys(){
    return this.belongsToMany(Memory, 'writer_id');
  }
});
