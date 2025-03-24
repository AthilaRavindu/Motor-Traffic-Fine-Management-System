import * as React from 'react';
import {
  Box, Button, TextField, Typography, Modal, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../Config';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const fineData = [
  { name: 'Speed Violation', fineId: '12' },
  { name: 'Signal Violation', fineId: '15' },
  { name: 'Parking Violation', fineId: '20' }
];

export default function AddFineModel({ open, handleClose, officerId }) {
  const [formData, setFormData] = useState({
    civilUserName: '',
    civilNIC: '',
    type: '',
    issueLocation: '',
    vehicalNumber: '',
    fineManagementId: '',
    date: new Date().toLocaleDateString('en-GB'),
    time: new Date().toLocaleTimeString('en-GB'),
  });

  const [fineDataDetails, setFineDataDetails] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFineChange = (e) => {
    const selectedFineId = e.target.value;
    setFormData({ ...formData, fineManagementId: selectedFineId });
  };

  const handleSubmit = async () => {
    const fineData = {
      ...formData,
      policeId: officerId,
    };

    try {
      const response = await axios.post(API_BASE_URL + '/policeIssueFine/add', fineData);
      console.log(response);
      alert('Fine added successfully');
      handleClose();
    } catch (error) {
      console.error('Error submitting fine:', error);
      alert('Failed to add fine');
    }
  };

  const fetchData = async() => {
    try{
      const response = await axios.get(API_BASE_URL + '/fine/all')
      console.log('fine', response);

      if(response.status === 200) {
        setFineDataDetails(response.data.data);
      }

      console.log(fineDataDetails)
    }catch(err){
      console.log(err);
    }
  }

  React.useEffect(() => {
    fetchData();
  },[])

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Fines
        </Typography>

        <TextField
          label="Civil User Name"
          name="civilUserName"
          fullWidth
          margin="normal"
          value={formData.civilUserName}
          onChange={handleChange}
        />

        <TextField
          label="Type"
          name="type"
          fullWidth
          margin="normal"
          value={formData.type}
          onChange={handleChange}
        />

        <TextField
          label="Civil NIC"
          name="civilNIC"
          fullWidth
          margin="normal"
          value={formData.civilNIC}
          onChange={handleChange}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="fine-select-label">Fine Type</InputLabel>
          <Select
            labelId="fine-select-label"
            value={formData.fineManagementId}
            onChange={handleFineChange}
          >
            {fineDataDetails.map((fine, index) => (
              <MenuItem key={index} value={fine.fine}>
                {fine.offence}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Issue Location"
          name="issueLocation"
          fullWidth
          margin="normal"
          value={formData.issueLocation}
          onChange={handleChange}
        />

        <TextField
          label="Vehicle Number"
          name="vehicalNumber"
          fullWidth
          margin="normal"
          value={formData.vehicalNumber}
          onChange={handleChange}
        />

        <TextField
          label="Date"
          name="date"
          fullWidth
          margin="normal"
          value={formData.date}
          InputProps={{ readOnly: true }}
        />

        <TextField
          label="Time"
          name="time"
          fullWidth
          margin="normal"
          value={formData.time}
          InputProps={{ readOnly: true }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
}
