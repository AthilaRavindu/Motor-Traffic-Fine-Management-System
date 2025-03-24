import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../Config";
import { Box, Button, Stack, TextField, Typography, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import img1 from "../../assets/login/img2.jpg";

const LoginPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [accountType, setAccountType] = useState('user')


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRoleChange = (event) => {
        setAccountType(event.target.value); 
        console.log('Selected Role:', event.target.value); 
    };

    const handleLogin = async () => {
        try {
            if(accountType === 'user'){
                const response = await axios.post(`${API_BASE_URL}/users/auth/login`, {
                    email: formData.email,
                    password: formData.password,
                });
                console.log('login detials',response)

                if (response.data.success) {
                    alert("Login successful!");
                    const token = response.data.response.token;
                    const isAdmin = response.data.response.userType;
                    const nicNumber = response.data.response.nicNo;
                    console.log('NIC',nicNumber)
                    localStorage.setItem('token',token);
                    localStorage.setItem('isAdmin',isAdmin);
                    localStorage.setItem('nicNo',nicNumber);
                    navigate("/handlePage");
                } else {
                    alert(response.data.message || "Login failed");
                }
            }

            if(accountType === 'policeOfficer'){
                const response = await axios.post(`${API_BASE_URL}/policeOfficers/auth/login`, {
                    badgeNumber: formData.email,
                    password: formData.password,
                });
                console.log(response)

                if (response.data.success) {
                    alert("Login successful!");
                    const token = response.data.response.token;
                    const isAdmin = response.data.response.userType;
                    const userId = response.data.response.userId;
                    localStorage.setItem('token',token);
                    localStorage.setItem('isAdmin',isAdmin);
                    localStorage.setItem('userId', userId);
                    navigate("/dashbord-police-officer");
                } else {
                    alert(response.data.message || "Login failed");
                }
            }


        } catch (error) {
            alert(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                minHeight: "100vh",
                backgroundColor: "#2c2c2c",
            }}
        >
            <Typography variant="h5" sx={{ mb: 3, textAlign: "center", color: "#fff" }}>
                ECHO SECURITY
            </Typography>
            <Box
                sx={{
                    width: { xs: "90%", md: "70%" },
                    maxWidth: "1000px",
                    background: "linear-gradient(135deg, #000, #fff)",
                    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.5)",
                    borderRadius: 2,
                    overflow: "hidden",
                    color: "#fff",
                }}
            >
                <Stack direction="row" divider={<Box sx={{ width: "2px", backgroundColor: "#444" }} />}>
                    <Box sx={{ flex: 1, p: 4 }}>
                        <RadioGroup
                            row
                            defaultValue= {accountType}
                            onChange={handleRoleChange}
                            sx={{ justifyContent: "center", mb: 3 }}
                        >
                            <FormControlLabel
                                value="user"
                                control={<Radio sx={{ color: "#fff" }} />}
                                label={<Typography color="white">User</Typography>}
                            />
                            <FormControlLabel
                                value="policeOfficer"
                                control={<Radio sx={{ color: "#fff" }} />}
                                label={<Typography color="white">Police Officer</Typography>}
                            />
                        </RadioGroup>
                        <TextField
                            name="email"
                            variant="outlined"
                            placeholder="Email"
                            fullWidth
                            value={formData.email}
                            onChange={handleChange}
                            InputProps={{
                                style: { color: "#fff", backgroundColor: "#444" },
                            }}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            name="password"
                            variant="outlined"
                            placeholder="Password"
                            type="password"
                            fullWidth
                            value={formData.password}
                            onChange={handleChange}
                            InputProps={{
                                style: { color: "#fff", backgroundColor: "#444" },
                            }}
                            sx={{ mb: 3 }}
                        />
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: "#00a843",
                                "&:hover": { backgroundColor: "#007b32" },
                                color: "#fff",
                                fontWeight: "bold",
                                py: 1,
                            }}
                            onClick={handleLogin}
                        >
                            LOGIN
                        </Button>
                        <Box sx={{
                            width:"100%",
                            display:"flex",
                            flexDirection:"row",
                            justifyContent: "space-between"
                        }}>
                        <Typography
                            variant="body2"
                            sx={{
                                textAlign: "center",
                                color: "#00a843",
                                mt: 2,
                                cursor: "pointer",
                                "&:hover": { textDecoration: "underline" },
                            }}
                        >
                            Reset Password
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                textAlign: "center",
                                color: "#00a843",
                                mt: 2,
                                cursor: "pointer",
                                "&:hover": { textDecoration: "underline" },
                            }}
                            onClick ={() => navigate("/register")}
                        >
                            Register
                        </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#1e1e1e",
                            p: 4,
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                height: "100%",
                                backgroundImage: `url(${img1})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                borderRadius: "8px",
                            }}
                        />
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
};

export default LoginPage;
