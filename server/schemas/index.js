// Requiring/importing the type definitions and resolvers from separate files
const typeDefs = require('./typeDefs'); // Importing GraphQL type definitions
const resolvers = require('./resolvers'); // Importing GraphQL resolvers

// Exporting both typeDefs and resolvers as an object
module.exports = { 
  typeDefs, // GraphQL type definitions
  resolvers, // GraphQL resolvers
};