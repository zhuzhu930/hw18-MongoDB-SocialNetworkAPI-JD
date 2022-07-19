const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser, 
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users
// Get all users or post new users:
router
  .route('/')
  .get(getUsers)
  .post(createUser);

// /api/users/:id
// get, update or delete single user: 
router
  .route('/:id')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// /api/Users/:id/friends/:friendId
// Post or Delete a friend under User:
router
  .route('/:id/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;
