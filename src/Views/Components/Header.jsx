import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import logo from './LOGO2.png';

const Header = () => {
    const navigate = useNavigate();

    return (
        <Navbar expand="lg" className="shadow" style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.8)', 
            height: '100px'
        }}>
            <Navbar.Brand href="#" onClick={() => navigate("/")} style={{ marginLeft: '15px', display: 'flex', alignItems: 'center' }}>
                <img 
                    src={logo}
                    width="50"
                    height="50"
                    className="d-inline-block align-top"
                    alt="Logo de Mi Aplicación" 
                />
                <span style={{ marginLeft: '10px', color: 'green', fontWeight: 'bold' }}>IDENTIARBOL</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar>
                <Nav className="ml-auto" style={{ paddingRight: '15px', marginLeft: 'auto' }}>
                    {/* Menú Inicio */}
                    <Nav.Link onClick={() => navigate("/")} style={{ color: 'green' }}>Inicio</Nav.Link>

                    {/* Menú Acerca de */}
                    <Nav.Link onClick={() => navigate("/acerca-de")} style={{ color: 'green' }}>Acerca de</Nav.Link>

                    {/* Menú Concurso */}
                    <NavDropdown title={<span style={{ color: 'green' }}>Concurso</span>} id="concurso-dropdown">                        
                        <NavDropdown.Item onClick={() => navigate("/bases")}>Bases</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => navigate("/video-explicativo")} style={{ color: 'green' }}>Video explicativo</NavDropdown.Item>
                        <NavDropdown.Item href="https://play.google.com/store/apps/details?id=com.inventalo.identiarbolapp.identiarbol" style={{ color: 'green' }}>Google Play enlace</NavDropdown.Item>
                    </NavDropdown>

                    {/* Menú Visor */}
                    <Nav.Link onClick={() => navigate("/visor")} style={{ color: 'green' }}>Visor</Nav.Link>

                    <Nav.Link onClick={() => navigate("/login")} style={{ color: 'green' }}>Iniciar sesión</Nav.Link>

                </Nav>
            </Navbar>
        </Navbar>
    );
}

export default Header;
