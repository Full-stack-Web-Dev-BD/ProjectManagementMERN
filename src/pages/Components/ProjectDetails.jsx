import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import React from 'react';
import MyRuns from './MyRuns';

const ProjectDetails = () => {
  return (
    <div>
      <div className=" mt-4 col-md-8 offset-md-2">
        <Card>
          <CardContent>
            <div className="p-3">
              <h5 className="text-center">Project Title</h5>
              <hr />
              <p className="m-0 mb-4">Project data</p>
              <p className="m-0">Folder In</p>
              <p className="m-0">Folder Out </p>
              <p>Total Runs</p>
              <p className="mt-4">Timer</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className=" mt-4 col-md-8 offset-md-2">
        <Card>
          <CardHeader>
            <Typography variant="h4"> My Runs </Typography>
          </CardHeader>
          <CardContent>
            <MyRuns />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDetails;
