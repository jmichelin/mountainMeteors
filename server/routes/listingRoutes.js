const router = require('express').Router()
const db = require('../db.js')
const util = require('../util/authUtil');

router.get('/listings', util.checkToken, (req, res) => {
  console.log('listing req received', req.body);
  console.log('token', req.headers['x-access-token']);
  console.log('user info', req.user);
  return db('listings')
  .where({
    user_id: req.user.id
  })
  .then(function(listings) {
     res.send(listings);
  });
});

router.post('/listings/', (req, res) => {
  return db('listings')
  // return select().from('listings')
  .where({
    user_id: req.params.id
  })
  .then(function(listings) {
     res.send(listings);
  });
});

//TODO: Accommodate (with FE) to be a fully flexible PUT request
router.put('/listings/', (req, res) => {
  console.log('server put request', req.body);
  return db('listings')
  .where({
    id: req.params.id
  })
  .then(function(listings) {
     res.send(listings);
  });
});


module.exports = router;
