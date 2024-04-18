import React from "react";
import styles from "./styles/applicantCard.module.css";
import { useState, useEffect } from "react";
import {
  useGetJobSeekerByIdMutation,
  useGetAllJobSeekerEducationMutation,
  useGetAllJobSeekerExperienceMutation,
  useGetAllJobSeekerSkillsMutation,
} from "../services/appApi";
import "./styles/ProfileModal.css";
import { Button, Modal, Image } from "react-bootstrap";
import { Col, Row, Card, Badge } from "react-bootstrap";
import defaultProfilePicture from "../assets/defaultProfilePic.jpg";

import {
  FaLocationArrow,
  FaPhone,
  FaEnvelope,
  FaInfoCircle,
} from "react-icons/fa";

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
    };

    const fetchEducation = async () => {
      await getJobSeekerEducation(props.seekerID).then((response) => {
        setEducationList(response.data);
      });
    };

    const fetchExperience = async () => {
      await getJobSeekerExperience(props.seekerID).then((response) => {
        setExperienceList(response.data);
        console.log(experienceList);
      });
    };

    const fetchSkills = async () => {
      await getJobSeekerSkills(props.seekerID).then((response) => {
        setSkillsList(response.data);
      });
    };

    fetchJobSeeker();
    fetchEducation();
    fetchExperience();
    fetchSkills();
  }, [
    getJobSeekerById,
    getJobSeekerEducation,
    getJobSeekerExperience,
    getJobSeekerSkills,
    props.seekerID,
  ]);

  const formatDateAsMonthDayYear = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

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
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="justify-content-center">
            <Col className="p-2">
              <Card className="bg-light border-0 shadow p-3">
                <Row className="align-items-center">
                  <Col md={4}>
                    <Image
                      src={jobSeeker.profilePicture || defaultProfilePicture}
                      className="w-100 rounded-circle"
                    />
                  </Col>
                  <Col md={8} className="p-5">
                    <h4 className="mb-3">
                      {jobSeeker.firstName} {jobSeeker.lastName}
                    </h4>
                    <div className="d-flex flex-column gap-2">
                      <p className="mb-0 d-flex align-items-center gap-2">
                        <FaEnvelope className={styles.icon} />
                        {jobSeeker.email}
                      </p>
                      <p className="mb-0 d-flex align-items-center gap-2">
                        <FaPhone className={styles.icon} />
                        {jobSeeker.contactNumber}
                      </p>
                      <p className="mb-0 d-flex align-items-center gap-2">
                        <FaLocationArrow className={styles.icon} />
                        {jobSeeker.location}
                      </p>
                    </div>
                    <p className="mt-2 d-flex align-items-center gap-2">
                      Bio
                      <FaInfoCircle className={styles.icon} />
                    </p>
                    <span
                      className={`text-muted text-wrap ${styles.bioText} ${
                        jobSeeker.bio && "text-truncate"
                      }`}
                      title={jobSeeker.bio}
                    >
                      {jobSeeker.bio}
                    </span>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <Card className="bg-light border-0 shadow p-3 my-3">
            <h4 className="mb-3">Education</h4>
            <div>
              {educationList.map((edu, index) => (
                <Row key={index} className={`${styles.educationItem} mb-3`}>
                  <Col md={4}>
                    <h5 className={styles.degree}>{edu.degree}</h5>
                  </Col>
                  <Col md={8}>
                    <p className={styles.school}>{edu.school}</p>

                    <p className={styles.school}>{edu.discipline}</p>
                    <p className={styles.school}>{edu.degree}</p>
                    <p className={styles.dates}>
                      {edu.startYear} - {edu.endYear}
                    </p>
                  </Col>
                </Row>
              ))}
            </div>
          </Card>

          <Card className="bg-light border-0 shadow p-3 my-3">
            <h4 className="mb-3">Skills</h4>
            <div className="d-flex flex-wrap gap-2">
              {skillsList.map((skillObj, index) => (
                <Badge key={index} pill className={styles.chip}>
                  {skillObj.skill}
                </Badge>
              ))}
            </div>
          </Card>

          <Card className="bg-light border-0 shadow p-3">
            <h4 className="mb-3">Experience</h4>
            <div>
              {experienceList.map((exp, index) => (
                <Row key={index} className={`${styles.experienceItem} mb-3`}>
                  <Col md={8}>
                    <h5 className={styles.role}>{exp.role}</h5>
                    <p className={styles.company}>{exp.company}</p>
                  </Col>
                  <Col md={4} className="d-flex flex-column align-items-end">
                    <p className={styles.dates}>
                      {formatDateAsMonthDayYear(exp.startDate)} -{" "}
                      {formatDateAsMonthDayYear(exp.endDate)}
                    </p>
                  </Col>
                </Row>
              ))}
            </div>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProfileModal;
