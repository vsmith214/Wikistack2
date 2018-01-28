'use strict';

const router = require('express').Router();
const wikiRouter = require('./wiki');
const userRouter = require('./users');


module.exports = router;

router.get('/', (req, res, next) => res.render('index'));
router.use('/wiki', wikiRouter);
router.use('/users', userRouter);