const router = require('express').Router();
const {
  // getThoughts,
  // getSingleThought,
  createThought,
  // updateThought,
  deleteThought,
} = require('../../controllers/ThoughtController.js');

// /api/Thoughts
router.route('/:thoughtId/reactions').post(createThought).delete(deleteThought);

// /api/Thoughts/:ThoughtId
// router
//   .route('/:ThoughtId')
//   .get(getSingleThought)
//   .put(updateThought)
//   .delete(deleteThought);

module.exports = router;
