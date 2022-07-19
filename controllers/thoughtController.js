const { Thought, Reaction } = require('../models/Thought');
const User = require('../models/User');

const thoughtController = {
  // Route: /api/thoughts, getAllThoughts, 
  getAllThoughts(req, res) {
    Thought.find({})
    .populate({ 
      path: 'reactions', 
      select: '-__v'
    })
    .select('-__v')
    .then((thoughts) => res.json(thoughts))
    .catch((err) => res.status(500).json(err));
  },

  // Route: /api/thoughts/, createThought, 
  createThought({ body }, res) {
    Thought.create(body)
      .then((_id) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((thoughtData) => {
        !thoughtData
          ? res.status(404).json({ message: "No user created."})
          : res.json(thoughtData)
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Route: /api/thoughts/:id, getThoughtById, 
  getThoughtById({ params }, res) {
    //changed thoughtId into id
    Thought.findOne({ _id: params.id })
    // .populate({ path: 'reactions', select: '-__v'})
    // .select('-__v')
    .then((thoughtData) => {
      !thoughtData
      ? res.status(404).json({ message: "No thought with that Id!"})
      : res.json(thoughtData)
    })
    .catch((err) => res.status(500).json(err));
  },

  // Route: /api/thoughts/:id, updateThought,
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id }, 
      body, 
      { new: true })
    // .populate({path: 'reactions', select: '-__v'})
    // .select('-___v')
    .then((thoughtData) => {
        !thoughtData
          ? res.status(404).json({message: 'No thought with this particular ID!'})
          : res.json(thoughtData)
    })
    .catch((err) => res.json(err));
},

  // Route: /api/thoughts/:id, deleteThought,
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
    .then((thoughtData) => {
      !thoughtData
        ? res.status(404).json({message: 'No thought with this particular ID!'})
        : res.json(thoughtData)
    })
    .catch((err) => res.status(400).json(err));
},

  // Route: /api/thoughts/:id/reactions, addReaction,
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id }, 
      { $addToSet: {reactions: body} }, 
      { new: true })
    .then((thoughtData) => {
      !thoughtData
        ? res.status(404).json({message: 'No thought with this particular ID!'})
        : res.json(thoughtData)
    })
    .catch((err) => res.json(err))
},
  // Route: /api/thoughts/:id/reactions/:reactionId, deleteReaction
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id }, 
      { $pull: { reactions: { reactionId: params.reactionId } } }, 
      { new : true }
    )
    .then((thoughtData) => {
      !thoughtData
      ? res.status(404).json({message: 'No thought with this particular ID!'})
      : res.json(thoughtData)
    })
    .catch((err) => res.status(400).json(err));
}  
};

module.exports = thoughtController; 