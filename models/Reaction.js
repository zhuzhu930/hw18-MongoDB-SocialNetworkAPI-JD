const { Schema, model } = require('mongoose');

// require moment in to format date later.
const moment = require('moment');

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
       username: {
        type: String,
        required: true,
       },
       createdAt: {
           type: Date,
           default: Date.now,
           get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
       },
    },
    {
        toJSON: {
            getters: true,
        },
        // timestamps: { createdAt: true },
    },
); 

//TODO: user a getter method to format the timestamp on query.
//Insert my code here, not so sure if the timestamps above is enough. 

// const Reaction = model('reaction', reactionSchema);

module.exports = reactionSchema; 