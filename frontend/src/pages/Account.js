import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './styles/Account.css';
import defaultProfilePic from '../assets/defaultProfilePic.jpg';
import { useSelector } from 'react-redux';
import { useGetAllJobSeekerEducationMutation, useGetAllJobSeekerExperienceMutation, useGetAllJobSeekerSkillsMutation } from '../services/appApi';

function Account() {
    const { user, userRole } = useSelector((state) => state.user);
    const [educationList, setEducationList] = useState([]);
    const [experienceList, setExperienceList] = useState([]);
    const [skillsList, setSkillsList] = useState([]);

    const [getJobSeekerEducation] = useGetAllJobSeekerEducationMutation();
    const [getJobSeekerExperience] = useGetAllJobSeekerExperienceMutation();
    const [getJobSeekerSkills] = useGetAllJobSeekerSkillsMutation();

    // Fetch the job seeker's education when the component mounts
    useEffect(() => {
        const fetchEducation = async () => {
            await getJobSeekerEducation(user.seekerID).then((response) => {
                setEducationList(response.data);
            });
        }

        const fetchExperience = async () => {
            await getJobSeekerExperience(user.seekerID).then((response) => {
                setExperienceList(response.data);
            });
        }

        const fetchSkills = async () => {
            await getJobSeekerSkills(user.seekerID).then((response) => {
                setSkillsList(response.data);
            });
        }

        if (userRole === "jobseeker") {
            fetchEducation();
            fetchExperience();
            fetchSkills();
        }
    }, [getJobSeekerEducation, getJobSeekerExperience, getJobSeekerSkills, user.seekerID, userRole]);

    const formatDateAsMonthDayYear = (date) => {
        const formattedDate = new Date(date);
        return formattedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }

    return (
        <Container className='account_container'>
            <Row>
                <div className='account_header'>
                    <h3 className='header'>{user.firstName}'s Profile</h3>
                </div>
                <div className='divider_1'></div>
            </Row >
            <Row className='user_info'>
                <Col md={4} className='user_image_box'>
                    <img
                        alt=""
                        src={user.profilePicture || defaultProfilePic}
                        style={{ width: 240, height: 250, borderRadius: "50%", objectFit: "cover", marginTop: 30 }}
                    />
                    <div className='change-profile-picture'>
                        <p>Profile Picture</p>
                    </div>
                </Col>
                <Col md={8}>
                    <div className='user_info_box'>
                        <div className='user_name_box'>
                            <p className='user_name'>Username: {user.firstName || "N/A"} {user.lastName || "N/A"}</p>
                        </div>
                        <div className='user_email_box'>
                            <p className='user_email'>Email: {user.email || "N/A"}</p>
                        </div>
                        <div className='user_phone_box'>
                            <p className='user_phone'>Phone: {user.contactNumber || "N/A"}</p>
                        </div>
                        <div className='user_bio_box'>
                            <p className='user_bio'>Bio: {user.bio || "N/A"}</p>
                        </div>
                        <div className='user_password_box'>
                            <p className='user_password'>Password: **********</p>
                        </div>
                        <div className='delete_account'>
                        </div>
                    </div>
                </Col>
            </Row>

            <div className='divider_1'></div>

            {/* When a user is a jobseeker, display the following */}
            {userRole === "jobseeker" &&
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
                                            <li>{formatDateAsMonthDayYear(experience.startDate)} to {experience.endDate ? formatDateAsMonthDayYear(experience.endDate) : "Now"}</li>
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Col>
                </Row>
            }

        </Container>
    )
}

export default Account;