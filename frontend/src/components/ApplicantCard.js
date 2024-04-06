import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import ProfileModal from "./ProfileModal";
import {
	FaUserCircle,
	FaFileAlt,
	FaPen,
	FaCheckCircle,
	FaTimesCircle,
} from "react-icons/fa";
import { useUpdateApplicationMutation } from "../services/appApi";
import styles from "./styles/applicantCard.module.css";

const statusColors = {
	Applied: "#8b8b8b",
	Interviewing: "#f59e0b",
	Hired: "#10b981",
	Rejected: "#ef4444",
};

const ApplicantCard = ({
	seekerID,
	jobID,
	name,
	jobTitle,
	status,
	location,
	email,
	onUpdateStatus
}) => {

	const [updateApplication] = useUpdateApplicationMutation();
	const [statusChanged, setStatusChanged] = useState(false);

	const handleUpdateApplicantStatus = () => {
		updateApplication({ seekerID, jobID, status })
			.then((response) => {
				console.log(response.data);
				alert("Job application status updated to " + status + " successfully!");
				setStatusChanged(false);
			})
			.catch((error) => {
				console.error("Error updating application: ", error);
			});
	}

	const handleStatusChange = (e) => {
		const newStatus = e.target.value;
		onUpdateStatus(seekerID, newStatus);
		setStatusChanged(true);
	};

	return (
		<Card className={`${styles.card} mb-4`}>
			<Card.Body className="d-flex justify-content-between align-items-center">
				<div className="d-flex align-items-center">
					<FaUserCircle size={48} className={`${styles.userIcon} me-4`} />
					<div>
						<Card.Title className={`${styles.name} text-truncate`}>
							{name}
						</Card.Title>
						<Card.Text className={styles.jobID}>Job ID: {jobID}</Card.Text>
						<Card.Text className={styles.jobTitle}>{jobTitle}</Card.Text>
						<Card.Text className={styles.location}>{location}</Card.Text>
						<Card.Text className={styles.email}>{email}</Card.Text>
					</div>
				</div>
				<div className="d-flex align-items-center">
					<ProfileModal seekerID={seekerID} />
					<Form.Select
						value={status}
						onChange={handleStatusChange}
						className={`${styles.statusSelect} me-2`}
					>
						<option value="Applied">Applied</option>
						<option value="Interviewing">Interviewing</option>
						<option value="Hired">Hired</option>
						<option value="Rejected">Rejected</option>
					</Form.Select>
					<span
						className={styles.statusIcon}
						style={{ color: statusColors[status] }}
					>
						{status === "Applied" && <FaFileAlt />}
						{status === "Interviewing" && <FaPen />}
						{status === "Hired" && <FaCheckCircle />}
						{status === "Rejected" && <FaTimesCircle />}
					</span>
					{statusChanged && <Button variant="primary" className="update-button" onClick={handleUpdateApplicantStatus}> Update </Button>}
				</div>
			</Card.Body>
		</Card>
	);
};

export default ApplicantCard;
