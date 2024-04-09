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
			await logoutRecruiter(user).then((response) => {
				if (response && response.data && !response.error) {
					console.log("Recruiter logged out successfully");
					console.log(response.data);
					console.log("User role", userRole);
					navigate('/login');
				}
			}).catch((error) => {
				console.log("Error logging out recruiter")
				alert(error);
				return;
			});
		} else {
			await logoutJobSeeker(user).then((response) => {
				if (response && response.data && !response.error) {
					console.log("Job Seeker logged out successfully");
					console.log(response.data);
					console.log("User role", userRole);
					navigate('/login');
				}
			}).catch((error) => {
				console.log("Error logging out job seeker");
				alert(error);
				return;
			});
		}
	}

	return (
		<Navbar bg="light" expand="lg">
			<Container>
				<LinkContainer to="/">
					<Navbar.Brand>
						<img src={logo} alt="" style={{ width: 50, height: 50 }} />
					</Navbar.Brand>
				</LinkContainer>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						{!user && (
							<LinkContainer to="/login">
								<Nav.Link>Login</Nav.Link>
							</LinkContainer>
						)}
						{user && (
							<>
								{userRole === 'jobseeker' && (
									<>
										<LinkContainer to="/jobseekerdashboard">
											<Nav.Link>Dashboard</Nav.Link>
										</LinkContainer>
										<LinkContainer to="/all-jobs">
											<Nav.Link>Jobs</Nav.Link>
										</LinkContainer>
										<LinkContainer to="/job-applications">
											<Nav.Link>Applications</Nav.Link>
										</LinkContainer>
									</>	
								)}
								{userRole === 'recruiter' && (
									<>
										<LinkContainer to="/recruiterdashboard">
											<Nav.Link>Dashboard</Nav.Link>
										</LinkContainer>
									</>
								)}
								<NavDropdown title="Menu" id="basic-nav-dropdown">
									<NavDropdown.Item onClick={() => navigate('/account')}>My Account</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item>
										<Button variant="danger" onClick={handleLogout}>Logout</Button>
									</NavDropdown.Item>
								</NavDropdown>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Navigation;