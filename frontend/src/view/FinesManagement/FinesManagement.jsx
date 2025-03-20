import { Box, Button, Typography } from "@mui/material";
import COLORS from "../../utils/Colors";
import FinesCard from "../../components/FinesManagementCards/FinesCard"
import { useNavigate } from "react-router-dom";

const finesData = [
  {
    offence: "Drive without Helmet",
    nature: "low",
    type: "Normal",
    fineamount: "Rs. 1000",
    category: "Normal Fines",
  },
  {
    offence: "Drive without Helmet",
    nature: "low",
    type: "Normal",
    fineamount: "Rs. 1000",
    category: "Normal Fines",
  },
  {
    offence: "Drive without Helmet",
    nature: "low",
    type: "Normal",
    fineamount: "Rs. 1000",
    category: "Court Fines",
  },
  {
    offence: "Drive without Helmet",
    nature: "low",
    type: "Normal",
    fineamount: "Rs. 1000",
    category: "Court Fines",
  },
];

const FinesManagement = () => {
  const navigate = useNavigate();

  const normalFines = finesData.filter((e) => e.category === "Normal Fines");
  const courtFines = finesData.filter((e) => e.category === "Court Fines");

  return (
    <Box sx={{ p: 4, bgcolor: "#0D0C2B", borderRadius: 3, color: COLORS.white }}>
      {/* Normal Fines Section */}
      <Box mb={5}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography sx={{ fontSize: "24px", fontWeight: 800 }}>
            Normal Fines
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
            onClick={() => navigate("/FinesDetails")}
          >
            + New Fine
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {normalFines.map((data, index) => (
            <FinesCard
              key={index}
              offence={data.offence}
              nature={data.nature}
              type={data.type}
              fineamount={data.fineamount}
            />
          ))}
        </Box>
        <Button
          sx={{
            mt: 2,
            color: COLORS.lightBlue,
            fontWeight: 600,
            textTransform: "none",
          }}
        >
          View More...
        </Button>
      </Box>

      {/* Court Fines Section */}
      <Box>
        <Typography sx={{ textAlign: "left", fontSize: "24px", fontWeight: 800, mb: 3 }}>
          Court Fines
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {courtFines.map((data, index) => (
            <FinesCard
              key={index}
              offence={data.offence}
              nature={data.nature}
              type={data.type}
              fineamount={data.fineamount}
            />
          ))}
        </Box>
        <Button
          sx={{
            mt: 2,
            color: COLORS.lightBlue,
            fontWeight: 600,
            textTransform: "none",
          }}
        >
          View More...
        </Button>
      </Box>
    </Box>
  );
};

export default FinesManagement;