import React, { useState } from "react";
import { Container } from "@material-ui/core";
import Filters from "./components/Filters";
import JobList from "./components/JobList";
import "./index.css";
const App = () => {
  const [filters, setFilters] = useState({
    minExperience: "",
    companyName: "",
    location: "",
    techStack: "",
    role: "",
    minBasePay: "",
    remoteOnSite: "",
  });

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <Container>
      <Filters onApplyFilters={handleApplyFilters} />
      <JobList filters={filters} />
    </Container>
  );
};

export default App;
