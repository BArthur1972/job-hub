import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, FormGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/AdditionalInfo.css';
import { useNavigate } from 'react-router-dom';

function AdditionalInfo() {
    // States for storing additional information
    const [phone, setPhone] = useState("");
    const [educationLevel, setEducationLevel] = useState("");
    const [educationInfoList, setEducationInfoList] = useState([{ degree: '', discipline: '', school: '', startDate: '', endDate: '' }]);
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [skills, setSkills] = useState([]);
    const [referrerEmail, setReferrerEmail] = useState("");
    const [resumeFiles, setResumeFiles] = useState([]);
    const navigate = useNavigate();

    // list of disciplines
    const disciplines = [
        "Accounting",
        "Aerospace Engineering",
        "Agriculture",
        "Anthropology",
        "Architecture",
        "Art and Design",
        "Automotive Engineering",
        "Biochemistry",
        "Biology",
        "Biomedical Engineering",
        "Business Administration",
        "Chemical Engineering",
        "Chemistry",
        "Civil Engineering",
        "Computer Science",
        "Criminal Justice",
        "Dentistry",
        "Earth Sciences",
        "Economics",
        "Education",
        "Electrical Engineering",
        "Environmental Science",
        "Fashion Design",
        "Film and Media Studies",
        "Finance",
        "Food Science",
        "Geography",
        "Geology",
        "Graphic Design",
        "History",
        "Hospitality Management",
        "Industrial Engineering",
        "Information Technology",
        "Interior Design",
        "International Relations",
        "Journalism",
        "Law",
        "Linguistics",
        "Management",
        "Marketing",
        "Mathematics",
        "Mechanical Engineering",
        "Medicine",
        "Music",
        "Nursing",
        "Nutrition",
        "Pharmacy",
        "Philosophy",
        "Physics",
        "Political Science",
        "Psychology",
        "Public Health",
        "Religious Studies",
        "Sociology",
        "Software Engineering",
        "Sports Science",
        "Statistics",
        "Supply Chain Management",
        "Telecommunications",
        "Theater Arts",
        "Urban Planning",
        "Veterinary Services"
    ];

    const skillList = [
        'Python',
        'JavaScript',
        'SQL',
        'C++',
        'C',
        'Java',
        'TypeScript',
        'Bash',
        'Swift',
        'Kotlin',
        'Dart',
        'Go',
        'HTML',
        'C#',
        'Ruby',
        'PHP',
        'R',
        'Gradle',
        'Rust',
        'Matlab',
        'Perl',
        'VB.NET',
        'Scala',
        'Objective-C',
        'Pascal',
        'Lua',
    ];

    // Function to add another education info section
    const addEducationInfo = () => {
        setEducationInfoList([...educationInfoList, { degree: '', discipline: '', school: '', startDate: '', endDate: '' }]);
    };

    // Function to handle file upload
    const handleFileUpload = (e) => {
        e.preventDefault();

        const files = e.target.files;
        console.log(files);
        setResumeFiles(files);
    };

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

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Handle form submission


        // Navigate to the dashboard
        navigate("/jobseekerdashboard");
    };

    return (
        <Container>
            <Row>
                <Col md={12}>
                    <h1 className="text-center mt-4">Let's Get Some Additional Information</h1>
                </Col>
            </Row>
            <Form onSubmit={handleSubmit} className='form-box'>
                <FormGroup className="mt-4" style={{ margin: "30px" }}>
                    <Form.Label>Phone</Form.Label>
                    <FormControl
                        type="text"
                        placeholder="Enter your phone number"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                    />
                </FormGroup>

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

                {/* Education info section (Multiple) */}
                {educationInfoList.map((educationInfo, index) => (
                    <div key={index} className='education-info-section'>
                        <FormGroup>
                            <Form.Label>Degree</Form.Label>
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
                            <Form.Label>Discipline</Form.Label>
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
                            <Form.Label>School</Form.Label>
                            <FormControl
                                type="text"
                                placeholder="Enter your school"
                                onChange={(e) => {
                                    const updatedEducationInfoList = [...educationInfoList];
                                    updatedEducationInfoList[index].school = e.target.value;
                                    setEducationInfoList(updatedEducationInfoList);
                                }}
                                value={educationInfo.school}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Start Date</Form.Label>
                            <FormControl
                                type="date"
                                onChange={(e) => {
                                    const updatedEducationInfoList = [...educationInfoList];
                                    updatedEducationInfoList[index].startDate = e.target.value;
                                    setEducationInfoList(updatedEducationInfoList);
                                }}
                                value={educationInfo.startDate}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>End Date</Form.Label>
                            <FormControl
                                type="date"
                                onChange={(e) => {
                                    const updatedEducationInfoList = [...educationInfoList];
                                    updatedEducationInfoList[index].endDate = e.target.value;
                                    setEducationInfoList(updatedEducationInfoList);
                                }}
                                value={educationInfo.endDate}
                            />
                        </FormGroup>
                    </div>
                ))}

                <Link style={{ margin: "30px" }} variant="primary" onClick={addEducationInfo}>Add Another Education</Link>


                <FormGroup style={{ margin: "30px" }}>
                    <Form.Label>In which country do you currently reside?<span style={{ color: "red" }}>*</span></Form.Label>
                    <FormControl
                        type="text"
                        placeholder="Enter your country"
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                    />
                </FormGroup>

                <FormGroup style={{ margin: "30px" }}>
                    <Form.Label>In which state do you currently reside?<span style={{ color: "red" }}>*</span></Form.Label>
                    <FormControl
                        type="text"
                        placeholder="Enter your state"
                        onChange={(e) => setState(e.target.value)}
                        value={state}
                    />
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
                        multiple
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
