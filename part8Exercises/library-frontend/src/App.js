
import React, { useState, useEffect } from 'react';
import { 
  Switch,
  Route,
  Link,
  Redirect,
  BrowserRouter as Router
} from 'react-router-dom';

import { useApolloClient } from '@apollo/client';



import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import { GET_BOOKS } from './queries';

const App = () => {
  const [token, setToken] = useState(null);
  const [showRecommended, setShowRecommended] = useState(false);
  const [genreSelect, setGenreSelect] = useState('All Genres');

  const client = useApolloClient();

  useEffect(() => {
    const token = localStorage.getItem('library-user-token');
    if (token) {
      setToken(token);
    }
  }, [token]);

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);
    
    const dataInStore = client.readQuery({ query: GET_BOOKS, variables: { showRecommended: false } });

    if (!includedIn(dataInStore.getBooks.books, addedBook)) {
      client.writeQuery({
        query: GET_BOOKS,
        variables: { showRecommended: false },
        data: { allPersons: dataInStore.getBooks.books.concat(addedBook) }
      });
    }
  }

  const padding = { padding: 5 };
  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };


  return (
    <Router>
      <div>
        <Link style={padding} to='/authors'>authors</Link>
        <Link style={padding} to='/books' onClick={() => {
          setShowRecommended(false)
          setGenreSelect('All Genres')
        }}>books</Link>
        {
          token 
            ? (
                <>
                  <Link style={padding} to='/add-book'>add book</Link>
                  <Link style={padding} to='/reccomended' onClick={() => setShowRecommended(true)}>recommended</Link>
                  <button onClick={() => logout()}>logout</button>
                </>
              )
            : <Link style={padding} to='/login'>login</Link>
        }
        
      </div>
      <Switch>
        <Route path="/authors">      
          <Authors token={token} />
        </Route>
        <Route path="/books">
          <Books
            showRecommended={showRecommended}
            genreSelect={genreSelect}
            setGenreSelect={setGenreSelect}
          />
        </Route>
        <Route path="/add-book">  
          <NewBook updateCacheWith={updateCacheWith} />
        </Route>
        <Route path="/reccomended">  
          {token ? <Books showRecommended={showRecommended} genreSelect={genreSelect} setGenreSelect={setGenreSelect} /> : <Redirect to="/authors" />}
        </Route>
        <Route path="/login">  
          {token ? <Redirect to="/authors" /> : <LoginForm setToken={setToken} />}
        </Route>
        <Route path="/">  
          <Authors />
        </Route>
      </Switch>
    </Router>
  )
}

export default App