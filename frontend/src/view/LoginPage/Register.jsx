import React, { useState } from "react";
import {
    Box,
    Button,
    Stack,
    TextField,
    Typography,
    FormControlLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import axios from "axios";
import img1 from "../../assets/login/img2.jpg";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate();
    // const [userType, setUserType] = useState("admin");
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post("http://localhost:5000/users/auth/register", {
                name: formData.username,
                email: formData.email,
                password: formData.password,
                
            });
            if (response.data.success) {
                navigate("/");
            }
        } catch (error) {
            setError(error.response?.data?.message || "Registration failed");
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
                    <Box
                        sx={{
                            flex: 1,
                            p: 4,
                        }}
                    >
                        <RadioGroup
                            row
                            defaultValue="admin"
                            // onChange={(e) => setUserType(e.target.value)}
                            sx={{ justifyContent: "center", mb: 3 }}
                        >
                            <FormControlLabel
                                value="admin"
                                control={<Radio sx={{ color: "#fff" }} />}
                                label={<Typography color="white">Admin</Typography>}
                            />
                            <FormControlLabel
                                value="superadmin"
                                control={<Radio sx={{ color: "#fff" }} />}
                                label={<Typography color="white">Super Admin</Typography>}
                            />
                        </RadioGroup>
                        <TextField
                            variant="outlined"
                            placeholder="User Name"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            fullWidth
                            InputProps={{
                                style: {
                                    color: "#fff",
                                    backgroundColor: "#444",
                                },
                            }}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            variant="outlined"
                            placeholder="User Mail"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            InputProps={{
                                style: {
                                    color: "#fff",
                                    backgroundColor: "#444",
                                },
                            }}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            variant="outlined"
                            placeholder="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            InputProps={{
                                style: {
                                    color: "#fff",
                                    backgroundColor: "#444",
                                },
                            }}
                            sx={{ mb: 3 }}
                        />
                        {error && (
                            <Typography color="error" sx={{ mb: 2 }}>
                                {error}
                            </Typography>
                        )}
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
                            onClick={handleRegister}
                        >
                            REGISTER
                        </Button>
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

export default RegisterPage;
