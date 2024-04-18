import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import './styles/Account.css';
import defaultProfilePic from '../assets/defaultProfilePic.jpg';
import { useSelector } from 'react-redux';
import { useGetAllJobSeekerEducationMutation, useGetAllJobSeekerExperienceMutation, useGetAllJobSeekerSkillsMutation } from '../services/appApi';
import RecruiterAnalytics from '../components/RecruiterAnalytics';
import JobSeekerAnalytics from '../components/JobSeekerAnalytics';

function AccountHeader({ userName }) {
	return (
		<div className="account__header">
			<h3 className="account__header-title">{userName}'s Profile</h3>
		</div>
	);
}

function UserInfo({ user }) {
	return (
	  <div className="account__user-info">
		<div className="account__user-image">
		  <img
			alt=""
			src={user && user.profilePicture !== "" ? user.profilePicture : defaultProfilePic}
			className="account__user-image-preview"
		  />
		  <div className="account__user-image-change">
			<p>Profile Picture</p>
		  </div>
		</div>
		<div className="account__user-details">
		  {user && (
			<>
			  <div className="account__user-name">
				<p className="account__user-name-label">Username:</p>
				<p className="account__user-name-value">
				  {user.firstName || 'N/A'} {user.lastName || 'N/A'}
				</p>
			  </div>
			  <div className="account__user-email">
				<p className="account__user-email-label">Email:</p>
				<p className="account__user-email-value">{user.email || 'N/A'}</p>
			  </div>
			  <div className="account__user-phone">
				<p className="account__user-phone-label">Phone:</p>
				<p className="account__user-phone-value">{user.contactNumber || 'N/A'}</p>
			  </div>
			  <div className="account__user-bio">
				<p className="account__user-bio-label">Bio:</p>
				<p className="account__user-bio-value">{user.bio || 'N/A'}</p>
			  </div>
			</>
		  )}
		</div>
	  </div>
	);
  }

function JobSeekerInfo({ skillsList, educationList, experienceList }) {
	const formatDateAsMonthDayYear = (date) => {
		const formattedDate = new Date(date);
		return formattedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
	};

	return (
		<div className="account__jobseeker-info">
			{skillsList.length > 0 && <div className="account__skills">
				<h4 className="account__skills-title">Skills</h4>
				<ul className="account__skills-list">
					{skillsList.map((skill, index) => (
						<li key={index} className="account__skills-item">
							{skill.skill}
						</li>
					))}
				</ul>
			</div>}
			{educationList.length > 0 && <div className="account__education">
				<h4 className="account__education-title">Education</h4>
				{educationList.map((education, index) => (
					<div key={index} className="account__education-item">
						<ul className="account__education-details">
							<li className="account__education-institution">{education.institution}</li>
							<li className="account__education-degree">{education.degree}</li>
							<li className="account__education-discipline">{education.discipline}</li>
							<li className="account__education-dates">
								{education.startYear} to {education.endYear}
							</li>
						</ul>
					</div>
				))}
			</div>}
			{experienceList.length > 0 && <div className="account__experience">
				<h4 className="account__experience-title">Experience</h4>
				{experienceList.map((experience, index) => (
					<div key={index} className="account__experience-item">
						<ul className="account__experience-details">
							<li className="account__experience-role">{experience.role}</li>
							<li className="account__experience-company">{experience.company}</li>
							<li className="account__experience-dates">
								{formatDateAsMonthDayYear(experience.startDate)} to {experience.endDate !== 'Present' ? formatDateAsMonthDayYear(experience.endDate) : experience.endDate}
							</li>
						</ul>
					</div>
				))}
			</div>}
		</div>
	);
}

function Account() {
	const { user, userRole } = useSelector((state) => state.user);
	const [educationList, setEducationList] = useState([]);
	const [experienceList, setExperienceList] = useState([]);
	const [skillsList, setSkillsList] = useState([]);
	const [getJobSeekerEducation] = useGetAllJobSeekerEducationMutation();
	const [getJobSeekerExperience] = useGetAllJobSeekerExperienceMutation();
	const [getJobSeekerSkills] = useGetAllJobSeekerSkillsMutation();
  
	useEffect(() => {
	  const fetchData = async () => {
		if (userRole === 'jobseeker' && user?.seekerID) {
		  const educationResponse = await getJobSeekerEducation(user.seekerID);
		  setEducationList(educationResponse.data);
  
		  const experienceResponse = await getJobSeekerExperience(user.seekerID);
		  setExperienceList(experienceResponse.data);
  
		  const skillsResponse = await getJobSeekerSkills(user.seekerID);
		  setSkillsList(skillsResponse.data);
		}
	  };
	  fetchData();
	}, [getJobSeekerEducation, getJobSeekerExperience, getJobSeekerSkills, user?.seekerID, userRole]);
  
	return (
	  <Container className="account__container">
		<Row>
		  <AccountHeader userName={user?.firstName} />
		  <div className="account__divider" />
		</Row>
		<Row>
		  <UserInfo user={user} />
		</Row>
		{userRole === 'jobseeker' && user?.seekerID && (
		  <>
			<div className="account__divider" />
			<Row>
			  <JobSeekerInfo skillsList={skillsList} educationList={educationList} experienceList={experienceList} />
			</Row>
		  </>
		)}
		{userRole === 'jobseeker' && user?.seekerID && (
		  <>
			<div className="account__divider" />
			<Row>
			  <JobSeekerAnalytics />
			</Row>
		  </>
		)}
		{userRole === 'recruiter' && (
		  <>
			<div className="account__divider" />
			<Row>
			  <RecruiterAnalytics />
			</Row>
		  </>
		)}

	  </Container>
	);
  }
  
  export default Account;