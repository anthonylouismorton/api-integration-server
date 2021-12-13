'use strict';

const express = require('express');
const { Candidates, Products, Categories } = require('../model');
const apiRouter = express.Router();

apiRouter.get('/products', async (req, res) => {
console.log('you are getting this')
  try {
    let products = await Products.findAll();
    let response = {
      count: products.length,
      results: products,
    };
    res.status(200).send(response);
  } catch(e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

apiRouter.post('/products', async (req, res) => {
  let { name, price, description, categoryId, inventoryCount, imageUrl} = req.body;
  console.log(req.body, '<---------------------this is the req.body')
  try {
    let product = await Products.create({
      name,
      description,
      price,
      categoryId,
      inventoryCount,
      imageUrl
    });
    console.log(product, '<--------------- this is the product')
    res.status(201).send(product);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

apiRouter.post('/categories', async (req,res,next)=>{
  // req.body === { name: 'bath stuff' };

  try {
    let rawData = {
      displayName: req.body.displayName,
      normalizedName: req.body.normalizedName,
      description: req.body.description,
    };
    let response = await Categories.create(rawData);
    res.status(201).send(response);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

apiRouter.get('/categories', async (req, res, next)=>{
  
  try{
    let categories = await Categories.findAll();
    let response = {
      count: categories.length,
      results: categories,
    };
    res.status(200).send(response);
  }catch(e){
    console.log(e);
    res.status(400).send(e.message);
  }
});





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
