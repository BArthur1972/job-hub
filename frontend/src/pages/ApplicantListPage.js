import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Container, Row, Col, Form } from 'react-bootstrap';
import ApplicantCard from '../components/ApplicantCard';
import { useSelector } from 'react-redux';
import { useGetApplicantsByRecruiterIdMutation } from '../services/appApi';

function ApplicantListPage() {
	const { user } = useSelector((state) => state.user);
	const [applicants, setApplicants] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [filterStatus, setFilterStatus] = useState('');
	const [getApplicantsByRecruiterId] = useGetApplicantsByRecruiterIdMutation();

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleFilterChange = (event) => {
		setFilterStatus(event.target.value);
	};

	const filteredApplicants = applicants.filter((applicant) => {
		const matchSearchTerm =
			applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			applicant.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
		const matchStatus = filterStatus ? applicant.status === filterStatus : true;
		return matchSearchTerm && matchStatus;
	});

	// Fetch applicants when the component mounts
	useEffect(() => {
		getApplicantsByRecruiterId(user.recruiterID)
			.then((response) => {
				setApplicants(response.data);
			});
	}, [getApplicantsByRecruiterId, user.recruiterID]);

	return (
		<Container fluid className="h-100 p-0 d-flex justify-content-center align-items-center">
			<Col md={9} lg={10} className="p-4 overflow-auto">
				<h3 className="text-4xl text-black font-bold mb-2">Applicants</h3>
				<h5 className="text-black font-semibold mb-4">
					{filteredApplicants.length} Total Applicants
				</h5>
				<Form className="mb-4 d-flex justify-content-between">
					<Form.Group className="flex-grow-1 me-4">
						<Form.Control
							type="text"
							placeholder="Search by name or job title..."
							value={searchTerm}
							onChange={handleSearchChange}
						/>
					</Form.Group>
					<Form.Group className="w-auto">
						<Form.Select value={filterStatus} onChange={handleFilterChange}>
							<option value="">All Statuses</option>
							<option value="Applied">Applied</option>
							<option value="Interviewing">Interviewing</option>
							<option value="Hired">Hired</option>
							<option value="Rejected">Rejected</option>
						</Form.Select>
					</Form.Group>
				</Form>
				{filteredApplicants.length > 0 ? (
					filteredApplicants.map((applicant, index) => {
						return (
							<ApplicantCard
								key={index}
								{...applicant}
								onUpdateStatus={(seekerID, newStatus) => {
									const updatedApplicants = applicants.map((app) => {
										if (app.seekerID === applicant.seekerID && app.jobID === applicant.jobID) {
											return { ...app, status: newStatus };
										}
										return app;
									});
									setApplicants(updatedApplicants);
								}}
							/>
						);
					})
				) : (
					<div className="d-flex flex-column align-items-center justify-content-center text-center p-4">
						<FaSearch size={32} className="mb-3" />
						<p>No applicants found matching your search criteria.</p>
					</div>
				)}
			</Col>
		</Container>
	);
};

export default ApplicantListPage;