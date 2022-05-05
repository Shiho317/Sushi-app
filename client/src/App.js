import React, { useState, createContext } from "react";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Restaurants from "./components/Restaurants/Restaurants";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Favourite from "./components/Favourite/Favourite";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

export const AppContext = createContext();

function App() {
  const myStorage = window.localStorage;
  const userObj = myStorage.getItem("user");

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <ApolloProvider client={client}>
      <AppContext.Provider
        value={{ userObj, myStorage, loggedIn, setLoggedIn }}
      >
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Restaurants />} />
            <Route path="/:id" element={<Restaurants />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/favourite/:id" element={<Favourite />} />
          </Routes>
          <Footer />
        </Router>
      </AppContext.Provider>
    </ApolloProvider>
  );
}

export default App;
