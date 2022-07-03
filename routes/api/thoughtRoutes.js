const router = require('express').Router();
//Only 1 route with POST and DELETE requests
const {
  createThought,
  deleteThought,
} = require('../../controllers/thoughtController.js');

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createThought).delete(deleteThought);

module.exports = router;
