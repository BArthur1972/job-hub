import React, { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { Card, Badge, Button, Row, Col, Image } from "react-bootstrap";
import JobDetailsModal from "../components/JobDetailsModal";
import { useCreateApplicationMutation } from "../services/appApi";
import { useSelector } from "react-redux";
import { IoSkullOutline } from "react-icons/io5";

const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");

const Job = ({ jobID, companyName, jobTitle, experienceLevels, locations, postedDate, jobType, skills, salary, description }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpanded = () => setIsExpanded(!isExpanded);

    const { user } = useSelector((state) => state.user);
    const [createApplication] = useCreateApplicationMutation();

    const handleApply = async () => {
        const application = {
            seekerID: user.seekerID,
            jobID: jobID,
            status: "Applied",
            dateApplied: currentDate,
        };
        await createApplication(application).then((response) => {
            if (response && response.data) {
                console.log("Application submitted successfully");
                console.log(response.data);
                alert("Application submitted successfully");
            } else if (response.error) {
                console.log("Error submitting application");
                console.log(response.error);
                alert("Error submitting application: " + response.error.data.error);
            }
        });
    };

    function formatDate(date) {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(date).toLocaleDateString(undefined, options);
    }

    return (
        <Card className="job-posting-card mb-4 shadow-sm">
            <Card.Body className="p-4">
                <Row className="align-items-center">
                    <Col xs="auto">
                        <IoSkullOutline size={50} className="rounded-circle" />
                    </Col>
                    <Col>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <div>
                                <Card.Title className="mb-1 text-primary">{companyName}</Card.Title>
                                <Card.Text className="mb-1 text-dark fs-6 fw-bold">{jobTitle}</Card.Text>
                            </div>
                            <Button variant="link" onClick={toggleExpanded} aria-expanded={isExpanded} className="toggle-button">
                                <MdExpandMore className={`toggle-icon ${isExpanded ? "rotated" : ""}`} />
                            </Button>
                        </div>
                        <div className="d-flex  justify-content-between align-items-center mb-3 px-4 py-2" style={{ background: '#ccd5db' }}>
                            <Badge pill bg={jobType === "Intern" ? "primary" : "success"} className="me-2">
                                {jobType}
                            </Badge>
                            <p className="mb-0 text-muted " style={{ fontSize: "13px", color: "#6B7280" }}>Posted: {formatDate(postedDate)}</p>
                        </div>
                        {isExpanded && (
                            <div className="expanded-info">
                                <p>
                                    <strong className="text-dark">Experience Level(s):</strong>{" "}
                                    <span
                                        className="text-truncate"
                                        style={{
                                            fontSize: "13px",
                                            maxWidth: "200px",
                                            overflowWrap: "break-word",
                                            wordBreak: "break-all",
                                            color: "#6B7280",
                                            display: "inline-block",
                                            whiteSpace: "nowrap",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {experienceLevels}
                                    </span>
                                </p>
                                <p>
                                    <strong className="text-dark">Location(s):</strong>{" "}
                                    <span style={{ fontSize: "13px", color: "#6B7280" }}>{locations}</span>
                                </p>
                                <div className="action-buttons mt-3 d-flex justify-content-end">
                                    <JobDetailsModal
                                        jobID={jobID}
                                        jobTitle={jobTitle}
                                        companyName={companyName}
                                        experienceLevels={experienceLevels}
                                        locations={locations}
                                        postedDate={postedDate}
                                        jobType={jobType}
                                        skills={skills}
                                        salary={salary}
                                        description={description}
                                    />
                                    <Button variant="primary" className="me-2" onClick={handleApply}>
                                        Apply Now
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default Job;
