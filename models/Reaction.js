const { Schema } = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

// require moment in to format date later.
const moment = require('moment');

// Schema to create reaction model
const reactionSchema = new Schema(
    {
       reactionId: {
           type: ObjectId,
           default: () => new ObjectId(), 
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
    },
); 

module.exports = reactionSchema; 