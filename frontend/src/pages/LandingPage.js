import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './styles/LandingPage.css'

function LandingPage() {
    const navigate = useNavigate();

    const goToJobSeekerDashboard = () => {
        navigate('/jobseekerdashboard');
    }

    const goToRecruiterDashboard = () => {
        navigate('/recruiterdashboard');
    }

    return (
        <Row>
            < Col md={6} className="d-flex flex-direction-column align-items-center justify-content-center">
                <div className='info-box'>
                    <h1 style={{ padding: 20, fontSize: 32 }}>Empower your job search with our innovative platform.</h1>
                    <p style={{ padding: 20, fontSize: 18 }}>Discover a dynamic platform tailored to your job searching needs. Seamlessly search, filter, and apply for jobs, all within a user-friendly interface designed to match your unique profile and preferences.</p>
                    <div>
                        <Button onClick={goToJobSeekerDashboard} variant='success'>
                            Explore Job Opportunities <i className='fas fa-comments home-message-icon'>
                            </i>
                        </Button>
                        <Button onClick={goToRecruiterDashboard} variant='success'>
                            Recruit <i className='fas fa-comments home-message-icon'>
                            </i>
                        </Button>
                    </div>
                </div>
            </Col>
            <Col md={6} className="home__bg"></Col>
        </Row>
    );
}

export default LandingPage;