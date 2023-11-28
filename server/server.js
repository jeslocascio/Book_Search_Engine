const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4"); // Import Apollo Server Express middleware
const path = require("path");
const { authMiddleware } = require("./utils/auth"); // Import authentication middleware

const { typeDefs, resolvers } = require("./schemas"); // Import GraphQL type definitions and resolvers
const db = require("./config/connection"); // Import database connection settings

const PORT = process.env.PORT || 3001; // Define the port number for the server
const app = express(); // Create an Express application
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware, // Provide the authMiddleware as the context for resolving GraphQL requests
});

const startApolloServer = async () => {
  await server.start(); // Start the Apollo Server

  app.use(express.urlencoded({ extended: true })); // Middleware to parse incoming request bodies
  app.use(express.json());

  // Use Apollo Server Express middleware for handling GraphQL requests
  app.use("/graphql", expressMiddleware(server, { context: authMiddleware }));

  if (process.env.NODE_ENV === "production") {
    // Serve static files in production mode (e.g., React frontend)
    app.use(express.static(path.join(__dirname, "../client/dist")));

    // Serve the HTML file for all other routes
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.once("open", () => {
    // Once the database connection is open, start the server
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer(); // Start the Apollo Server and initiate the application
