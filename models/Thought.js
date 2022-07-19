const { Schema, model, Types } = require('mongoose');
// const userSchema = require('./User'); 
const reactionSchema = require('./Reaction');
//for formatting date, use moment.
const moment = require('moment');

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
       thoughtText: {
           type: String,
           required: true, 
           minlength: 1,
           maxlength: 280, 
       }, 
       createdAt: {
           type: Date,
           default: Date.now,
           // use Moment
           get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
       },
       username: {
           type: String,
           required: true,
       },
       reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false
    }
); 

//Create a virtual called reactionCount
thoughtSchema
    .virtual('reactionCount')
    //Getter
    .get(function () {
    return this.reactions.length; 
    }); 

const Thought = model('Thought', thoughtSchema); 
const Reaction = model('Reaction', reactionSchema);

module.exports = { Thought, Reaction }; 