import { Router } from 'express';
import { Memory } from './models';
import { Writer } from '../writers/models';

const router = new Router();

async function getSertWriter(writerObj) {
  const writer = await Writer.where({ email: writerObj.email }).fetch().then(data => data);
  if (writer) {
    return data.id;
  }
  return Writer.forge(writerObj).save().then(data => data.id);
}

router.route('/')
  .get((req, res, next) => {
    if (req.query.memory_id) {
      Memory.where({ id: req.query.memory_id }).fetch({ withRelated: ['writer'] })
        .then((data) => {
          res.status(200).send({ memory: data.toJSON() });
        });
    } else {
      Memory.fetchAll({ withRelated: ['writer'] }).then((data) => {
      res.status(200).send({ memorys: data.toJSON() });
    });
    }
  })
  .post((req, res, next) => {
    const writerId = getSertWriter(req.body.writer);
    Memory.forge({ message: req.body.memory, writer_id: writerId }).save().then((newMemory) => {
      res.status(200).send({ memory: newMemory.toJSON() });
    });
  });


module.exports = router;
