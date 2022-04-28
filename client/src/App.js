import React from 'react'
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Restaurants from './components/Restaurants/Restaurants';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';

const client = new ApolloClient({
  uri: 'http://localhost:8888/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Restaurants/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
        </Routes>
        <Footer/>
      </Router>
    </ApolloProvider>
  );
}

export default App;
