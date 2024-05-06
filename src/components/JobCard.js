import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  createTheme,
  ThemeProvider,
} from "@material-ui/core";

const JobCard = ({ job }) => {
  const theme = createTheme({
    typography: {
      subtitle2: {
        fontSize: 18,
        fontStyle: "italic",
      },
      body1: {
        fontWeight: 500,
      },
      button: {
        fontStyle: "italic",
        border: "1px solid black",
        backgroundColor: "#82EEFD",
        width: "100%",
      },
    },
  });
  return (
    <Card>
      <CardContent>
        <ThemeProvider theme={theme}>
          <Typography variant="h5">
            {job.jobRole.charAt(0).toUpperCase() + job.jobRole.slice(1)}
          </Typography>
          <img src={job.logoUrl} alt="logo" />
          <Typography variant="subtitle2">
            {job.companyName.charAt(0).toUpperCase() + job.companyName.slice(1)}
          </Typography>
          <Typography>
            <b>Exp </b>
            {job.minExp || 0}-{job.maxExp || 0} Year
          </Typography>
          <Typography>
            <b>Estimate Salary- </b>
            {job.minJdSalary ? job.minJdSalary : job.maxJdSalary}-
            {job.maxJdSalary ? job.maxJdSalary : job.minJdSalary}
            {job.salaryCurrencyCode}
          </Typography>
          <Typography variant="subtitle1">
            {" "}
            <b>Location- </b>
            {job.location}
          </Typography>
          <Typography>{job.jobDetailsFromCompany}</Typography>

          <Button color="primary">Easy Apply</Button>
        </ThemeProvider>
      </CardContent>
    </Card>
  );
};

export default JobCard;
