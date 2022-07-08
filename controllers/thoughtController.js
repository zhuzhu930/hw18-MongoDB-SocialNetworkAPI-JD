const { Thought, User, reactionSchema } = require('../models');

module.exports = {
  //Create 2 requests: Post and Delete
  // Route: 'api/thoughts/:thoughtId/reactions'
  createThought(req, res) {
    Thought.create(req.body)
      //? should this be updating the entire Thought or just the reactions
      .then((Thought) => res.json(Thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a Thought
  // Route: 'api/thoughts/:thoughtId/reactions'
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: 'No Thought with that ID' })
          : Thought.find(
            { $pull: {
              reactions: { _id: reactionId }}
            },
            { new: true }
          )
      )
      //not so sure how to delete reactions
      .then((Thought) => 
      !Thought
        ? res.json(404).json({
          message: 'Thought delete, but no reactions found'
        })
        : res.json({
          message: 'Thought and reactions successfully deleted'
        })
      )
      .catch((err) => res.status(500).json(err));
  }
}