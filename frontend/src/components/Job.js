import React, { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { Card, Badge, Button, Row, Col, Image } from "react-bootstrap";
import { useCreateApplicationMutation } from "../services/appApi";
import { useSelector } from "react-redux";

const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");

const Job = ({ jobID, companyName, jobTitle, experienceLevels, locations, postedDate, jobType }) => {
	const generateLogoUrl = (companyName) => {
		return `https://logo.clearbit.com/${companyName.toLowerCase().replace(/\s+/g, "")}.com?size=70`;
	};

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
				alert(response.error.data.error);
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
						<Image
							src={generateLogoUrl(companyName)}
							alt={`${companyName} Logo`}
							className="company-logo rounded-circle"
							fluid
						/>
					</Col>
					<Col>
						<div className="d-flex align-items-center justify-content-between mb-3">
							<div>
								<Card.Title className="mb-1">{companyName}</Card.Title>
								<Card.Text className="h5 mb-1">{jobTitle}</Card.Text>
							</div>
							<Button variant="link" onClick={toggleExpanded} aria-expanded={isExpanded} className="toggle-button">
								<MdExpandMore className={`toggle-icon ${isExpanded ? "rotated" : ""}`} />
							</Button>
						</div>
						<div className="d-flex align-items-center mb-3">
							<Badge pill bg={jobType === "Intern" ? "primary" : "success"} className="me-2">
								{jobType}
							</Badge>
							<p className="mb-0 text-muted">Posted: {formatDate(postedDate)}</p>
						</div>
						{isExpanded && (
							<div className="expanded-info">
								<p>
									<strong>Experience Level(s):</strong> {experienceLevels}
								</p>
								<p>
									<strong>Location(s):</strong> {locations}
								</p>
								<div className="action-buttons mt-3">
									<Button variant="primary" className="me-2" onClick={handleApply}>
										Apply
									</Button>
									<Button variant="outline-secondary" onClick={() => console.log("Saved", companyName, "for later")}>
										Save for Later
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