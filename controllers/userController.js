const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// Aggregate function to get the number of users overall
const headCount = async () =>
  User.aggregate()
    .count('userCount')
    .then((numberOfUsers) => numberOfUsers);

module.exports = {
  // Get all Users, GET request
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
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.UserId })
      .select('-__v')
      .then(async (User) =>
        !User
          ? res.status(404).json({ message: 'No User with that ID' })
          : res.json({
              User,
              //populate thought and friend data
              thoughts,
              friends, 
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new User, POST request
  createUser(req, res) {
    User.create(req.body)
      .then((User) => res.json(User))
      .catch((err) => res.status(500).json(err));
  },

  //PUT request to update a user by its _id: 
  updateUser(req, res) {
    User.put('/:id', (req, res) => {
      const { id: _id } = req.params;
      const {position} =  req.body; 

      const newUser = {
        _id, 
        position
      }

      User.findByIdAndUpdate(
        _id, 
        newUser, 
        (err, updatedUser) => {
          if (err) {
            res.json({
              newUser, 
              success: false, 
              msg: 'Failed to update user'
            })
          } else {
            res.json({newUser, success: true, msg: 'User updated'})
          }
        }
      )
    })
  },

  // Delete a User by its _id, DELETE request
  //? Not so sure whether it's working or not.
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.UserId })
      .then((User) =>
        !User
          ? res.status(404).json({ message: 'No such user exists' })
          //remove a user's associated thoughts when deleted: 
          : Thought.find(
              // { username: req.body },
              { $pull: {
                username: { _id: UserId }} 
              },
              { new: true }
            )
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: 'User deleted, but no thoughts found',
            })
          : res.json({ message: 'User and thoughts successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
// --------------------------------------
// --------------------------------------
// --------------------------------------
// --------------------------------------
  // TODOAdd a new friend to a User's friend list

  addAssignment(req, res) {
    console.log('You are adding an assignment');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.UserId },
      { $addToSet: { assignments: req.body } },
      { runValidators: true, new: true }
    )
      .then((User) =>
        !User
          ? res
              .status(404)
              .json({ message: 'No User found with that ID :(' })
          : res.json(User)
      )
      .catch((err) => res.status(500).json(err));
  },

  
  // Remove a friend from a User's friend list
  removeAssignment(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.UserId },
      { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
      { runValidators: true, new: true }
    )
      .then((User) =>
        !User
          ? res
              .status(404)
              .json({ message: 'No User found with that ID :(' })
          : res.json(User)
      )
      .catch((err) => res.status(500).json(err));
  },
};
