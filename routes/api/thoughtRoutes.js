const router = require('express').Router();

const { 
  getAllThoughts, 
  getThoughtById, 
  createThought, 
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thoughtController');

// Route: /api/thoughts GET and POST all thoughts
router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);

// Route: /api/thoughts/:id, Use GET, PUT, DELETE requests
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought); 

// Route: /api/thoughts/:thoughtId/reactions, use POST and DELETE requests
router
  .route('/:id/reactions')
  .post(addReaction)

router
  .route('/:id/reactions/:reactionId')
  .delete(deleteReaction);

// Export: 
module.exports = router;
