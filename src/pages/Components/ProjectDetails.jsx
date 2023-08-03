import { Button, Card, CardContent, CardHeader, Input, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import MyRuns from './MyRuns';
import { BASE_URL, LOCAL_USER } from '../../utils/constant';

const ProjectDetails = () => {
  const [projectDetails, setProjectDetails] = useState({});
  const [runs, setruns] = useState([]);

  const [projectName, setprojectName] = useState(projectDetails.projectName);
  const [state, setstate] = useState(projectDetails.state);
  const [testsuite, settestsuite] = useState(projectDetails.testsuite);
  const [rulSet, setrulSet] = useState(projectDetails.rulSet);
  const [swRequirements, setswRequirements] = useState(projectDetails.swRequirements);
  const [codePath, setcodePath] = useState(projectDetails.codePath);
  const [testCases, settestCases] = useState(projectDetails.testCases);

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

  
  const updateProject = (e) => {
    e.preventDefault();
    const data = {
      ...projectDetails,
      user: LOCAL_USER.user?._id,
    }; 
    
    if(projectName){
      data.projectName=projectName

    }
    if(state){
      data.state=state

    }
    if(testsuite){
      data.testsuite=testsuite

    }
    if(rulSet){
      data.rulSet=rulSet

    }
    if(swRequirements){
      data.swRequirements=swRequirements

    }
    if(codePath){
      data.codePath=codePath

    }
    if(testCases){
      data.testCases=testCases

    }
    axios
      .put(`${BASE_URL}/api/projects/${projectDetails._id}`, data)
      .then((response) => {
        // Handle successful API response here
        toast.success('Project was successfully created');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
    console.log(error.response)
        // Handle error cases here
      });
  };
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
              {/* <p style={{textTransform:'capitalize'}}>
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
              </p> */}

              <form className="row" onSubmit={(e) => updateProject(e)}>
                <div className="col-md-6 mb-4">
                  <span style={{ textTransform: 'capitalize' }}> project Name </span> <br />
                  <Input style={{width:'100%'}}
                    placeholder={projectDetails.projectName}
                    value={projectName}
                    title="Project Name"
                    onChange={(e) => setprojectName(e.target.value)}
                  />
                </div>
                <div className="col-md-6 mb-4">
                  <span style={{ textTransform: 'capitalize' }}>State</span> <br />
                  <select onChange={(e) => setstate(e.target.value)} className="form-control" name="State" id="">
                    <option value="">{projectDetails.state} </option>
                    <option value={'New'}>New</option>
                    <option value={'Running'}>Running</option>
                    <option value={'Done'}>Done</option>
                  </select>
                </div>

                <div className="col-md-6 mb-4">
                  <span style={{ textTransform: 'capitalize' }}> test suite </span> <br />
                  <Input style={{width:'100%'}}
                    placeholder={projectDetails.testsuite}
                    value={testsuite}
                    title="testsuite"
                    onChange={(e) => settestsuite(e.target.value)}
                  />
                </div>

                <div className="col-md-6 mb-4">
                  <span>Rulset</span> <br />
                  <Input style={{width:'100%'}}
                    placeholder={projectDetails.rulSet}
                    value={rulSet}
                    title="rulSet"
                    onChange={(e) => setrulSet(e.target.value)}
                  />
                </div>

                <div className="col-md-6 mb-4">
                  <span style={{ textTransform: 'capitalize' }}> SW Requirements </span> <br />
                  <Input style={{width:'100%'}}
                    placeholder={projectDetails.swRequirements}
                    value={swRequirements}
                    title="swRequirements"
                    onChange={(e) => setswRequirements(e.target.value)}
                  />
                </div>

                <div className="col-md-6 mb-4">
                  <span style={{ textTransform: 'capitalize' }}>Code Path</span> <br />
                  <Input style={{width:'100%'}}
                    placeholder={projectDetails.codePath}
                    value={codePath}
                    title="codePath"
                    onChange={(e) => setcodePath(e.target.value)}
                  />
                </div>

                <div className="col-md-6 mb-4">
                  <span style={{ textTransform: 'capitalize' }}> test Cases </span> <br />
                  <Input style={{width:'100%'}}
                    placeholder={projectDetails.testCases}
                    value={testCases}
                    title="testCases"
                    onChange={(e) => settestCases(e.target.value)}
                  />
                </div>
                <div className="col-md-12 mt-4 text-right">
                  <Button type="submit" variant="contained">
                    Save
                  </Button>
                </div>
              </form>
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
