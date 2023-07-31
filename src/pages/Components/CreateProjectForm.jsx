import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Input, Select } from '@mui/material';

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

export default function ProjectCreateModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [projectName, setprojectName] = useState('');
  const [state, setstate] = useState('');
  const [testsuite, settestsuite] = useState('');
  const [rulSet, setrulSet] = useState('');
  const [swRequirements, setswRequirements] = useState('');
  const [codePath, setcodePath] = useState('');
  const [testCases, settestCases] = useState('');

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Create New Project
      </Button>

      <Modal
      style={{border:'0px'}}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h4 className="text-center">Create New Project</h4>
          <hr />
          <form className="row">
            <div className="col-md-6">
              <Input required
                placeholder="Project Name"
                title="Project Name"
                onChange={(e) => setprojectName(e.target.valueprojectName)}
              />
            </div>

            <div className="col-md-6">
                <select onChange={e=>setstate(e.target.value)} className='form-control' name="State" id="">
                    <option value="">Select State</option>
                    <option value={"New"}>New</option>
                    <option value={"Running"}>Running</option>
                    <option value={"Done"}>Done</option>
                </select>
            </div>

            <div className="col-md-6">
              <Input required
                placeholder="Test Suite"
                title="testsuite"
                onChange={(e) => settestsuite(e.target.valuetestsuite)}
              />
            </div>

            <div className="col-md-6">
              <Input required placeholder="Rul Set" title="rulSet" onChange={(e) => setrulSet(e.target.valuerulSet)} />
            </div>

            <div className="col-md-6">
              <Input required
                placeholder="SW Requirements"
                title="swRequirements"
                onChange={(e) => setswRequirements(e.target.valueswRequirements)}
              />
            </div>

            <div className="col-md-6">
              <Input required placeholder="Code Path" title="codePath" onChange={(e) => setcodePath(e.target.valuecodePath)} />
            </div>

            <div className="col-md-6">
              <Input required
                placeholder="Test Cases"
                title="testCases"
                onChange={(e) => settestCases(e.target.valuetestCases)}
              />
            </div>
            <div className="col-md-12">
                <Button type="submit" variant='contained'>Create</Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
