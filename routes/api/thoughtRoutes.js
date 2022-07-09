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

// Route: /api/thoughts GET all thoughts
router.route('/').get(getAllThoughts);

// Route: /api/thoughts/:thoughtId, Use GET, PUT, DELETE requests
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought); 

// Route: /api/thoughts/:userId, Use POST requests
router.route('/:userId').post(createThought);

// Route: /api/thoughts/:thoughtId/reactions, use POST requests
router.route('/:thoughtId/reactions').post(addReaction);

// Route: /api/thoughts/:thoughtId/reactionId, use DELETE requests
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// Export: 
module.exports = router;
