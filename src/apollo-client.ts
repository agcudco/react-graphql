import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql", // Reemplaza con tu API GraphQL
  cache: new InMemoryCache(),
});
export default client;