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
      if(id){
      const project = await axios.get(`${BASE_URL}/api/projects/${id}`);
      setProjectDetails(project.data);
      const runs= await axios.get(`${BASE_URL}/api/runs/${id}`)
      setruns(runs.data)
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className=" mt-4 col-md-8 offset-md-2">
        
      <Link to={"/dashboard/app"}> 
      <Button className='mb-4' variant="outlined" >Go to Home</Button>
       </Link>
        <Card>
          <CardContent>
            <div className="p-3">
              <h5 className="text-center"> {projectDetails.title} </h5>
              <hr />
              <p className="m-0 mb-4"> {projectDetails.data} </p>
              <p className="m-0">
                <b>Folder In :</b> {projectDetails.folderIn}
              </p>
              <p className="m-0">
                <b>Folder Out :</b> {projectDetails.folderOut}
              </p>
              <p>
                <b>Total Runs :</b> {runs.length}
              </p>
              <p className="mt-4">
                <b>Timer:</b> {projectDetails.timer}
              </p>
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
            <MyRuns runs={runs} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDetails;
