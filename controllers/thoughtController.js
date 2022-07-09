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

  // Route: /api/thoughts/, createThought, 
  createThought(req, res) {
    Thought.create(req.body)
      .then(async (thought) => {
        const user = await User.findOneAndUpdate(
          { username: req.body.username },
          { $push: { thoughts: thought } },
          { runValidators: true, new: true }
        );
        user.save();
        res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Route: /api/thoughts/:thoughtId, getThoughtById, 
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
    // .populate({ path: 'reactions', select: '-__v'})
    .select('-__v')
    .then((thought) => {
      !thought
      ? res.status(404).json({ message: "No thought with that Id!"})
      : res.json(thought)
    })
    .catch(err => res.status(500).json(err));
  },

  // Route: /api/thoughts/:thoughtId, updateThought,
  updateThought({params, body}, res) {
    Thought.findOneAndUpdate(
      {_id: params.thoughtId}, 
      body, 
      {new: true, runValidators: true})
    // .populate({path: 'reactions', select: '-__v'})
    .select('-___v')
    .then((thought) => {
        !thought
        ? res.status(404).json({message: 'No thought with this particular ID!'})
        : res.json(thought)
    })
    .catch((err) => res.json(err));
},

  // Route: /api/thoughts/:thoughtId, deleteThought,
  deleteThought(req, res) {
    Thought.findOneAndDelete({_id: req.params.thoughtId})
    .then((thought) => {
      !thought
      ? res.status(404).json({message: 'No thought with this particular ID!'})
      : res.json(thought)
    })
    .catch((err) => res.status(400).json(err));
},

  // Route: /api/thoughts/:thoughtId/reactions, addReaction,
  addReaction({params, body}, res) {
    Thought.findOneAndUpdate(
      {_id: params.thoughtId}, 
      {$push: {reactions: body}}, 
      {new: true, runValidators: true})
    // .populate({path: 'reactions', select: '-__v'})
    // .select('-__v')
    .then((thought) => {
      thought.save();
      res.json(thought);
      // !thought
      // ? res.status(404).json({message: 'No thought with this particular ID!'})
      // : res.json(thought)
    })
    .catch((err) => res.json(err))
},
  // Route: /api/thoughts/:thoughtId/reactions, deleteReaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      {_id: req.params.thoughtId}, 
      {$pull: {reactions: {reactionId: req.params.reactionId}}}, 
      {new : true}
    )
    .then((thought) => {
      !thought
      ? res.status(404).json({message: 'No thought with this particular ID!'})
      : res.json(thought)
    })
    .catch((err) => res.status(400).json(err));
}  
}