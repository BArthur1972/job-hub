import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../assets/logo192.png';

function Navigation() {
	return (
		<Navbar bg="light" expand="lg">
			<Container>
                {/*TODO: Update this. It should depend on the user's role. */}
			<LinkContainer to="/userdashboard">
                    <Navbar.Brand>
                        <img src={logo} alt="" style={{ width: 50, height: 50 }} />
                    </Navbar.Brand>
                </LinkContainer>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<LinkContainer to="/login">
							<Nav.Link>Login</Nav.Link>
						</LinkContainer>
						<NavDropdown title="Dropdown" id="basic-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">
								Separated link
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Navigation;