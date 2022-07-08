const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// Aggregate function to get the number of users overall
const headCount = async () =>
  User.aggregate()
    .count('userCount')
    .then((numberOfUsers) => numberOfUsers);

module.exports = {
  // Get all Users, GET requests
  // Route: '/'
  getUsers(req, res) {
    User.find()
      .then(async (Users) => {
        const UserObj = {
          Users,
          headCount: await headCount(),
        };
        return res.json(UserObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single User by its _id: , GET request
  // Route: '/:UserId'
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.UserId })
      .select('-__v')
      .then(async (User) =>
        !User
          ? res.status(404).json({ message: 'No User with that ID' })
          : res.json({
              User,
              //populate Thought and friend data
              thoughts,
              friends, 
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new User, POST requests
  // Route: '/'
  createUser(req, res) {
    User.create(req.body)
      .then((User) => res.json(User))
      .catch((err) => res.status(500).json(err));
  },

  //PUT request to update a user by its _id:
  // Route: '/:UserId' 
  updateUser(req, res) {
    User.put(() => {
      const { id: _id } = req.params;
      const { position } =  req.body; 

      const updateUser = {
        _id, 
        position
      }

      User.findByIdAndUpdate(
        _id, 
        updateUser, 
        //handle errors
        (err, updateUser) => {
          if (err) {
            res.json({
              updateUser, 
              success: false, 
              msg: 'Failed to update user'
            })
          } else {
            res.json({updateUser, success: true, msg: 'User updated'})
          }
        }
      )
    })
  },

  // Delete a User by its _id, DELETE requests
  //Route: '/:UserId'
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.UserId })
      .then((User) =>
        !User
          ? res.status(404).json({ message: 'No such user exists' })
          //remove a user's associated Thoughts when deleted: 
          : Thought.find(
              // { username: req.body },
              { $pull: {
                username: { _id: UserId }} 
              },
              { new: true }
            )
      )
      .then((Thought) =>
        !Thought
          ? res.status(404).json({
              message: 'User deleted, but no Thoughts found',
            })
          : res.json({ message: 'User and Thoughts successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add a new friend to a User's friend list
  // Route: '/:UserId/friends'
  addFriend(req, res) {
    console.log('You are adding a friend');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.UserId },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    )
      .then((User) =>
        !User
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(User)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove a friend from a User's friends list
  // Route: '/:UserId/friends/:friendId'
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.UserId },
      //? is it correct to use friendId, or should I use ObjectId?
      { $pull: { friends: { friendId: req.params.friendId } } },
      { runValidators: true, new: true }
    )
      .then((User) =>
        !User
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(User)
      )
      .catch((err) => res.status(500).json(err));
  },
};
