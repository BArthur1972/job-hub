import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useGetJobListingsByRecruiterIdMutation } from '../services/appApi';

function RecruiterAnalytics() {
    const user = useSelector((state) => state.user);
    const [getJobListingsByRecruiterId, { data, error, isLoading }] = useGetJobListingsByRecruiterIdMutation();

    return (
        <Container>
            <h1>Recruiter Analytics</h1>
            <BarChart
                width={800}
                height={400}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="jobTitle" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="numApplicants" fill="#8884d8" />
            </BarChart>
        </Container>
    );
}

export default RecruiterAnalytics;