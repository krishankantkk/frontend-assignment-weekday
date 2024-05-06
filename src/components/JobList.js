import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import JobCard from "../components/JobCard";
import axios from "axios";

const JobList = ({ filters }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const fetchData = async () => {
    try {
      const response = await axios.post(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        { limit: 10, offset: 0 }
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
      if (filters.minExp) {
        filteredJobs = filteredJobs.filter(
          (job) => job.minExp <= filters.minExp
        );
      }
      if (filters.remoteOnSite === "remote") {
        filteredJobs = filteredJobs.filter((job) => job.location === "remote");
      }
      if (filters.remoteOnSite === "onsite") {
        filteredJobs = filteredJobs.filter((job) => job.location !== "remote");
      }
      if (filters.role) {
        filteredJobs = filteredJobs.filter((job) =>
          job.role.toLowerCase().includes(filters.role.toLowerCase())
        );
      }
      if (filters.techStack) {
        filteredJobs = filteredJobs.filter((job) =>
          job.techStack.toLowerCase().includes(filters.techStack.toLowerCase())
        );
      }

      setJobs(
        (prevjobs) => [...filteredJobs, ...prevjobs]
        // filteredJobs ? [...filteredJobs] : [...prevjobs, ...filteredJobs]
      );
      setLoading(false);
      if (filteredJobs.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [filters]);

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight && !loading && hasMore) {
      fetchData();
    }
  };

  if (loading) return <div>Loading...</div>;
  return (
    <Grid
      container
      spacing={5}
      onScroll={handleScroll}
      style={{ height: "600px", overflowY: "auto" }}
    >
      {jobs.map((job, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <JobCard job={job} />
        </Grid>
      ))}
    </Grid>
  );
};

export default JobList;
