const { Thought, User } = require('../models');

module.exports = {
  // Route: /api/thoughts, getAllThoughts, 
  getAllThoughts(req, res) {
    Thought.find()
    .populate({ path: 'reactions', select: '-__v'})
    .select('-__v')
    .then((thoughts) => res.json(thoughts))
    .catch((err) => res.status(500).json(err));
  },

  // Route: /api/thoughts/:id, getThoughtById, 
  getThoughtById({params}, res) {
    Thought.findOne({ _id: params.userId })
    // .populate({ path: 'reactions', select: '-__v'})
    .select('-__v')
    .then((thoughts) => {
      !thoughts
      ? res.status(404).json({ message: "No thought with that Id!"})
      : res.json(thoughts)
    })
    .catch(err => res.json(err));
  },

  // Route: /api/thoughts/:userId, createThought, 
  createThought({params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate( { _id: params.userId },
        {$push: {thoughts: _id }},
        {new: true});
      })
      .then((thoughtData) => {
        !thoughtData
        ? res.status(404).json({ message: "No thought with this Id!"})
        : res.json(thoughtData)
      })
      .catch(err => res.json(err)); 
  },

  // Route: /api/thoughts/:id, updateThought,
  updateThought({params, body}, res) {
    Thought.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
    .populate({path: 'reactions', select: '-__v'})
    .select('-___v')
    .then((thoughtData) => {
        !thoughtData
        ? res.status(404).json({message: 'No thoughts with this particular ID!'})
        : res.json(thoughtData)
    })
    .catch(err => res.json(err));
},

  // Route: /api/thoughts/:id, deleteThought,
  deleteThought({params}, res) {
    Thought.findOneAndDelete({_id: params.id})
    .then((thoughtData) => {
      !thoughtData
      ? res.status(404).json({message: 'No thought with this particular ID!'})
      : res.json(thoughtData)
    })
    .catch(err => res.status(400).json(err));
},

  // Route: /api/thoughts/:thoughtId/reactions, addReaction,
  addReaction({params, body}, res) {
    Thought.findOneAndUpdate(
      {_id: params.thoughtId}, 
      {$push: {reactions: body}}, 
      {new: true, runValidators: true})
    .populate({path: 'reactions', select: '-__v'})
    .select('-__v')
    .then((thoughtData) => {
      !thoughtData
      ? res.status(404).json({message: 'No thought with this particular ID!'})
      : res.json(thoughtData)
    })
    .catch(err => res.status(400).json(err))
},
  // Route: /api/thoughts/:thoughtId/reactions, deleteReaction
  deleteReaction({params}, res) {
    Thought.findOneAndUpdate(
      {_id: params.thoughtId}, 
      {$pull: {reactions: {reactionId: params.reactionId}}}, 
      {new : true})
    .then((thoughtData) => {
      !thoughtData
      ? res.status(404).json({message: 'No thought with this particular ID!'})
      : res.json(thoughtData)
    })
    .catch(err => res.status(400).json(err));
}  
}