const { Schema, Types } = require('mongoose');
// const ObjectId = require('mongodb').ObjectId;

// require moment in to format date later.
const moment = require('moment');

// Schema to create reaction model
const reactionSchema = new Schema(
    {
       reactionId: {
           type: Schema.Types.ObjectId,
           default: () => new Types.ObjectId(), 
           maxlength: 50,
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
        id: false
    },
); 

module.exports = reactionSchema; 