const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

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
      match: /.+\@.+\..+/,
      unique: true
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref:'user'
        }
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

//Create a virtual for friendCount: 
userSchema.virtual('friendCount').get(function () {
    return this.friends.length; 
})


const User = model('user', userSchema);

module.exports = User;