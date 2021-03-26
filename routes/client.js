import express from 'express';
const router = express.Router();

// import client model
import Client from '../models/client';

// Add client
router.post('/new-client', async(req, res) => {
  const body = req.body;  
  try {
    const clientDB = await Client.create(body);
    res.status(200).json(clientDB); 
  } catch (error) {
    return res.status(500).json({
      message: 'error',
      error
    })
  }
});

// Put (update) client
router.put('/client/:id', async(req, res) => {
  const _id = req.params.id;
  const body = req.body;
  try {
    const clientDb = await Client.findByIdAndUpdate(
      _id,
      body,
      {new: true});
    res.json(clientDb);  
  } catch (error) {
    return res.status(400).json({
      message: 'error',
      error
    })
  }
});

// Get client
router.get('/client/:id', async(req, res) => {
  const _id = req.params.id;
  try {
    const clientDB = await Client.findOne({_id});
    res.json(clientDB);
  } catch (error) {
    return res.status(400).json({
      message: 'error',
      error
    })
  }
});

// Get all clients
router.get('/client', async(req, res) => {
  try {
    const clientDb = await Client.find();
    res.json(clientDb);
  } catch (error) {
    return res.status(400).json({
      message: 'error',
      error
    })
  }
});

// Delete client
router.delete('/client/:id', async(req, res) => {
  const _id = req.params.id;
  try {
    const clientDb = await Client.findByIdAndDelete({_id});
    if(!clientDb){
      return res.status(400).json({
        message: 'Id not found',
        error
      })
    }
    res.json(clientDb);  
  } catch (error) {
    return res.status(400).json({
      message: 'error',
      error
    })
  }
});

// router export
module.exports = router;