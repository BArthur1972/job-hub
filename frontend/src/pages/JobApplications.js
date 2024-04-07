import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Container, Row, Col, Form } from "react-bootstrap";
import Application from "../components/Application";
import {
	useGetAllApplicationsMutation,
	useGetCompanyByIdMutation,
	useGetApplicationsByJobSeekerIdMutation,
} from "../services/appApi";
import { useSelector } from "react-redux";


function JobApplication() {
	const { user } = useSelector((state) => state.user);
	const [applications, setApplications] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterStatus, setFilterStatus] = useState("");
	const [getAllJobApplications] = useGetAllApplicationsMutation();
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
						}))
					);
					console.log("transformedApplications", transformedApplications);
					setApplications(transformedApplications);
				}
			} catch (error) {
				console.error("Error fetching job applications:", error);
			}
		};
		fetchApplications();
	}, [getJobApplications]);



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
					{filteredApplications.length} Total Applications
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
				{filteredApplications.length > 0 ? (
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
};

export default JobApplication;
