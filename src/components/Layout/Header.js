import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={NavLink} to="/movies">Braintly</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={NavLink} to="/movies" className={({ isActive }) => isActive ? "active" : ""}>Películas</Nav.Link>
                    <Nav.Link as={NavLink} to="/favorites" className={({ isActive }) => isActive ? "active" : ""}>Favoritos</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header