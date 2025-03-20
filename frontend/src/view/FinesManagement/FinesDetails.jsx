import { Box, Button, TextField } from "@mui/material";
import COLORS from "../../utils/Colors";

const FinesDetails = () => {
    return(
        <Box sx={{
            width:'100%',
            height:'80vh',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',

        }}>
           <Box sx={{
            display:'flex',
            flexDirection:'column',
            width:{xs:'100%',md:'70%'},
            mt:5,
            gap:2
           }}>
           <TextField finesid="outlined-basic" label="Offence" variant="outlined" />
           <TextField finesid="outlined-basic" label="Nature" variant="outlined" />
           <TextField finesid="outlined-basic" label="Type" variant="outlined" />
           <TextField finesid="outlined-basic" label="Fine Amount" variant="outlined" />
           <Box sx={{
            display:'flex',
            justifyContent:'end',
            width:'100%',
            mt:2
           }}>
            <Button sx={{
                bgcolor:COLORS.lightBlue2,
                color:COLORS.white,
                borderRadius:'20px',
                px:2,
                fontWeight:500
            }}>Submit</Button>
           </Box>
           </Box>
        </Box>
    )
}

export default FinesDetails;