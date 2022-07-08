const router = require('express').Router();

const { 
  getAllThoughts, 
  getThoughtsById, 
  createThoughts, 
  updateThoughts,
  deleteThoughts,
  addReaction,
  deleteReaction

} = require('../../controllers/thoughtController');

// Route: /api/thoughts GET all thoughts
router.route('/').get(getAllThoughts);

// Route: /api/thoughts/:id, Use GET, PUT, DELETE requests
router.route('/:id').get(getThoughtsById).put(updateThoughts).delete(deleteThoughts); 

// Route: /api/thoughts/:userId, Use POST requests
router.route('/:userId').post(createThoughts);

// Route: /api/thoughts/:thoughtId/reactions, use POST requests
router.route('/:thoughtId/reactions').post(addReaction);

// Route: /api/thoughts/:thoughtId/reactionId, use DELETE requests
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// Export: 
module.exports = router;
