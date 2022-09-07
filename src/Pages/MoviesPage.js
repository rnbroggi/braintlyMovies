import React, { useEffect, useRef, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDebounce } from 'use-debounce';
import MovieCard from '../components/MovieCard';

const MoviesPage = () => {
    const [text, setText] = useState('')
    const [value] = useDebounce(text, 700);

    const [movies, setMovies] = useState([])

    const isMounted = useRef(false)

    useEffect(() => {
        const controller = new AbortController();

        const getMovies = async () => {
            const response = await fetch(`http://www.omdbapi.com/?s=${value}&plot=full&apikey=80b6f741`, { signal: controller.signal })
            if (response.ok) {
                const data = await response.json()
                if (data?.Search?.length > 0) {
                    const favorites = JSON.parse(localStorage.getItem('favorites') ?? '[]')
                    const favoritesIds = favorites.map(f => f.imdbID)
                    const moviesData = data.Search.map(movie => { return { ...movie, isFavorite: favoritesIds.includes(movie.imdbID) } })
                    setMovies(moviesData)
                }
            }
        }

        if (isMounted.current) {
            getMovies()
        }

        isMounted.current = true

        return () => controller.abort()

    }, [value])

    const handleAddFavorite = movie => {
        const favorites = JSON.parse(localStorage.getItem('favorites') ?? '[]')
        localStorage.setItem('favorites', JSON.stringify([...favorites, movie]))
        changeFavoriteStatus(true, movie.imdbID)
    }

    const handleRemoveFavorite = movie => {
        const favorites = JSON.parse(localStorage.getItem('favorites') ?? '[]')
        localStorage.setItem('favorites', JSON.stringify([...favorites.filter(m => m.imdbID !== movie.imdbID)]))
        changeFavoriteStatus(false, movie.imdbID)
    }

    const changeFavoriteStatus = (boolean, id) => {
        const newArray = [...movies]
        const index = newArray.findIndex(i => i.imdbID === id)
        newArray[index].isFavorite = boolean
        setMovies(newArray)
    }

    return (
        <Container>
            <Row className="justify-content-md-center my-3">
                <Col xs={6}>
                    <Form.Label htmlFor="movie">Buscar película</Form.Label>
                    <Form.Control
                        type="text"
                        id="movie"
                        onChange={e => setText(e.target.value)}
                    />
                </Col>
            </Row>

            {movies && movies.length > 0 &&
                <Row className="my-4">
                    <h2 className="text-center mb-4">Resultados de la búsqueda: "{value}"</h2>
                    {movies.map(movie => (
                        <Col key={movie.imdbID} className="mt-1" xs={12} md={3}>
                            <MovieCard
                                movie={movie}
                                onAddFavorite={handleAddFavorite}
                                onRemoveFavorite={handleRemoveFavorite}
                            />
                        </Col>
                    ))}
                </Row>
            }

        </Container>
    )
}

export default MoviesPage