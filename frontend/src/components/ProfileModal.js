import React from 'react';
import styles from "./styles/applicantCard.module.css";
import { Button, Modal } from 'react-bootstrap';
import { Col, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useGetJobSeekerByIdMutation, useGetAllJobSeekerEducationMutation, useGetAllJobSeekerExperienceMutation, useGetAllJobSeekerSkillsMutation } from '../services/appApi';
import "./styles/ProfileModal.css";

function ProfileModal(props) {
    const [show, setShow] = React.useState(false);
    const [jobSeeker, setJobSeeker] = useState([]);
    const [educationList, setEducationList] = useState([]);
    const [experienceList, setExperienceList] = useState([]);
    const [skillsList, setSkillsList] = useState([]);

    const [getJobSeekerById] = useGetJobSeekerByIdMutation();
    const [getJobSeekerEducation] = useGetAllJobSeekerEducationMutation();
    const [getJobSeekerExperience] = useGetAllJobSeekerExperienceMutation();
    const [getJobSeekerSkills] = useGetAllJobSeekerSkillsMutation();

    // Fetch the job seeker's education when the component mounts
    useEffect(() => {
        const fetchJobSeeker = async () => {
            await getJobSeekerById(props.seekerID).then((response) => {
                setJobSeeker(response.data[0]);
            });
        }

        const fetchEducation = async () => {
            await getJobSeekerEducation(props.seekerID).then((response) => {
                setEducationList(response.data);
            });
        }

        const fetchExperience = async () => {
            await getJobSeekerExperience(props.seekerID).then((response) => {
                setExperienceList(response.data);
                console.log(experienceList)
            });
        }

        const fetchSkills = async () => {
            await getJobSeekerSkills(props.seekerID).then((response) => {
                setSkillsList(response.data);
            });
        }

        fetchJobSeeker();
        fetchEducation();
        fetchExperience();
        fetchSkills();
    }, [getJobSeekerById, getJobSeekerEducation, getJobSeekerExperience, getJobSeekerSkills, props.seekerID]);

    const formatDateAsMonthDayYear = (date) => {
        const formattedDate = new Date(date);
        return formattedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }

    // Modal functions to show and hide the Modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Button
                variant="primary"
                size="sm"
                className={`${styles.button} me-2`}
                onClick={handleShow}
            >
                View Profile
            </Button>
            {/* Modal */}
            <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Applicant Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className='jobseeker_info'>
                        <Col md={4} className='jobseeker_info_box'>
                            {/* Box displaying the job seeker's name, email, contact number, bio */}
                            <div className='personal_info_box'>
                                <h4>Personal Information</h4>
                                <ul>
                                    <li>{jobSeeker.firstName} {jobSeeker.lastName}</li>
                                    <li>{jobSeeker.email}</li>
                                    <li>{jobSeeker.contactNumber}</li>
                                    <li>{jobSeeker.bio}</li>
                                </ul>
                            </div>
                        </Col>
                    </Row>

                    <Row className='jobseeker_info'>
                        <Col md={4} className='jobseeker_info_box'>
                            {/* Box displaying the job seeker's skills */}
                            <div className='skills_box'>
                                <h4>Skills</h4>
                                <ul>
                                    {skillsList.map((skill, index) => (
                                        <li key={index}>{skill.skill}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Box displaying the job seeker's education */}
                            <div className='education_box'>
                                <h4>Education</h4>
                                {educationList.map((education, index) => (
                                    <div key={index} className='education_item'>
                                        <ul>
                                            <li>{education.institution}</li>
                                            <li>{education.degree}</li>
                                            <li>{education.discipline}</li>
                                            <li>{education.startYear} to {education.endYear}</li>
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            {/* Box displaying the job seeker's experience */}
                            <div className='experience_box'>
                                <h4>Experience</h4>
                                <div className='experience_item'>
                                    {experienceList.map((experience, index) => (
                                        <div key={index} className='experience_item'>
                                            <ul>
                                                <li>{experience.role}</li>
                                                <li>{experience.company}</li>
                                                <li>{formatDateAsMonthDayYear(experience.startDate)} to {experience.endDate !== 'Present' ? formatDateAsMonthDayYear(experience.endDate) : experience.endDate}</li>
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ProfileModal;