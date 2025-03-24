import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../Config';
import { Box, Button, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';
import AddFineModel from '../../components/ModelComponent/AddFineModel';

const PoliceOfficerDash = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);  

  const userType = localStorage.getItem('isAdmin');

  const userId = localStorage.getItem('userId');
  const fetchData = async () => {
    
    console.log(userId);
    try {
      const response = await axios.get(API_BASE_URL + '/policeIssueFine/policeOfficer-get-by-policeId/' + userId);
      console.log('data list', response);

      if (Array.isArray(response.data.data)) {
        setData(response.data.data);
      } else {
        console.error('Expected an array, but got:', response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleAddFines = () => {
    setIsOpen(true);
  };

  const handleRowColor = (isPaid) => {
    if(isPaid){
        return 'green';
    }
    if(!isPaid){
        return 'red';
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
        {userType === 'PoliceOfficer' &&       <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'end' }}>
        <Button onClick={handleAddFines}>Add Fines</Button>
      </Box>}

      
      <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="police issue fines table">
          <TableHead>
            <TableRow>
              <TableCell>NIC</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((row) => (
                <TableRow key={row._id} sx={{bgcolor:handleRowColor(row.isPaid)}}>
                  <TableCell>{row.civilNIC}</TableCell>
                  <TableCell>{row.civilUserName}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.issueLocation}</TableCell>
                  <TableCell>{row.time}</TableCell>
                  <TableCell>{row.type}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <AddFineModel open={isOpen} handleClose={handleClose} officerId={userId} />
    </Box>
  );
};

export default PoliceOfficerDash;
