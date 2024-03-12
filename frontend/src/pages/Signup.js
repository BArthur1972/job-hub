import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Signup.css';
import defaultProfilePic from '../assets/defaultProfilePic.jpg';

function Signup() {
    // States for storing user data
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();


    async function handleSignup(e) {
        e.preventDefault();

        // TODO: Sign up the user

        // Navigate to additional details page if user is seeking a job seeker
        if (role == "recruiter") {
            navigate("/recruiterdashboard");
        } else {
            navigate("/additional-info");
        }
    }

    return (
        <Container>
            <Row>
                <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
                    <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleSignup}>
                        <h1 className="text-center">Create An Account</h1>
                        <div className="signup-profile-pic__container">
                            <img
                                src={defaultProfilePic}
                                className="signup-profile-pic"
                                alt=""
                            />
                            <label htmlFor="image-upload" className="image-upload-label">
                                <i className="fas fa-plus-circle add-picture-icon"></i>
                            </label>
                            <input
                                type="file"
                                id="image-upload"
                                hidden
                                accept="image/png, image/jpeg"
                                onChange={null}
                            />
                        </div>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Your Name"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Your Email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicBio">
                            <Form.Label>Bio</Form.Label>
                            <Form.Control
                                as={"textarea"}
                                rows={3}
                                placeholder="Optional: Enter Your Bio"
                                onChange={(e) => setBio(e.target.value)}
                                value={bio}
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
                            Sign Up
                            {/*TODO: Add a spinner*/}
                        </Button>
                        <div className="py-4">
                            <p className="text-center">
                                Already have an account? <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </Form>
                </Col>
                <Col md={5} className="signup__bg"></Col>
            </Row>
        </Container>
    );
}

export default Signup;