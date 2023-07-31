import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Input } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL, LOCAL_USER } from '../../utils/constant';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UpdateProjectForm({ projectDetails }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [projectName, setprojectName] = useState(projectDetails.projectName);
  const [state, setstate] = useState(projectDetails.state);
  const [testsuite, settestsuite] = useState(projectDetails.testsuite);
  const [rulSet, setrulSet] = useState(projectDetails.rulSet);
  const [swRequirements, setswRequirements] = useState(projectDetails.swRequirements);
  const [codePath, setcodePath] = useState(projectDetails.codePath);
  const [testCases, settestCases] = useState(projectDetails.testCases);

  const createProject = (e) => {
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
      <Button variant="contained" onClick={handleOpen}>
        Update Project
      </Button>

      <Modal
        style={{ border: '0px' }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h4 className="text-center">Update Project</h4>
          <hr />
          <form className="row" onSubmit={(e) => createProject(e)}>
            <div className="col-md-6 mb-4">
              <span style={{ textTransform: 'capitalize' }}> project Name </span>
              <Input
                placeholder={projectDetails.projectName}
                value={projectName}
                title="Project Name"
                onChange={(e) => setprojectName(e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-4">
              <span style={{ textTransform: 'capitalize' }}>State</span>
              <select onChange={(e) => setstate(e.target.value)} className="form-control" name="State" id="">
                <option value="">{projectDetails.state} </option>
                <option value={'New'}>New</option>
                <option value={'Running'}>Running</option>
                <option value={'Done'}>Done</option>
              </select>
            </div>

            <div className="col-md-6 mb-4">
              <span style={{ textTransform: 'capitalize' }}> test suite </span>
              <Input
                placeholder={projectDetails.testsuite}
                value={testsuite}
                title="testsuite"
                onChange={(e) => settestsuite(e.target.value)}
              />
            </div>

            <div className="col-md-6 mb-4">
              <span>Rulset</span>
              <Input
                placeholder={projectDetails.rulSet}
                value={rulSet}
                title="rulSet"
                onChange={(e) => setrulSet(e.target.value)}
              />
            </div>

            <div className="col-md-6 mb-4">
              <span style={{ textTransform: 'capitalize' }}> SW Requirements </span>
              <Input
                placeholder={projectDetails.swRequirements}
                value={swRequirements}
                title="swRequirements"
                onChange={(e) => setswRequirements(e.target.value)}
              />
            </div>

            <div className="col-md-6 mb-4">
              <span style={{ textTransform: 'capitalize' }}>Code Path</span>
              <Input
                placeholder={projectDetails.codePath}
                value={codePath}
                title="codePath"
                onChange={(e) => setcodePath(e.target.value)}
              />
            </div>

            <div className="col-md-6 mb-4">
              <span style={{ textTransform: 'capitalize' }}> test Cases </span>
              <Input
                placeholder={projectDetails.testCases}
                value={testCases}
                title="testCases"
                onChange={(e) => settestCases(e.target.value)}
              />
            </div>
            <div className="col-md-12 mt-4">
              <Button type="submit" variant="contained">
                Update
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
