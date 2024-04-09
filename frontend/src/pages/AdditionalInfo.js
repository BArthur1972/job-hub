import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, FormGroup, FormControl, FormSelect } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/AdditionalInfo.css';
import { useNavigate } from 'react-router-dom';
import { skillList } from './data/skills';
import { disciplines } from './data/disciplines';
import { locations } from './data/locations';
import { useSelector } from 'react-redux';
import { Cloudinary } from "@cloudinary/url-gen";
import { useUpdateJobSeekerMutation, useAddJobSeekerEducationMutation, useAddJobSeekerExperienceMutation, useAddJobSeekerSkillsMutation } from '../services/appApi';

function AdditionalInfo() {
    const { user } = useSelector((state) => state.user);

    // States for storing additional information
    const [educationLevel, setEducationLevel] = useState("");
    const [educationInfoList, setEducationInfoList] = useState([{ school: '', degree: '', discipline: '', startYear: 0, endYear: 0 }]);
    const [experienceInfoList, setExperienceInfoList] = useState([{ company: '', role: '', startDate: "", endDate: "" }]);
    const [location, setLocation] = useState("");
    const [skills, setSkills] = useState([]);
    const [referrerEmail, setReferrerEmail] = useState("");
    const [resumeFile, setResumeFile] = useState(null);
    const [uploadingFile, setUploadingFile] = useState(false);
    const navigate = useNavigate();

    const [updateJobSeeker] = useUpdateJobSeekerMutation();
    const [addJobSeekerEducation] = useAddJobSeekerEducationMutation();
    const [addJobSeekerExperience] = useAddJobSeekerExperienceMutation();
    const [addJobSeekerSkills] = useAddJobSeekerSkillsMutation();

    // Function to add another education info section
    const addEducationInfo = () => {
        setEducationInfoList([...educationInfoList, { school: '', degree: '', discipline: '', startYear: 0, endYear: 0 }]);
    };

    // Function to add another experience info section
    const addExperienceInfo = () => {
        setExperienceInfoList([...experienceInfoList, { company: '', role: '', startDate: '', endDate: '' }]);
    };

    // Function to remove an education info section
    const removeEducationInfo = (index) => {
        const updatedEducationInfoList = [...educationInfoList];
        updatedEducationInfoList.splice(index, 1);
        setEducationInfoList(updatedEducationInfoList);
    };

    // Function to remove an experience info section
    const removeExperienceInfo = (index) => {
        const updatedExperienceInfoList = [...experienceInfoList];
        updatedExperienceInfoList.splice(index, 1);
        setExperienceInfoList(updatedExperienceInfoList);
    };

    // Function to handle file upload
    const handleFileUpload = (e) => {
        e.preventDefault();

        const file = e.target.files[0];
        setResumeFile(file);
    };

    async function uploadFile() {
		const data = new FormData();
		data.append("file", resumeFile);
		console.log("Selected resume: ", resumeFile);
        data.append("resource_type", "raw");
		data.append("upload_preset", "chat_app_uploaded_file");
        data.append("folder", "jobhub");

		// Upload file to cloudinary using the cloudinary API
		try {
			setUploadingFile(true);
			const cloudinary_cloud_name = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
			let res = await fetch(
				`https://api.cloudinary.com/v1_1/${cloudinary_cloud_name}/upload`,
				{
					method: "post",
					body: data,
				}
			);

			const urlData = await res.json();
			setUploadingFile(false);
            console.log(urlData);
			return urlData.url;
		} catch (e) {
			setUploadingFile(false);
			console.log(e);
		}
	}

    // Function to handle skills change
    const handleSkillChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSkills([...skills, value]);
        } else {
            setSkills(skills.filter(skill => skill !== value));
        }
    };

    const skip = () => {
        navigate("/jobseekerdashboard");
    };

    const updateJobSeekerHandler = async (fields) => {

        // Update the jobseeker with the country and state
        try {
            await updateJobSeeker(fields).then((response) => {
                if (response && response.data) {
                    console.log("Job Seeker updated successfully: ", response.data);
                } else {
                    console.log("Error updating job seeker: ", response.error);
                }
            });
        } catch (err) {
            console.log("Error updating job seeker: ", err);
        }
    };

    const updateJobSeekerEducationHandler = async (educations) => {
        // Add the education info
        educations.forEach(async (educationInfo) => {
            try {
                await addJobSeekerEducation({ seekerID: user.seekerID, educationInfo }).then((response) => {
                    if (response && response.data) {
                        console.log("Job Seeker education added successfully: ", response.data);
                    } else {
                        console.log("Error adding job seeker education: ", response.error);
                    }
                });
            } catch (err) {
                console.log("Error adding job seeker education: ", err);
            }
        });
    };

    const updateJobSeekerExperienceHandler = async (experiences) => {
        // Add the experience info
        experiences.forEach(async (experienceInfo) => {
            try {
                await addJobSeekerExperience({ seekerID: user.seekerID, experienceInfo }).then((response) => {
                    if (response && response.data) {
                        console.log("Job Seeker experience added successfully: ", response.data);
                    } else {
                        console.log("Error adding job seeker experience: ", response.error);
                    }
                });
            } catch (err) {
                console.log("Error adding job seeker experience: ", err);
            }
        });
    };

    const updateJobSeekerSkillsHandler = async (listOfSkills) => {
        // Add the skills
        listOfSkills.forEach(async (skill) => {
            try {
                await addJobSeekerSkills({ seekerID: user.seekerID, skill }).then((response) => {
                    if (response && response.data) {
                        console.log("Job Seeker skill added successfully: ", response.data);
                    } else {
                        console.log("Error adding job seeker skill: ", response.error);
                    }
                });
            } catch (err) {
                console.log("Error adding job seeker skill: ", err);
            }
        });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (location !== "" && resumeFile !== null) {
            const resumeUrl = await uploadFile();
            await updateJobSeekerHandler({ seekerID: user.seekerID, location: location, resume: resumeUrl });
        }

        if (educationInfoList[0].school !== "" && educationInfoList[0].degree !== "" && educationInfoList[0].discipline !== "" && educationInfoList[0].startYear !== 0) {
            educationInfoList.forEach((educationInfo) => {
                if (educationInfo.endYear === 0) {
                    educationInfo.endYear = "Present";
                }
            });
            await updateJobSeekerEducationHandler(educationInfoList);
        }

        if (experienceInfoList[0].company !== "" && experienceInfoList[0].role !== "" && experienceInfoList[0].startDate !== "") {
            experienceInfoList.forEach((experienceInfo) => {
                if (experienceInfo.endDate === "") {
                    experienceInfo.endDate = "Present";
                }
            });
            await updateJobSeekerExperienceHandler(experienceInfoList);
        }

        if (skills.length !== 0) {
            await updateJobSeekerSkillsHandler(skills);
        }

        navigate("/jobseekerdashboard", { replace: true });
    };

    return (
        <Container>
            <Row>
                <Col md={12}>
                    <h1 className="text-center mt-4">Let's Get Some Additional Information</h1>
                </Col>
            </Row>
            <Form onSubmit={handleSubmit} className='form-box'>

                <FormGroup style={{ margin: "30px" }}>
                    <Form.Label>What is your highest education level?<span style={{ color: "red" }}>*</span></Form.Label>
                    <FormControl
                        as="select"
                        onChange={(e) => setEducationLevel(e.target.value)}
                        value={educationLevel}
                    >
                        {/* Options for education level */}
                        <option value="">Select</option>
                        <option value="High School Diploma">High School Diploma</option>
                        <option value="Associate's Degree">Associate's Degree</option>
                        <option value="Bachelor's Degree">Bachelor's Degree</option>
                        <option value="Master's Degree">Master's Degree</option>
                        <option value="Ph.D">Doctor of Philosophy (Ph.D)</option>
                        <option value="Other">Other</option>
                    </FormControl>
                </FormGroup>

                <h5 className="text-center">Education</h5>
                {/* Education info section (Multiple) */}
                {educationInfoList.map((educationInfo, index) => (
                    <div key={index} className='education-info-section'>
                        <FormGroup>
                            <Form.Label>Degree<span style={{ color: "red" }}>*</span></Form.Label>
                            <FormControl
                                as="select"
                                onChange={(e) => {
                                    const updatedEducationInfoList = [...educationInfoList];
                                    updatedEducationInfoList[index].degree = e.target.value;
                                    setEducationInfoList(updatedEducationInfoList);
                                }}
                                value={educationInfo.degree}>

                                <option value="">Select Your Degree</option>
                                <option value="High School Diploma">High School Diploma</option>
                                <option value="Associate's Degree">Associate's Degree</option>
                                <option value="Bachelor's Degree">Bachelor's Degree</option>
                                <option value="Master's Degree">Master's Degree</option>
                                <option value="MBA">Master of Business Administration (MBA)</option>
                                <option value="Ph.D">Doctor of Philosophy (Ph.D)</option>
                                <option value="M.D.">Doctor of Medicine (M.D)</option>
                                <option value="Other">Other</option>
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Discipline<span style={{ color: "red" }}>*</span></Form.Label>
                            <FormControl
                                as="select"
                                onChange={(e) => {
                                    const updatedEducationInfoList = [...educationInfoList];
                                    updatedEducationInfoList[index].discipline = e.target.value;
                                    setEducationInfoList(updatedEducationInfoList);
                                }}
                                value={educationInfo.discipline}>

                                <option value="">Select Your Discipline</option>
                                {disciplines.map((discipline, index) => (
                                    <option key={index} value={discipline}>{discipline}</option>
                                ))}
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Institution<span style={{ color: "red" }}>*</span></Form.Label>
                            <FormControl
                                type="text"
                                placeholder="Enter your institution"
                                onChange={(e) => {
                                    const updatedEducationInfoList = [...educationInfoList];
                                    updatedEducationInfoList[index].school = e.target.value;
                                    setEducationInfoList(updatedEducationInfoList);
                                }}
                                value={educationInfo.school}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Start Year<span style={{ color: "red" }}>*</span></Form.Label>
                            <FormControl
                                type="number"
                                style={{ width: '100px' }}
                                onChange={(e) => {
                                    const updatedEducationInfoList = [...educationInfoList];
                                    updatedEducationInfoList[index].startYear = e.target.value;
                                    setEducationInfoList(updatedEducationInfoList);
                                }}
                                value={educationInfo.startYear}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>End Year</Form.Label>
                            <FormControl
                                type="number"
                                style={{ width: '100px' }}
                                onChange={(e) => {
                                    const updatedEducationInfoList = [...educationInfoList];
                                    updatedEducationInfoList[index].endYear = e.target.value;
                                    setEducationInfoList(updatedEducationInfoList);
                                }}
                                value={educationInfo.endYear}
                            />
                        </FormGroup>
                        <Button variant="danger" style={{ borderRadius: "50%", width: "40px", height: "40px" }} onClick={() => removeEducationInfo(index)}>X</Button>
                    </div>
                ))}

                <Link style={{ margin: "30px" }} variant="primary" onClick={addEducationInfo}>Add An Education</Link>

                <h5 className="text-center">Experience</h5>
                {/* Experience info section (Multiple) */}
                {experienceInfoList.map((experienceInfo, index) => (
                    <div key={index} className='education-info-section'>
                        <FormGroup>
                            <Form.Label>Role<span style={{ color: "red" }}>*</span></Form.Label>
                            <FormControl
                                type="text"
                                placeholder="Enter your role"
                                onChange={(e) => {
                                    const updatedExperienceInfoList = [...experienceInfoList];
                                    updatedExperienceInfoList[index].role = e.target.value;
                                    setExperienceInfoList(updatedExperienceInfoList);
                                }}
                                value={experienceInfo.role}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Company<span style={{ color: "red" }}>*</span></Form.Label>
                            <FormControl
                                type="text"
                                placeholder="Enter your company"
                                onChange={(e) => {
                                    const updatedExperienceInfoList = [...experienceInfoList];
                                    updatedExperienceInfoList[index].company = e.target.value;
                                    setExperienceInfoList(updatedExperienceInfoList);
                                }}
                                value={experienceInfo.company}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Start Date<span style={{ color: "red" }}>*</span></Form.Label>
                            <FormControl
                                type="date"
                                onChange={(e) => {
                                    const updatedExperienceInfoList = [...experienceInfoList];
                                    updatedExperienceInfoList[index].startDate = e.target.value;
                                    setExperienceInfoList(updatedExperienceInfoList);
                                }}
                                value={experienceInfo.startDate}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>End Date</Form.Label>
                            <FormControl
                                type="date"
                                onChange={(e) => {
                                    const updatedExperienceInfoList = [...experienceInfoList];
                                    updatedExperienceInfoList[index].endDate = e.target.value;
                                    setExperienceInfoList(updatedExperienceInfoList);
                                }}
                                value={experienceInfo.endDate}
                            />
                        </FormGroup>
                        <Button variant="danger" style={{ borderRadius: "50%", width: "40px", height: "40px" }} onClick={() => removeExperienceInfo(index)}>X</Button>
                    </div>
                ))}

                <Link style={{ margin: "30px" }} variant="primary" onClick={addExperienceInfo}>Add An Experience</Link>

                <FormGroup style={{ margin: "30px" }}>
                    <Form.Label>What is your location preference?<span style={{ color: "red" }}>*</span></Form.Label>
                    <FormSelect value={location} onChange={(e) => setLocation(e.target.value)}>
                        <option value="">Select Your Location</option>
                        {locations.map((location, index) => (
                            <option key={index} value={location}>{location}</option>
                        ))}
                    </FormSelect>
                </FormGroup>

                <FormGroup style={{ margin: "30px" }}>
                    <Form.Label>What software skills/languages do you have proficiency in?<span style={{ color: "red" }}>*</span></Form.Label>
                    <div>
                        {skillList.map((skill, index) => (
                            <Form.Check
                                key={index}
                                type="checkbox"
                                label={skill}
                                value={skill}
                                onChange={handleSkillChange}
                            />
                        ))}
                    </div>
                </FormGroup>

                <FormGroup style={{ margin: "30px" }}>
                    <Form.Label>Were you referred by someone? Please put the email address here.</Form.Label>
                    <FormControl
                        type="email"
                        placeholder="Enter referrer's email"
                        onChange={(e) => setReferrerEmail(e.target.value)}
                        value={referrerEmail}
                    />
                </FormGroup>

                <FormGroup style={{ margin: "30px" }}>
                    <Form.Label>Upload your Resume/CV<span style={{ color: "red" }}>*</span></Form.Label>
                    <FormControl
                        type="file"
                        onChange={(e) => handleFileUpload(e)}
                    />
                </FormGroup>

                <Button variant="warning" type="button" onClick={skip}>Skip</Button>
                <Button variant="primary" className="position-absolute end-50" type="submit">Finish</Button>
            </Form>
        </Container>
    );
}

export default AdditionalInfo;
