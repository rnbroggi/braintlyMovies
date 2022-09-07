import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie, onAddFavorite, onRemoveFavorite, showFavoriteBtn = true }) => {

    const navigate = useNavigate()

    const handleRedirect = () => {
        navigate(`/movies/${movie.imdbID}`)
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={movie.Poster} style={{ minHeight: '425px', cursor: 'pointer' }} alt="Movie Image" onClick={handleRedirect}/>
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>
                    Estrenada en el año {movie.Year}
                </Card.Text>
                {
                    showFavoriteBtn &&
                    <>
                        {movie.isFavorite ?
                            <Button variant="success" onClick={() => onRemoveFavorite(movie)}>Favorito</Button>
                            :
                            <Button variant="primary" onClick={() => onAddFavorite(movie)}>Agregar a favoritos</Button>}
                    </>
                }
            </Card.Body>
        </Card>
    )
}

export default MovieCard