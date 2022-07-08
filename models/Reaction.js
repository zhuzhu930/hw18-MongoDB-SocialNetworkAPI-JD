const { Schema, model } = require('mongoose');
const userSchema = require('./User'); 
const thoughtSchema = require('./Thought')

// Schema to create reaction model
const reactionSchema = new Schema(
    {
       reactionId: {
           type: Schema.Types.ObjectId,
           default: () => new Types.ObjectId(), 
       }, 
       reactionBody: {
           type: String,
           required: true,
           maxlength: 280, 
       },
       //?: How to link this username to user.
       username: {
        type: String,
        required: true,
       },
       //?: how to use a getter method to formate the timestamp on query
       createdAt: {
           type: Date,
           default: Date.now,
       },
    },
    {
        toJSON: {
            getters: true,
        },
        timestamps: { createdAt: true },
    },
); 

//TODO: user a getter method to format the timestamp on query.
//Insert my code here, not so sure if the timestamps above is enough. 

// const Reaction = model('reaction', reactionSchema);

module.exports = reactionSchema; 