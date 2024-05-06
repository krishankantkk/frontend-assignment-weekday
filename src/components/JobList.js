import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import JobCard from "../components/JobCard";
import axios from "axios";

const JobList = ({ filters }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://api.weekday.technology/adhoc/getSampleJdJSON",
          { limit: 20, offset: 0 }
        );

        let filteredJobs = response.data.jdList;
        console.log(response);
        // Apply filters
        if (filters.companyName) {
          filteredJobs = filteredJobs.filter((job) =>
            job.companyName
              .toLowerCase()
              .includes(filters.companyName.toLowerCase())
          );
        }
        if (filters.location) {
          filteredJobs = filteredJobs.filter((job) =>
            job.location.toLowerCase().includes(filters.location.toLowerCase())
          );
        }
        if (filters.minBasePay) {
          filteredJobs = filteredJobs.filter(
            (job) => job.basePay >= parseInt(filters.minBasePay)
          );
        }
        if (filters.minExperience) {
          filteredJobs = filteredJobs.filter(
            (job) => job.experience >= parseInt(filters.minExperience)
          );
        }
        if (filters.remoteOnSite === "remote") {
          filteredJobs = filteredJobs.filter(
            (job) => job.location === "remote"
          );
        }
        if (filters.remoteOnSite === "onsite") {
          filteredJobs = filteredJobs.filter(
            (job) => job.location !== "remote"
          );
        }
        if (filters.role) {
          filteredJobs = filteredJobs.filter((job) =>
            job.role.toLowerCase().includes(filters.role.toLowerCase())
          );
        }
        if (filters.techStack) {
          filteredJobs = filteredJobs.filter((job) =>
            job.techStack
              .toLowerCase()
              .includes(filters.techStack.toLowerCase())
          );
        }

        setJobs(filteredJobs);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [filters]);

  return (
    <Grid container spacing={5}>
      {jobs.map((job, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <JobCard job={job} />
        </Grid>
      ))}
    </Grid>
  );
};

export default JobList;
