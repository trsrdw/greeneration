import './header.scss';
import { Nav, Navbar, Container, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';

export default function Header() {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const { auth } = useAuth();

    const [navbar, setNavbar] = useState(false);

    const logOut = async () => {
        setAuth({});
        navigate("/");
    };

    const changeNavBackground = () => {
        if (window.scrollY >= 100) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    };

    window.addEventListener('scroll', changeNavBackground);

    return (
        <div className="nav-wrapper">
            {['sm'].map((expand) => (
                <Navbar collapseOnSelect key={expand} bg="white" expand={expand} className={navbar ? 'shadow-nav active' : 'shadow-nav'}>
                    <Container fluid>
                        <Navbar.Brand className="px-2 main-title" as={Link} to="/">Waste Management</Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Menu
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>

                                <Nav className="justify-content-end flex-grow-1 ps-3">
                                    <Nav.Link as={Link} to="/" eventKey="1">Home</Nav.Link>
                                    <Nav.Link as={Link} to="/wastelist" eventKey="2">Waste List</Nav.Link>
                                    {
                                        auth?.email
                                            ? <Nav.Link className="nav-button" as={Link} onClick={logOut} eventKey="4">Sign out</Nav.Link>
                                            : <Nav.Link className="nav-button" as={Link} to="/login" eventKey="3">Sign in</Nav.Link>
                                    }
                                </Nav>

                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </div>
    )
}