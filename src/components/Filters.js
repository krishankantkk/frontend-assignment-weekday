import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";

const Filters = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState({
    minExp: "",
    companyName: "",
    location: "",
    jobRole: "",
    minJdSalary: "",
    remoteOnSite: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  return (
    <div>
      <TextField
        label="Min Experience"
        name="minExp"
        value={filters.minExp}
        onChange={handleChange}
      />
      <TextField
        label="Company Name"
        name="companyName"
        value={filters.companyName}
        onChange={handleChange}
      />
      <TextField
        label="Location"
        name="location"
        value={filters.location}
        onChange={handleChange}
      />

      <TextField
        label="Role"
        name="jobRole"
        value={filters.jobRole}
        onChange={handleChange}
      />
      <TextField
        label="Min Base Pay USD"
        name="minJdSalary"
        value={filters.minJdSalary}
        onChange={handleChange}
      />
      <FormControl>
        <InputLabel>Remote/On-site</InputLabel>
        <Select
          name="remoteOnSite"
          value={filters.remoteOnSite}
          onChange={handleChange}
        >
          <MenuItem value="remote">Remote</MenuItem>
          <MenuItem value="onsite">On-site</MenuItem>
        </Select>
      </FormControl>
      <Button
        className="apply-filter"
        variant="contained"
        color="primary"
        onClick={handleApplyFilters}
      >
        Apply Filters
      </Button>
    </div>
  );
};

export default Filters;
