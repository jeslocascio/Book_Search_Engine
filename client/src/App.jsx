// Importing necessary styles and components
import "./App.css";
import { Outlet } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Navbar from "./components/Navbar";

// Creating an HTTP link for the Apollo Client
const httpLink = createHttpLink({ uri: "/graphql" });

// Creating an authentication link to attach the token to the request headers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      // Attaching the token to the authorization header
      authorization: token ? `Bearer: ${token}` : "",
    },
  };
});

// Creating an instance of ApolloClient with the authentication link and cache
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


// Main App component
function App() {
  return (
    // Providing the ApolloClient instance to the React app
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

// Exporting the App component
export default App;