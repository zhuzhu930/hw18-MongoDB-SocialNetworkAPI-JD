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
router.route('/').get(getAllThoughts).post(createThought);

// Route: /api/thoughts/:thoughtId, Use GET, PUT, DELETE requests
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought); 

// Route: /api/thoughts/:thoughtId/reactions, use POST and DELETE requests
router.route('/:thoughtId/reactions').post(addReaction).delete(deleteReaction);

// Export: 
module.exports = router;
