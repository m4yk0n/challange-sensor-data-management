import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App.jsx";

// Configuração do Apollo Client
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // URL do servidor GraphQL
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      {" "}
      <Router>
        {" "}
        <App />
      </Router>
    </ApolloProvider>
  </StrictMode>
);
