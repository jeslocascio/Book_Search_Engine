// Importing necessary models and utility functions
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

// Resolvers define how the GraphQL server responds to queries and mutations
const resolvers = {
  // Query resolvers
  Query: {
    // Me resolver returns a User object if there's a user in the context
    me: async (parent, args, context) => {
      if (context.user) {
        // If there's a user in the context, query the database for that user's information
        return User.findOne({ _id: context.user._id });
      }
      // If there's no user in the context, return an error
      throw new Error('You need to be logged in!');
    },
  },
  // Mutation resolvers
  Mutation: {
    // Login resolver returns a token and a User object if the email/password combination is valid
    login: async (parent, { email, password }) => {
      // Retrieve the user from the database using the email address
      const user = await User.findOne({ email });
      // If there's no user with this email address, return an error
      if (!user) {
        throw new Error('No user found with this email address');
      }
      // Check if the password is correct
      const correctPw = await user.isCorrectPassword(password);
      // If the password is incorrect, return an error
      if (!correctPw) {
        throw new Error('Incorrect password');
      }
       // Generate a JWT token using the signToken function and return the token along with user details
      const token = signToken(user);
      return { token, user };
    },
    // Add user resolver returns a token and a User object if the email address isn't already in the database
    addUser: async (parent, { username, email, password }) => {
      // Create a new user with the specified username, email address, and password
      const user = await User.create({ username, email, password });
      // Generate a JWT token using the signToken function and return the token along with user details
      const token = signToken(user);
      return { token, user };
    },
    // Save book resolver returns a User object if the user is logged in
    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {
        // If there's a user in the context, update the user's savedBooks array with the new book information
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookData } },
          { new: true }
        );
        // Return the updated user
        return updatedUser;
      }
      // If there's no user in the context, return an error
      throw new Error('You need to be logged in!');
    },
    // Remove book resolver returns a User object if the user is logged in
    removeBook: async (parent, { bookId }, context) => {
      // Check if the user is authenticated in the context
      if (context.user) {
        // If there's a user in the context, update the user's savedBooks array by removing the specified bookId
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        // Return the updated user
        return updatedUser;
      }
      // If there's no user in the context, return an error
      throw new Error('You need to be logged in!');
    },
  },
};

// Export the resolvers
module.exports = resolvers;