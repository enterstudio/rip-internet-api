import { Router } from 'express';
import { Memory } from './models';
import { Writer } from '../writers/models';

const router = new Router();

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
    Writer.where({ email: req.body.writer.email }).fetch().then((fetchedWriter) => {
      if (fetchedWriter) {
        Memory.forge({ message: req.body.memory.message, writer_id: fetchedWriter.id }).save().then((newMemory) => {
          res.status(200).send({
            memory: {
              message: newMemory.toJSON().message,
              writer: {
                name: fetchedWriter.toJSON().name,
                email: fetchedWriter.toJSON().email,
              },
            },
          });
        });
      } else {
        Writer.forge({ name: req.body.writer.name, email: req.body.writer.email }).save().then((newWriter) => {
          Memory.forge({ message: req.body.memory.message, writer_id: newWriter.toJSON().id }).save().then((newMemory) => {
            res.status(200).send({
              memory: {
                message: newMemory.toJSON().message,
                writer: {
                  name: newWriter.toJSON().name,
                  email: newWriter.toJSON().email,
                },
              },
            });
          });
        });
      }
    });
  });


module.exports = router;
