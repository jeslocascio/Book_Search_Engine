const typeDefs = `
# Define which fields are accessible from the 'User' type
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

# Define which fields are accessible from the 'Book' type
  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

# Define which fields are accessible from the 'Auth' type
  type Auth {
    token: ID!
    user: User
  }

# Define which fields are accessible from the 'BookInput' type
  input BookInput {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

# Define which queries the front end can make to the back end
  type Query {
    # Me query returns a User object if there's a user in the context
    me: User
  }

# Define which mutations the front end can make to the back end
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: String!): User
  }
`;

// Export the typeDefs
module.exports = typeDefs;