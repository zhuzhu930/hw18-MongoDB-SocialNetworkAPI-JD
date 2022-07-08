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
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
// get, update or delete single user: 
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/Users/:userId/friends/:friendId
// Post or Delete a friend under User:
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
