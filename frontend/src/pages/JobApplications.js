import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Container, Col, Form, Spinner, Alert } from "react-bootstrap";
import Application from "../components/Application";
import {
	useGetApplicationsByJobSeekerIdMutation,
	useGetCompanyByIdMutation,
} from "../services/appApi";
import { useSelector } from "react-redux";

function JobApplication() {
	const { user } = useSelector((state) => state.user);
	const [applications, setApplications] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterStatus, setFilterStatus] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const [getJobApplications] = useGetApplicationsByJobSeekerIdMutation();
	const [getCompanyById] = useGetCompanyByIdMutation();

	const fetchCompanyName = async (companyID) => {
		try {
			const response = await getCompanyById(Number(companyID));
			if (response && response.data) {
				return response.data[0].companyName;
			}
			return "Unknown Company";
		} catch (error) {
			console.error("Error fetching company name:", error);
			return "Unknown Company";
		}
	};

	useEffect(() => {
		const fetchApplications = async () => {
			setLoading(true);
			setError(null);
			try {
				const response = await getJobApplications(user.seekerID);
				if (response.data) {
					const transformedApplications = await Promise.all(
						response.data.map(async (application) => ({
							id: application.jobID,
							companyName: await fetchCompanyName(application.companyID),
							jobTitle: application.jobTitle,
							status: application.status,
							location: application.location,
							dateApplied: application.dateApplied,
						}))
					);
					console.log("transformedApplications", transformedApplications);
					setApplications(transformedApplications);
				}
			} catch (error) {
				console.error("Error fetching job applications:", error);
				setError("Error fetching job applications. Please try again later.");
			} finally {
				setLoading(false);
			}
		};
		fetchApplications();
	}, [getJobApplications, getCompanyById, user.seekerID]);

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleFilterChange = (event) => {
		setFilterStatus(event.target.value);
	};

	const filteredApplications = applications.filter((application) => {
		const matchSearchTerm =
			application.companyName
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			application.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
		const matchStatus = filterStatus
			? application.status === filterStatus
			: true;
		return matchSearchTerm && matchStatus;
	});

	return (
		<Container
			fluid
			className="h-100 p-0 d-flex justify-content-center align-items-center"
		>
			<Col md={9} lg={10} className="p-4 overflow-auto">
				<h3 className="text-4xl text-black font-bold mb-2">
					Your Submitted Applications
				</h3>
				<h5 className="text-black font-semibold mb-4">
					{applications.length} Total Applications
				</h5>
				<Form className="mb-4 d-flex justify-content-between">
					<Form.Group className="flex-grow-1 me-4">
						<Form.Control
							type="text"
							placeholder="Search by company or title..."
							value={searchTerm}
							onChange={handleSearchChange}
						/>
					</Form.Group>
					<Form.Group className="w-auto">
						<Form.Select value={filterStatus} onChange={handleFilterChange}>
							<option value="">All Statuses</option>
							<option value="Applied">Applied</option>
							<option value="Interviewing">Interviewing</option>
							<option value="Offer">Hired</option>
							<option value="Rejected">Rejected</option>
						</Form.Select>
					</Form.Group>
				</Form>
				{error && (
					<Alert variant="danger" className="mb-4">
						{error}
					</Alert>
				)}
				{loading ? (
					<div className="text-center">
						<Spinner animation="border" role="status">
							<span className="visually-hidden">Loading...</span>
						</Spinner>
					</div>
				) : filteredApplications.length > 0 ? (
					filteredApplications.map((app, index) => (
						<Application
							key={index}
							{...app}
							onUpdateStatus={(id, newStatus) => {
								const updatedApplications = applications.map((application) => {
									if (application.id === id) {
										return { ...application, status: newStatus };
									}
									return application;
								});
								setApplications(updatedApplications);
							}}
						/>
					))
				) : (
					<div className="d-flex flex-column align-items-center justify-content-center text-center p-4">
						<FaSearch size={32} className="mb-3" />
						<p>No applications found matching your search criteria.</p>
					</div>
				)}
			</Col>
		</Container>
	);
}

export default JobApplication;
