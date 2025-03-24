import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../Config';
import { Box, Button, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';
import AddFineModel from '../../components/ModelComponent/AddFineModel';
import { useNavigate } from 'react-router-dom';


const CivilUserDashboard = () => {
  const [data, setData] = useState([]);  
  const [seletecteId, setSelectedId] = useState('');

  const userType = localStorage.getItem('nicNo');

  const navigate = useNavigate();

  const nicNo = localStorage.getItem('nicNo');
  const fetchData = async () => {
    
    console.log(nicNo);
    try {
      const response = await axios.get(API_BASE_URL + '/policeIssueFine/fines-get-by-NIC/'+userType);
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


  const handleRowColor = (isPaid) => {
    if(isPaid){
        return 'green';
    }
    if(!isPaid){
        return 'red';
    }
  }

  const handlePay = async (id) => {
    setSelectedId(id);
    try {
        const response = await axios.get(`${API_BASE_URL}/policeIssueFine/fines-get-by-id/${id}`);
        console.log('pay', response);

        if (response.status === 200) {
            const responseOfPay = await axios.post(`${API_BASE_URL}/users/pay-fine`, {
                policeIssuedFineId: response.data.data._id,
                amount: response.data.data.fineManagementId
            });

            console.log('pay response', responseOfPay);

            if (responseOfPay.status === 200) {
                const { sessionId, url, transactionId } = responseOfPay.data;
                window.location.href = url; // Navigate to the Stripe checkout page

                // Listen for Stripe webhook callback or redirect
                window.addEventListener('load', async () => {
                    await axios.post('http://localhost:5000/users/pay-fine-status', {
                        sessionId,
                        transactionId,
                        policeIssuedFineId: response.data.data._id
                    });
                    console.log('Payment status updated successfully');
                });
            }
        }
    } catch (error) {
        console.error('Error processing payment:', error);
    }
};

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
        
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
                  <TableCell>
                <Button sx={{
                  bgcolor:'black'
                }} onClick={()=> handlePay(row._id)}>Pay</Button>
              </TableCell>
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

    </Box>
  );
};

export default CivilUserDashboard;
