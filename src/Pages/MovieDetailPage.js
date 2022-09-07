import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const MovieDetailPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null)

    useEffect(() => {
        const controller = new AbortController();

        const getMovie = async () => {
            const response = await fetch(`http://www.omdbapi.com/?i=${movieId}&plot=full&apikey=80b6f741`, { signal: controller.signal })
            if (response.ok) {
                const data = await response.json()
                setMovie(data)
            }
        }

        getMovie()

        return () => controller.abort()

    }, [])

    return (
        <Container>
            <Row className="my-4">
                <Col>
                    {movie && <Card>
                        <Card.Header as="h5">{movie.Title}</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <Row>
                                    <Col xs={3}>
                                        <img src={movie.Poster} alt="" />
                                    </Col>
                                    <Col xs={9}>
                                        <p><strong>Título:</strong> {movie.Title}</p>
                                        <p><strong>Actores:</strong> {movie.Actors}</p>
                                        <p><strong>Premios:</strong> {movie.Awards}</p>
                                        <p><strong>Recaudación:</strong> {movie.BoxOffice}</p>
                                        <p><strong>País:</strong> {movie.Country}</p>
                                        <p><strong>Director:</strong> {movie.Director}</p>
                                        <p><strong>Duración:</strong> {movie.Runtime}</p>
                                        <p><strong>Sinopsis:</strong> {movie.Plot}</p>
                                    </Col>
                                </Row>
                            </Card.Text>
                        </Card.Body>
                    </Card>}
                </Col>
            </Row>
        </Container>
    )
}

export default MovieDetailPage