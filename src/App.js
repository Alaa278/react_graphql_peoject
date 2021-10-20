import React from "react";
import "./App.css";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import { createHttpLink } from "apollo-link-http";
// import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import { setContext } from "@apollo/client/link/context";
import { ApolloLink } from "@apollo/client/link/core";
// pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddPickup from "./pages/AddPickup";

function App() {
  const authLink = setContext((_, { headers }) => {
    const tokens = localStorage.getItem("token");
    return {
      headers: {
        ...headers,
        authorization: tokens ? `Bearer ${tokens}` : "",
      },
    };
  });

  const httpLink = createHttpLink({
    uri: "http://accurate.accuratess.com:8000/graphql",
  });

  const client = new ApolloClient({
    cache: new InMemoryCache({
      addTypename: false,
    }),
    link: ApolloLink.from([authLink, httpLink]),
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <Container>
          <Switch>
            <Route exact path="/" render={(props) =>(
              <Login {...props} />
            )} />
            <Route exact path="/home" render={(props) => (
              <Home {...props} />
            )} />
            <Route exact path="/addPickup" render={(props) => (
              <AddPickup {...props} />
            )} />
          </Switch>
        </Container>
      </Router>
    </ApolloProvider>
  );
}

export default App;
