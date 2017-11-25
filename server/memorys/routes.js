import { Router } from 'express';
import { Memory } from './models';

const router = new Router();

router.route('/')
  .get((req, res, next) => {
    if (req.query.memory_id) {
      Memory.where({ id: req.query.memory_id }).fetch()
        .then((data) => {
          res.status(200).send({
            memory: data.toJSON(),
          });
        });
    } else {
      Memory.where().fetchAll().then((data) => {
      res.status(200).send({
        memorys: data.toJSON(),
      })
    });
    }
  })
  .post((req, res, next) => {
    Memory.forge(req.body.memory).save().then((newMemory) => {
      res.status(200).send();
    });
  });


module.exports = router;
