import { Box, Button, TextField, Typography } from "@mui/material";
import account from '../../assets/Account.png';
import COLORS from "../../utils/Colors";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const EditUser = () => {
    const [name, setName] = useState("");
    const [badgeNumber, setBadgeNumber] = useState("");
    const [station, setStation] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [password, setPassword] = useState("");
    const { id } = useParams();

useEffect(() => {
    const fetchUserDetails = async () => {
        try {
        const response = await axios.get(`http://localhost:5000/policeOfficers/${id}`);
        const userData = response.data;
        setName(userData.name);
        setBadgeNumber(userData.badgeNumber);
        setStation(userData.station);
        setContactInfo(userData.contactInfo);
        setPassword(""); 
        } catch (err) {
        console.error("Error fetching user details:", err);
    }
    };

    fetchUserDetails();
}, [id]);

const handleSubmit = async () => {
    try {
        const response = await axios.put(`http://localhost:5000/policeOfficers/edit/${id}`, {
        name,
        badgeNumber,
        station,
        contactInfo,
        password,
    });
    console.log("Edit response:", response);
    alert("User details updated successfully!");
    window.location.reload();
    } catch (err) {
        console.error("Error updating user details:", err);
        alert("Failed to update user details. Please try again.");
    }
};

return (
    <Box
    sx={{
        width: '100%',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }}
    >
        <Box sx={{ width: '100%', mb: 5 }}>
            <Typography
            sx={{
                color: COLORS.black,
                fontSize: { xs: 'auto', md: '20px' },
                textAlign: 'left',
            }}
        >
            Edit Admin Details
            </Typography>
        </Box>
        <Box>
            <img src={account} alt="Account" />
        </Box>
        <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            width: { xs: '100%', md: '70%' },
            mt: 5,
            gap: 2,
        }}
        >
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="badge-number"
          label="Badge Number"
          variant="outlined"
          value={badgeNumber}
          onChange={(e) => setBadgeNumber(e.target.value)}
        />
        <TextField
          id="station"
          label="Station"
          variant="outlined"
          value={station}
          onChange={(e) => setStation(e.target.value)}
        />
        <TextField
          id="contact-info"
          label="Contact Info"
          variant="outlined"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            width: '100%',
            mt: 2,
          }}
        >
          <Button
            onClick={handleSubmit}
            sx={{
              bgcolor: COLORS.lightBlue2,
              color: COLORS.white,
              borderRadius: '20px',
              px: 2,
              fontWeight: 500,
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditUser;
