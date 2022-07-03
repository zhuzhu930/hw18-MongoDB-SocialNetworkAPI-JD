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

// /api/Users
// Get all users or post new users:
router.route('/').get(getUsers).post(createUser);

// /api/Users/:UserId
// get, update or delete single user: 
router.route('/:UserId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/Users/:UserId/friends
// Add a friend under User:
router.route('/:UserId/friends').post(addFriend);

// /api/Users/:UserId/friends/:friendId
// Delete a friend under User:
router.route('/:UserId/friends/:friendId').delete(removeFriend);

module.exports = router;
