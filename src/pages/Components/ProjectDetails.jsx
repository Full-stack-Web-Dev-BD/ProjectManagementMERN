import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MyRuns from './MyRuns';
import { BASE_URL } from '../../utils/constant';

const ProjectDetails = () => {
  const [projectDetails, setProjectDetails] = useState({});
  const [runs, setruns] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const project = await axios.get(`${BASE_URL}/api/projects/${id}`);
        setProjectDetails(project.data);
        const runs = await axios.get(`${BASE_URL}/api/runs/${id}`);
        setruns(runs.data);
        console.log(runs.data);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className=" mt-4 col-md-8 offset-md-2">
        <Link to={'/dashboard/app'}>
          <Button className="mb-4" variant="outlined">
            Go to Home
          </Button>
        </Link>
        <Card>
          <CardContent>
            <div className="p-3">
              <p style={{textTransform:'capitalize'}}>
                <b>Project Name</b> :{projectDetails.projectName}
              </p>
              <p style={{textTransform:'capitalize'}}>
                <b>State</b> :{projectDetails.state}
              </p>
              <p style={{textTransform:'capitalize'}}>
                <b>Test Suite</b> :{projectDetails.testsuite}
              </p>
              <p style={{textTransform:'capitalize'}}>
                <b>Rul Set</b> :{projectDetails.rulSet}
              </p>
              <p style={{textTransform:'capitalize'}}>
                <b>SW Requirements</b> :{projectDetails.swRequirements}
              </p>
              <p style={{textTransform:'capitalize'}}>
                <b>Code Path</b> :{projectDetails.codePath}
              </p>
              <p style={{textTransform:'capitalize'}}>
                <b>Test Cases</b> :{projectDetails.testCases}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className=" mt-4 col-md-8 offset-md-2">
        <Card> 
          <CardContent>
            <MyRuns projectID={projectDetails._id} runs={runs} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDetails;
