import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import "./styles/Login.css";
import { useLoginJobSeekerMutation, useLoginRecruiterMutation } from '../services/appApi';
import { useSelector } from 'react-redux';

function Login() {
    // States for storing user data
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const [loginJobSeeker] = useLoginJobSeekerMutation();
    const [loginRecruiter] = useLoginRecruiterMutation();
    const navigate = useNavigate();

    const { user, userRole } = useSelector((state) => state.user);

    async function handleLogin(e) {
        e.preventDefault();

        if (role === "recruiter") {
            const recruiter = {
                email,
                password
            };

            await loginRecruiter(recruiter).then((response) => {
                if (response && response.data) {
                    console.log("Recruiter logged in successfully");
                    console.log(response.data);

                    navigate("/recruiterdashboard");
                }
            }).catch((error) => {
                console.log("Error logging in recruiter")
                console.log(error);
            });

        } else { // Log in a job seeker
            const jobSeeker = {
                email,
                password
            };
            await loginJobSeeker(jobSeeker).then((response) => {
                if (response && response.data) {
                    console.log("Job Seeker logged in successfully");
                    console.log(response.data);

                    navigate("/jobseekerdashboard");
                }
            }).catch((error) => {
                console.log("Error logging in job seeker");
                console.log(error);
                // Display error message to the user
                if (error.data === "User not found") {
                    alert("User not found. Please check your email.");
                } else if (error.data === "Incorrect password") {
                    alert("Incorrect password. Please try again.");
                } else {
                    alert("An error occurred. Please try again.");
                }
            });
        }
    }

    return (
        <Container>
            <Row>
                <Col md={5} className="login__bg"></Col>
                <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
                    <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Your Email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            />
                            <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicRole">
                            <Form.Label>Are you a recruiting or a seeking a job?<span style={{ color: "red" }}>*</span></Form.Label>
                            <Form.Control
                                as="select"
                                onChange={(e) => setRole(e.target.value)}
                                value={role}
                                required
                            >
                                <option value="">Select Role</option>
                                <option value="user">Job Seeker</option>
                                <option value="recruiter">Recruiter</option>
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                        <div className="py-4">
                            <p className="text-center">
                                Don't have an account ? <Link to="/signup">Sign Up</Link>
                            </p>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;