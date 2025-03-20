import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import COLORS from "../../utils/Colors";
import { ColorLensSharp } from "@mui/icons-material";
import { useState } from "react";

const fineTypeData = [
  {
    fineType: "fine1",
    cost: 200,
  },
  {
    fineType: "fine2",
    cost: 1000,
  },
  {
    fineType: "fine3",
    cost: 1200,
  },
];

const FineIssureForm = () => {
  const [fineType, setFineType] = useState("");
  const [fineData, setFineData] = useState({
    drivingLicenId:'',
    name:'',
    address:'',
    date:'',
    fineType:'',
    fineCost:''
  })

  const formDataHandle = (event) => {
    const {name, value} = event.target;

    setFineData({...fineData, [name]:value})
  }


  const handleChange = (event) => {
    setFineType(event.target.value);
    setFineData((prev)=> ({
        ...prev,
        fineType:event.target.value
    }))

    
  };

  const handleFineCost = (fineType) => {
    const filteredData = fineTypeData.filter((item) => item.fineType === fineType)
    console.log('filtered fine',filteredData.cost)

    setFineData((prev) => ({
        ...prev,
        fineCost:filteredData[0].cost
    }))
  }

  const handleSubmit = () => {
    handleFineCost(fineData.fineType);
    console.log(fineData);
    
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { xs: "90%", md: "50%" },
        }}
      >
        <TextField
          id="outlined-basic"
          label="Driving licen Id"
          variant="outlined"
          name="drivingLicenId"
          value={fineData.drivingLicenId}
          onChange={formDataHandle}
          sx={{ width: "100%", mb: "20px" }}
        />
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          name="name"
          value={fineData.name}
          onChange={formDataHandle}
          sx={{ width: "100%", mb: "20px" }}
        />
        <TextField
          id="outlined-basic"
          label="Address"
          variant="outlined"
          name="address"
          value={fineData.address}
          onChange={formDataHandle}
          sx={{ width: "100%", mb: "20px" }}
        />
        <TextField
          id="outlined-basic"
          label="Date"
          variant="outlined"
          name="date"
          value={fineData.date}
          onChange={formDataHandle}
          sx={{ width: "100%", mb: "20px" }}
        />
        <FormControl fullWidth sx={{ width: "100%", mb: "20px" }}>
          <InputLabel id="demo-simple-select-label">Fine Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={fineType}
            label="Fine Type"
            onChange={handleChange}
          >
            {fineTypeData.map((data) => (
              <MenuItem value={data.fineType}>{data.fineType}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="outlined-basic"
          label="Fine Cost"
          variant="outlined"
          value={fineData.fineCost}
          sx={{ width: "100%", mb: "20px" }}
        />
        <Button
        onClick={handleSubmit}
          sx={{
            width: "100%",
            bgcolor: COLORS.buttonBlue,
            color: COLORS.white,
            ":hover": {
              bgcolor: COLORS.lightBlue,
              color: ColorLensSharp.buttonBlue,
            },
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default FineIssureForm;
