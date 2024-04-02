import React from 'react';
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLogoutRecruiterMutation, useLogoutJobSeekerMutation } from '../services/appApi';
import logo from '../assets/logo192.png';

function Navigation() {
	const { user, userRole } = useSelector((state) => state.user);
	const navigate = useNavigate();
	const [logoutRecruiter] = useLogoutRecruiterMutation();
	const [logoutJobSeeker] = useLogoutJobSeekerMutation();

	const handleLogout = async () => {
		if (userRole === 'recruiter') {
			await logoutRecruiter(user);
			console.log("Logged out recruiter", user);
			console.log("User role", userRole);
			navigate('/login');
		} else {
			await logoutJobSeeker(user)
			console.log("Logged out job seeker", user);
			console.log("User role", userRole);
			navigate('/login');
		}
	}

	const goToAccountSettings = () => {
		// Redirect to account settings page
		navigate('/account');
	}

	return (
		<Navbar bg="light" expand="lg">
			<Container>
				{/*TODO: Update this. It should depend on the user's role. */}
				<LinkContainer to="/">
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
							<NavDropdown.Item onClick={goToAccountSettings}>My Account</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item>
								<Button variant="danger" onClick={handleLogout}>Logout</Button>
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Navigation;