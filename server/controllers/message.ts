import express, { Router } from 'express'

var router: Router = express.Router();

router.get('/', function (req, res) {
  return res.status(200).send({
    text: "hello message desu!"
  });
});

export default router;
