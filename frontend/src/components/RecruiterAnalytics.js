import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';
import { useSelector } from 'react-redux';
import { useGetApplicantStatusCountsMutation, useGetEmploymentTypeCountsMutation } from '../services/appApi';

function RecruiterAnalytics() {
    const { user } = useSelector((state) => state.user);
    const [getApplicantStatusCounts] = useGetApplicantStatusCountsMutation();
    const [getEmploymentTypeCounts] = useGetEmploymentTypeCountsMutation();
    const [applicantStatusCounts, setApplicantStatusCounts] = useState({ 'Applied': 0, 'Interviewing': 0, 'Hired': 0, 'Rejected': 0 });
    const [employmentTypeCounts, setEmploymentTypeCounts] = useState({ 'Full-Time': 0, 'Part-Time': 0, 'Contract': 0, 'Internship': 0 });

    useEffect(() => {
        const fetchApplicantStatusCounts = async (id) => {
            const response = await getApplicantStatusCounts(id);
            setApplicantStatusCounts(response.data);
        }

        const fetchEmploymentTypeCounts = async (id) => {
            const response = await getEmploymentTypeCounts(id);
            setEmploymentTypeCounts(response.data);
        }

        fetchApplicantStatusCounts(user.recruiterID);
        fetchEmploymentTypeCounts(user.recruiterID);
    }, [getApplicantStatusCounts, getEmploymentTypeCounts, user.recruiterID]);


    const applicantStatusData = Object.entries(applicantStatusCounts).filter(([_, value]) => value > 0).map(([name, value]) => ({
        name,
        value,
    }));

    const employentTypeData = Object.entries(employmentTypeCounts).filter(([_, value]) => value > 0).map(([name, value]) => ({
        name,
        value,
    }));

    const renderLabel = (entry) => {
        return `${entry.name} (${entry.value})`;
    };

    // Define custom colors for each slice
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const checkForData = () => {
        return !applicantStatusData.every(({ name, value }) => name[value] === 0) && !employentTypeData.every(({ name, value }) => name[value] === 0);
    }

    return (
        checkForData() && (
            <>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
                    <h3 style={{ fontSize: "1.75rem", fontWeight: "bold" }}>Your Insights</h3>
                </div>
                <div style={{ width: "100%", height: "1px", backgroundColor: "#e0e0e0", margin: "1.5rem 0" }}></div>
                <Row>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: "column", alignItems: 'start' }}>
                            <span style={{ marginRight: '1rem', fontSize: '1.2rem', fontWeight: 'bold' }}>What's the status of your current Applicants?</span>
                            <span style={{ marginRight: '1rem', fontSize: '1rem', fontWeight: 'bold' }}>(Total Nō: {applicantStatusData.reduce((acc, curr) => acc + curr.value, 0)})</span>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={applicantStatusData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    activeShape="red"
                                    label={renderLabel}
                                >
                                    {applicantStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Row>
                <div style={{ width: "100%", height: "1px", backgroundColor: "#e0e0e0", margin: "1.5rem 0" }}></div>
                <Row>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: "column", alignItems: 'start' }}>
                            <span style={{ marginRight: '1rem', fontSize: '1.2rem', fontWeight: 'bold' }}>Which employment types are people applying to?</span>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={employentTypeData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    activeShape="red"
                                    label={renderLabel}
                                >
                                    {employentTypeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Row>
            </>
        )
    );
}

export default RecruiterAnalytics;