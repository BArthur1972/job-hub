const express = require('express');
const cors = require('cors');
const jobSeekerRoutes = require('./routes/jobSeekerRoutes');
const recruiterRoutes = require('./routes/recruiterRoutes');
const companyRoutes = require('./routes/companyRoutes');
const jobSeekerEducationRoutes = require('./routes/jobSeekerEducationRoutes');
const jobSeekerExperienceRoutes = require('./routes/jobSeekerExperienceRoutes');
const jobSeekerSkillRoutes = require('./routes/jobSeekerSkillRoutes');
const jobListingRoutes = require('./routes/jobListingRoutes');
const app = express();

// Add middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add middleware to allow cross-origin requests from client side
app.use(cors());

// Add middleware to use the routes defined in the routes folder
app.use('/jobseeker', jobSeekerRoutes);
app.use('/recruiter', recruiterRoutes);
app.use('/company', companyRoutes);
app.use('/education', jobSeekerEducationRoutes);
app.use('/experience', jobSeekerExperienceRoutes);
app.use('/skills', jobSeekerSkillRoutes);
app.use('/joblisting', jobListingRoutes);

const server = require('http').createServer(app);
const PORT = 5001;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
