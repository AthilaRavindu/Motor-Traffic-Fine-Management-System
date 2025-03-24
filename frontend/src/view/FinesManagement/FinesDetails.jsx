import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import COLORS from "../../utils/Colors";
import { API_BASE_URL } from "../../Config"; 

const FinesDetails = () => {
    const [formData, setFormData] = useState({
        offence: "",
        nature: "",
        type: "",
        fine: "",
        fineNumber:""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/fine/add`, formData);
            console.log(response.data);
            alert('Fine details submitted successfully!');
        } catch (error) {
            console.error('Error submitting fine details:', error);
            alert('Failed to submit fine details.');
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
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: { xs: "100%", md: "70%" },
                    mt: 5,
                    gap: 2
                }}
            >
                <TextField 
                    name="offence" 
                    label="Offence" 
                    variant="outlined" 
                    value={formData.offence} 
                    onChange={handleChange} 
                />

                <TextField 
                    name="nature" 
                    label="Nature" 
                    variant="outlined" 
                    value={formData.nature} 
                    onChange={handleChange} 
                />

                <TextField 
                    name="type" 
                    label="Type" 
                    variant="outlined" 
                    value={formData.type} 
                    onChange={handleChange} 
                />

                <TextField 
                    name="fine" 
                    label="Fine Amount" 
                    variant="outlined" 
                    value={formData.fine} 
                    onChange={handleChange} 
                />

                <TextField 
                    name="fineNumber" 
                    label="FineNumber" 
                    variant="outlined" 
                    value={formData.fineNumber} 
                    onChange={handleChange} 
                />

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "end",
                        width: "100%",
                        mt: 2
                    }}
                >
                    <Button
                        sx={{
                            bgcolor: COLORS.lightBlue2,
                            color: COLORS.white,
                            borderRadius: "20px",
                            px: 2,
                            fontWeight: 500
                        }}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default FinesDetails;
