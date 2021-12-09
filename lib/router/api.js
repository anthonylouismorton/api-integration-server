'use strict';

const express = require('express');
const { Candidates } = require('../model');
const apiRouter = express.Router();

apiRouter.post('/api/test', (req, res, next) => {
  res.status(200).send('Partner, it\'s a work in progress.');
});

apiRouter.post('/api/candidate', async (req, res, next) => {
  try {
    let candidate = await Candidates.create(req.body);
    res.send(candidate);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

apiRouter.post('/vote', async (req, res, next) => {

  const { id } = req.body;

  try {
    let candidate = await Candidates.findOne({where: { id }});
    candidate.voteCount += 1;
    await candidate.save();
  
    res.send(200);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }

});

module.exports = apiRouter;
