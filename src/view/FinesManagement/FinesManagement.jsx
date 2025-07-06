import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
} from "@mui/material";
import COLORS from "../../utils/Colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GavelIcon from "@mui/icons-material/Gavel";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const FinesManagement = () => {
  const navigate = useNavigate();
  const [finesData, setFinesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFines = async () => {
    try {
      const response = await axios.get("https://tms-server-rosy.vercel.app/fine/all");
      setFinesData(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching fines:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFines();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://tms-server-rosy.vercel.app/fine/delete/${id}`);
      fetchFines(); // Refresh the list
    } catch (error) {
      console.error("Error deleting fine:", error);
    }
  };

  const getStatusColor = (status) => {
    switch ((status || "").toLowerCase()) {
      case "pending":
        return "warning";
      case "paid":
      case "completed":
        return "success";
      case "overdue":
        return "error";
      case "scheduled":
        return "primary";
      default:
        return "default";
    }
  };

  const getNatureColor = (nature) => {
    switch ((nature || "").toLowerCase()) {
      case "minor":
        return COLORS.lightBlue;
      case "moderate":
        return COLORS.orangeColor;
      case "severe":
        return COLORS.redColor;
      default:
        return COLORS.greyColor;
    }
  };

  const normalFines = finesData.filter((e) => e.type?.toLowerCase() === "normal");
  const courtFines = finesData.filter((e) => e.type?.toLowerCase() === "court");

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
        <CircularProgress sx={{ color: COLORS.white }} />
      </Box>
    );
  }

  const renderTable = (data, isCourt = false) => (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: 2,
        overflow: "hidden",
        mb: 2,
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: COLORS.bgBlue }}>
            <TableCell sx={{ color: "#fff" }}>ID</TableCell>
            {isCourt && <TableCell sx={{ color: "#fff" }}>Case Number</TableCell>}
            <TableCell sx={{ color: "#fff" }}>Offence</TableCell>
            <TableCell sx={{ color: "#fff" }}>Nature</TableCell>
            {!isCourt && <TableCell sx={{ color: "#fff" }}>Type</TableCell>}
            <TableCell sx={{ color: "#fff" }}>Fine Amount</TableCell>
            {isCourt && <TableCell sx={{ color: "#fff" }}>Court Date</TableCell>}
            <TableCell sx={{ color: "#fff" }}>Status</TableCell>
            <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(0, 5).map((fine, index) => (
            <TableRow
              key={fine._id || index}
              sx={{
                bgcolor: index % 2 === 0 ? COLORS.white : "#f8f9fa",
                "&:hover": { bgcolor: "#f5f5f5" },
              }}
            >
              <TableCell sx={{ color: COLORS.black }}>{fine._id}</TableCell>
              {isCourt && (
                <TableCell sx={{ color: COLORS.black }}>
                  {fine.caseNumber || `CT-${new Date().getFullYear()}-${String(index + 1).padStart(3, "0")}`}
                </TableCell>
              )}
              <TableCell sx={{ color: COLORS.black }}>{fine.offence}</TableCell>
              <TableCell>
                <Chip
                  label={fine.nature}
                  sx={{
                    bgcolor: getNatureColor(fine.nature),
                    color: COLORS.white,
                    fontWeight: 600,
                  }}
                />
              </TableCell>
              {!isCourt && <TableCell sx={{ color: COLORS.black }}>{fine.type}</TableCell>}
              <TableCell sx={{ color: COLORS.black }}>Rs. {fine.fine}</TableCell>
              {isCourt && (
                <TableCell sx={{ color: COLORS.black }}>
                  {fine.courtDate ? new Date(fine.courtDate).toLocaleDateString() : "-"}
                </TableCell>
              )}
              <TableCell>
                <Chip
                  label={fine.status}
                  color={getStatusColor(fine.status)}
                  sx={{ fontWeight: 600 }}
                />
              </TableCell>
              <TableCell>
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => navigate(`/editFines/${fine._id}`)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleDelete(fine._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ p: 4, bgcolor: "#0D0C2B", borderRadius: 3, color: COLORS.white }}>
      {/* Normal Fines */}
      <Box mb={5}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography sx={{ fontSize: "24px", fontWeight: 800 }}>Normal Fines</Typography>
          <Button
            sx={{
              bgcolor: COLORS.orangeColor,
              color: COLORS.white,
              fontWeight: 700,
              "&:hover": { bgcolor: COLORS.lightBlue, color: COLORS.black },
            }}
            onClick={() => navigate("/finesdetails")}
          >
            + New Fine
          </Button>
        </Box>
        {renderTable(normalFines)}
        <Button
          sx={{ color: COLORS.lightBlue, fontWeight: 600, textTransform: "none" }}
          onClick={() => navigate("/normalfines")}
        >
          View More...
        </Button>
      </Box>

      {/* Court Fines */}
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
          <GavelIcon sx={{ fontSize: 30, color: COLORS.orangeColor }} />
          <Typography sx={{ fontSize: "24px", fontWeight: 800 }}>Court Fines</Typography>
        </Box>
        {renderTable(courtFines, true)}
        <Button
          sx={{ color: COLORS.lightBlue, fontWeight: 600, textTransform: "none" }}
          onClick={() => navigate("/courtfines")}
        >
          View More...
        </Button>
      </Box>
    </Box>
  );
};

export default FinesManagement;
