import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_BOOKS } from '../queries';

const Books = ({ showRecommended, genreSelect, setGenreSelect }) => {

  const result = useQuery(GET_BOOKS, {
    variables: { showRecommended },
    onCompleted: (result) => {
      if (showRecommended) {
        setGenreSelect(result.getBooks.genre)
      }
    }
  });


  if (result.loading) { return <div>loading...</div> }
  const booksList = result.data.getBooks.books;

  const genres = booksList
  // map books genres to an array of arrays
    .map((book) => book.genres)
  // reduce array down to one array of all genres
    .reduce((accumulator, currentValue) => (accumulator.concat(currentValue)), ['All Genres'])
  // filter array to only contain each unique genrey
    .filter((genre, index, arr) => arr.indexOf(genre) === index);

  return (
    <div>
      <h2>Books</h2>
      <div>
        in genre <span style={{ fontWeight: "bold" }}>{genreSelect ? genreSelect : "any"}</span>
        {' '}
        {showRecommended
          ? null
          : <div>
              select: <select value={genreSelect} onChange={({ target }) => setGenreSelect(target.value)}>
              {
                genres.map((genre) => 
                  <option key={genre} value={genre}>{genre}</option>
              )}
              </select>
            </div>
        }
        
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {genreSelect === 'All Genres' || showRecommended
          ? booksList.map((a) => 
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>)
          : booksList
              .filter((book) => book.genres.includes(genreSelect))
              .map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books