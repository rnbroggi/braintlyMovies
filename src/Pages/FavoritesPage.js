import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MovieCard from '../components/MovieCard';

const FavoritesPage = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') ?? '[]')
    setMovies(favorites)
  }, [])

  return (
    <Container>
      <Row className="my-4">
        {movies.map(movie => (
          <Col key={movie.imdbID} className="mt-1" xs={12} md={3}>
            <MovieCard
              movie={movie}
              showFavoriteBtn={false}
            />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default FavoritesPage