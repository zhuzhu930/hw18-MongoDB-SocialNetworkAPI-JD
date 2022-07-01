const { Schema, model } = require('mongoose');
const userSchema = require('./User'); 
const reactionSchema = require('./Reaction')

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
       thoughtText: {
           type: String,
           required: true, 
           max_length: 280, 
       }, 
       createdAt: {
           type: Date,
           default: Date.now,
       },
       //How to link this username to user.
       username: {
           type: String,
           required: true,
           ref: 'user',
       },
       reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        }
    }
); 

//TODO: user a getter method to format the timestamp on query.
//Insert my code here

//TODO: create a virtual called reactionCount
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length; 
}); 

const Thought = model('thought', thoughtSchema); 

module.exports = Thought; 