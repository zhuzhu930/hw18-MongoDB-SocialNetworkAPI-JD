const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

const userController = {
  // Get all Users, GET requests
  // Route: '/'
  getUsers(req, res) {
    User.find({})
      .populate({ 
        path: 'thoughts', 
        select: '-__v'
      })
      .select('-__v')
      // .then((usersData) => res.json(usersData))
      .sort({ _id: -1 })
      .then((usersData) => res.json(usersData))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single User by its _id: , GET request
  // Route: '/api/users/:userId'
  getSingleUser({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({ 
        path: 'thoughts', 
        select:'-__v'
      })
      // .populate({ path: 'friends', select: '-__v'})
      .select('-__v')
      .then((userData) => {
        !userData
          ? res.status(404).json({ message: 'No User with that ID' })
          : res.json(userData)
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new User, POST requests
  // Route: '/'
  createUser({ body }, res) {
    User.create(body)
      .then((userData) => res.json(userData))
      .catch(err => res.status(500).json(err));
  },

  //PUT request to update a user by its _id:
  // Route: '/:userId' 
  updateUser({ params, body }, res) {
    User.findOneAndUpdate(
      //changed userId to id
      { _id: params.id }, 
      body, 
      { new: true, runValidators: true }
      )
      .then((userData) => {
        !userData
          ? res.status(404).json({ message: 'No user with this ID!'})
          : res.json(userData);
      })
      .catch(err => res.status(500).json(err))
  },

  // Delete a User by its _id, DELETE requests
  //Route: '/:userId'
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
    .then((userData) => {
      !userData
        ? res.status(404).json({ message: 'No user with this Id!'})
        : res.json(userData);
    })
    .catch(err => res.status(500).json(err));
  },

  // Add a new friend to a User's friend list
  // Route: '/:userId/friends'
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $addToSet: { friends: params.friendId } },
      { new: true })
      // .populate({ path: 'friends', select: ('-__v')})
      // .select('-__v')
      .then((userData) =>
        !userData
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(userData)
      )
      .catch(err => res.status(500).json(err));
  },

  // Remove a friend from a User's friends list
  // Route: '/:userId/friends/:friendId'
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId }},
      { new: true })
      // .populate({ path: 'friends', select: '-__v'})
      // .select('-__v')
      .then((userData) => {
        !userData
          ? res
              .status(404)
              .json({ message: 'No user found with that ID' })
          : res.json(userData)
      })
      .catch(err => res.status(500).json(err));
  },
};

module.exports = userController; 