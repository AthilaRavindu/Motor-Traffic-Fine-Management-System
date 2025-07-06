import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import axios from "axios";
import COLORS from "../../utils/Colors";

export const Reports = () => {
  const [issuedFines, setIssuedFines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssuedFines = async () => {
      try {
        const response = await axios.get("https://tms-server-rosy.vercel.app/policeIssueFine/all");
        const fines = response.data;

        const enrichedFines = await Promise.all(
          fines.map(async (fine) => {
            try {
              const fineDetailsRes = await axios.get(
                `https://tms-server-rosy.vercel.app/fine/${fine.fineManagementId}`
              );
              return {
                ...fine,
                fineDetails: fineDetailsRes.data.data, // Adjust if data structure is different
              };
            } catch (err) {
              console.error("Error fetching fine details:", err);
              return { ...fine, fineDetails: null };
            }
          })
        );

        setIssuedFines(enrichedFines);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching issued fines:", error);
        setLoading(false);
      }
    };

    fetchIssuedFines();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
        }}
      >
        <CircularProgress sx={{ color: COLORS.white }} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Issued Fines Report
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: COLORS.bgBlue }}>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>#</TableCell>
              <TableCell sx={{ color: "#fff" }}>Name</TableCell>
              <TableCell sx={{ color: "#fff" }}>NIC</TableCell>
              <TableCell sx={{ color: "#fff" }}>Vehicle</TableCell>
              <TableCell sx={{ color: "#fff" }}>Location</TableCell>
              <TableCell sx={{ color: "#fff" }}>Date</TableCell>
              <TableCell sx={{ color: "#fff" }}>Time</TableCell>
              <TableCell sx={{ color: "#fff" }}>Offence</TableCell>
              <TableCell sx={{ color: "#fff" }}>Nature</TableCell>
              <TableCell sx={{ color: "#fff" }}>Amount</TableCell>
              <TableCell sx={{ color: "#fff" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {issuedFines.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.civilUserName}</TableCell>
                <TableCell>{item.civilNIC}</TableCell>
                <TableCell>{item.vehicalNumber || "-"}</TableCell>
                <TableCell>{item.issueLocation}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.time || "-"}</TableCell>
                <TableCell>{item.fineDetails?.offence || "N/A"}</TableCell>
                <TableCell>{item.fineDetails?.nature || "N/A"}</TableCell>
                <TableCell>Rs. {item.fineDetails?.fine || "N/A"}</TableCell>
                <TableCell>
                  <Chip
                    label={item.isPaid ? "Paid" : "Unpaid"}
                    color={item.isPaid ? "success" : "warning"}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Reports;
