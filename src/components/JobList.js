import React, { useEffect, useState, useRef } from "react";
import { Grid } from "@material-ui/core";
import JobCard from "../components/JobCard";
import axios from "axios";

const JobList = ({ filters }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const observer = useRef();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        { limit: 10, offset }
      );
      const newJobs = response.data.jdList;
      console.log(newJobs);

      setJobs((prevJobs) => [...prevJobs, ...newJobs]);
      setLoading(false);
      if (newJobs.length === 0) {
        setHasMore(false);
      }
      setOffset(offset + 10); // Update offset for next fetch
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setOffset(0);
    fetchData();
  }, [filters]);

  useEffect(() => {
    if (!hasMore) return;
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };
    //code for infinite scroll
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        fetchData();
      }
    }, options);
    observer.current.observe(document.getElementById("job-list-bottom"));
    return () => observer.current.disconnect();
  }, [hasMore, loading]);

  return (
    <Grid container spacing={5} style={{ height: "600px", overflowY: "auto" }}>
      {jobs
        .filter((job) => {
          let include = true; //for filter purpose include this jobs
          if (filters.companyName) {
            include =
              include &&
              job.companyName
                .toLowerCase()
                .includes(filters.companyName.toLowerCase());
          }
          if (filters.location) {
            include =
              include &&
              job.location
                .toLowerCase()
                .includes(filters.location.toLowerCase());
          }
          if (filters.minJdSalary) {
            include =
              include && job.minJdSalary >= parseInt(filters.minJdSalary);
          }
          if (filters.minExp) {
            include = include && job.minExp <= filters.minExp;
          }
          if (filters.remoteOnSite === "remote") {
            include = include && job.location === "remote";
          }
          if (filters.remoteOnSite === "onsite") {
            include = include && job.location !== "remote";
          }

          if (filters.jobRole) {
            include =
              include &&
              job.jobRole.toLowerCase().includes(filters.jobRole.toLowerCase());
          }
          return include;
        })
        .map((job, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <JobCard job={job} />
          </Grid>
        ))}
      {jobs.length > 0 && (
        <div id="job-list-bottom" style={{ margin: "10px" }} />
      )}
      <div id="job-list-bottom" style={{ margin: "10px" }} />
      {loading && <div>Loading...</div>}
    </Grid>
  );
};

export default JobList;
