import React from "react";
import { FaLocationDot, FaIdCard } from "react-icons/fa6";
import { Card, Image } from "react-bootstrap";
import { HiOutlineUsers } from "react-icons/hi2";
import styles from './styles/JobPost.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import EditJobPostingModal from "./EditJobPostingModal";
import DeleteJobPostingModal from "./DeleteJobPostingModal";

function JobPost(props) {
	const { jobID, jobTitle, companyName, location, applicants } = props.jobListing;
	const logoURL = `https://logo.clearbit.com/${companyName
		.toLowerCase()
		.replace(/\s+/g, "")}.com?size=70`;

	return (
		<Card className="mb-4">
			<Card.Body className="d-flex flex-column flex-md-row justify-content-between align-items-center">
				<div className="d-flex align-items-center">
					<Image
						src={logoURL}
						onError={(e) => (e.currentTarget.src = "path/to/default/logo.png")}
						alt={`${companyName} Logo`}
						className="me-4 rounded"
						width={48}
						height={48}
					/>
					<div>
						<Card.Title className="text-md text-gray-600 truncate">
							{jobTitle}
						</Card.Title>
						<Card.Text className="text-xm text-gray-600 d-flex align-items-center">
							<FaLocationDot className="me-2" /> {location}
						</Card.Text>
						<Card.Text className="text-xm text-gray-600 d-flex align-items-center">
							<FaIdCard className="me-2" /> JobID: {jobID}
						</Card.Text>
						<Card.Text className="text-xs text-gray-600 d-flex align-items-center">
							<HiOutlineUsers className="me-2 fw-bold" /> Applicants:{" "}
							{applicants}
						</Card.Text>
					</div>
				</div>


				<div className={styles.container}>
					<div className="m-3">
						<EditJobPostingModal jobListing={props.jobListing}/>
						<DeleteJobPostingModal jobListing={props.jobListing}/>
					</div>
				</div>



			</Card.Body>
		</Card>
	);
};

export default JobPost;
