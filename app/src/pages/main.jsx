// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App.jsx";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

// BUSCANDO DADOS DO BACKEND PELO GRAPHQL
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from "./App.jsx";

// Configuração do Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // URL do servidor GraphQL
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}> {/* Envolve o App com ApolloProvider */}
      <App />
    </ApolloProvider>
  </StrictMode>
);
