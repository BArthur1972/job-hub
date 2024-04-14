import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';
import './styles/Signup.css';
import defaultProfilePic from '../assets/defaultProfilePic.jpg';
import { useSignupRecruiterMutation, useSignupJobSeekerMutation } from '../services/appApi';

function Signup() {
    // States for storing user data
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [bio, setBio] = useState("");
    const [role, setRole] = useState("");
    const [companyName, setCompanyName] = useState("");
    const navigate = useNavigate();
    const [signupJobSeeker] = useSignupJobSeekerMutation();
    const [signupRecruiter] = useSignupRecruiterMutation();

    const [image, setImage] = useState("");
    const [uploadingImage, setUploadingImage] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    function validateImage(e) {
        const file = e.target.files[0];

        // Check if image size is greater than 10mb
        if (file.size > 10485760) {
            return alert("Max file size is 10 MB");
        } else {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }

    async function uploadImage() {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "chat_app_uploaded_file");
        data.append("folder", "jobhub/profile_pictures");

        // Upload image to cloudinary api
        try {
            setUploadingImage(true);
            const cloudinary_cloud_name = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
            let res = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudinary_cloud_name}/upload`,
                {
                    method: "post",
                    body: data,
                }
            );

            const urlData = await res.json();
            setUploadingImage(false);
            return urlData.url;
        } catch (e) {
            setUploadingImage(false);
            console.log(e);
        }
    }

    async function handleSignup(e) {
        e.preventDefault();

        let profilePicture = "";

        // Upload image to cloudinary and get the url back 
        if (image) { profilePicture = await uploadImage(); }

        if (role === "recruiter") {
            const recruiter = {
                firstName,
                lastName,
                email,
                password,
                contactNumber,
                bio,
                profilePicture,
                companyName,
            };

            await signupRecruiter(recruiter).then((response) => {
                if (response && response.data) {
                    console.log("Recruiter signed up successfully");
                    console.log(response.data);

                    navigate("/recruiterdashboard");
                } else if (response.error) {
                    console.log(response.error.data.error);
                    alert("Error signing up recruiter: " + response.error.data.error);           
                }
            }).catch((error) => {
                console.log("Error signing up recruiter")
                console.log(error);
            });

        } else { // Sign up a job seeker
            const jobSeeker = {
                firstName,
                lastName,
                email,
                password,
                contactNumber,
                bio,
                profilePicture
            };

            await signupJobSeeker(jobSeeker).then((response) => {
                if (response && response.data) {
                    console.log("Job Seeker signed up successfully");
                    console.log(response.data);

                    navigate("/additional-info");
                } else if (response.error) {
                    console.log(response.error.data.error);
                    alert("Error signing up job seeker: " + response.error.data.error);
                }
            }).catch((error) => {
                console.log("Error signing up job seeker")
                console.log(error);
            });
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
                                src={imagePreview || defaultProfilePic}
                                className="signup-profile-pic"
                                alt=""
                            />
                            <label htmlFor="image-upload" className="image-upload-label">
                                <FaPlusCircle className="add-picture-icon"></FaPlusCircle>
                            </label>
                            <input
                                type="file"
                                id="image-upload"
                                hidden
                                accept="image/png, image/jpeg"
                                onChange={validateImage}
                            />
                        </div>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Your First Name"
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Your Last Name"
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
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

                        <Form.Group className="mb-3" controlId="formBasicNumber">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Your Contact Number"
                                onChange={(e) => setContactNumber(e.target.value)}
                                value={contactNumber}
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
                            <Form.Label>Are you looking for a job or recruiting?<span style={{ color: "red" }}>*</span></Form.Label>
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

                        {role === "recruiter" ? <Form.Group className="mb-3" controlId="formBasicNumber">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Your Company Name. Ex: Google, Microsoft, etc."
                                onChange={(e) => setCompanyName(e.target.value)}
                                value={companyName}
                            />
                        </Form.Group> : <></>}

                        <Button variant="primary" type="submit">
                            Sign Up
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