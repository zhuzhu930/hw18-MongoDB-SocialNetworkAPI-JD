const { Schema, model } = require('mongoose');
// const thoughtSchema = require('./Thought');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address."],
      unique: true
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref:'User'
        },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false
  }
);

// Create a virtual for friendCount: 
// userSchema
//   .virtual('friendCount')
//   .get(function () {
//     return this.friends.length; 
//   });


const User = model('User', userSchema);

module.exports = User;