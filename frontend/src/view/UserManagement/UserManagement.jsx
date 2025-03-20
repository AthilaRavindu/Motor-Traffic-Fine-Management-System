import { Box, Button, Typography } from "@mui/material";
import COLORS from "../../utils/Colors";
import profile from "../../assets/profile.png";
import UserCard from "../../components/UserManagementCards/UserCard";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const UserManagement = () => {
    const [policeOfficersData, setPoliceOfficersData] = useState([]);
    const [civilUser, setCivilUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        
        const fetchPoliceOfficers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/policeOfficers/getall");
                setPoliceOfficersData(response.data.user.newUser);
                console.log(response.data.user);
            } catch (error) {
                console.error("Error fetching police officers data:", error);
            }
        };

        fetchPoliceOfficers();
    }, []);
    
    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Typography
                    sx={{
                        fontSize: { xs: "18px", md: "20px" },
                        fontWeight: 800,
                    }}
                >
                    Police Officer
                </Typography>
                <Button
                    sx={{
                        bgcolor: COLORS.orangeColor,
                        color: COLORS.white,
                        fontWeight: 700,
                        "&:hover": {
                            bgcolor: COLORS.lightBlue,
                            color: COLORS.black,
                        },
                    }}
                    onClick={() => navigate("/userdetails")}
                >
                    + New Officer
                </Button>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    mt: 10,
                }}
            >
                {policeOfficersData.map((data, index) => (
                    <UserCard
                        key={index}
                        name={data.name}
                        station={data.station}
                        batchID={data.badgeNumber}
                        id={data._id}
                        contactInfo={data.contactInfo}
                        profileImg={data.profileImg || profile}

                    />
                ))}
            </Box>

            <Box
                sx={{
                    width: "100%",
                    mt: 5,
                    textAlign: "left",
                }}
            >
                <Typography
                    sx={{
                        fontSize: { xs: "18px", md: "20px" },
                        fontWeight: 800,
                    }}
                >
                    Civil User
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        mt: 10,
                    }}
                >
                    {civilUser.map((data, index) => (
                        <UserCard
                            key={index}
                            name={data.name}
                            email={data.email}
                            profileImg={data.profileImg || profile}
                            date={data.date}
                            state={data.state}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default UserManagement;
