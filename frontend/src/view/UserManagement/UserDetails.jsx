import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import account from "../../assets/Account.png";
import COLORS from "../../utils/Colors";
import axios from "axios";

const UserDetails = () => {
  const [formData, setFormData] = useState({
    name: "",
    badgeNumber: "",
    station: "",
    contactInfo: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Submit data to backend
  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/policeOfficers/auth/register", formData);
      console.log("Response:", response.data);
      alert("User registered successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to register user.");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box>
        <img src={account} alt="Account" />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { xs: "100%", md: "70%" },
          mt: 5,
          gap: 2,
        }}
      >
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          id="badgeNumber"
          label="Badge Number"
          variant="outlined"
          value={formData.badgeNumber}
          onChange={handleChange}
        />
        <TextField
          id="station"
          label="Station"
          variant="outlined"
          value={formData.station}
          onChange={handleChange}
        />
        <TextField
          id="contactInfo"
          label="Contact Info"
          variant="outlined"
          value={formData.contactInfo}
          onChange={handleChange}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          value={formData.password}
          onChange={handleChange}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            width: "100%",
            mt: 2,
          }}
        >
          <Button
            onClick={handleSubmit}
            sx={{
              bgcolor: COLORS.lightBlue2,
              color: COLORS.white,
              borderRadius: "20px",
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

export default UserDetails;
