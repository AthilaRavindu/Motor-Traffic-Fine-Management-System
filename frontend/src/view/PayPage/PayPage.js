import React, { useEffect, useState } from 'react';
import axios from 'axios';
// MUI Components
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
// Util imports
// import {makeStyles} from ' @mui/styles';
// Components

// Stripe
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from "react-router";
import Links from "../../utils/Links";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import { Grid, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';

import { Label } from '@mui/icons-material';
import CardInput from '../../components/CardInput';
import COLORS from '../../utils/Colors';


const payDetails = [
    {
        total: 40.00,
        courses: [
            {
                courseName: 'Track Records',
                price: 40.00,
                courseType: 'Full Course'
            },
            {
                courseName: 'Track Records',
                price: 40.00,
                courseType: 'Full Course'
            }
        ]
    }
]
function PayPage() {
    // const classes = useStyles();
    let { id } = useParams();
    // const token = JSON.parse(localStorage.getItem('token'));
    // const userId = localStorage.getItem('userID');
    const navigate = useNavigate();
    // State
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [courseDetails,setCourseDetails] = useState([]);

    const stripe = useStripe();
    const elements = useElements();

    console.log(courseDetails)
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(Links.SERVER_API + 'courses/' + id , {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`
    //                   }
    //             });
                
    //             if(response.data.code === 200){
    //                 setCourseDetails(response.data.course);
    //             }
    //         } catch (error) {
    //             setCourseDetails([]);
    //         }
    //     };
    //     fetchData();
    // }, [id]);
   
    const handleSubmitPay = async (event) => {
    //     setIsLoading(true);
    //     if (!stripe || !elements) {
    //         // Stripe.js has not yet loaded.
    //         // Make sure to disable form submission until Stripe.js has loaded.
    //         return;
    //     }

    //     const res = await axios.post(Links.SERVER_API + 'pay',{
    //         "email":email
    //     },
    // {
    //     headers: {
    //         Authorization: `Bearer ${token}`
    //       }
    // });

    // console.log('pay',res)

    //     const clientSecret = res.data['client_secret'];

    //     const result = await stripe.confirmCardPayment(clientSecret, {
    //         payment_method: {
    //             card: elements.getElement(CardElement),
    //             billing_details: {
    //                 email: email,
    //             },
    //         },
    //     });

    //     if (result.error) {
    //         setIsLoading(false);
    //         // Show error to your customer (e.g., insufficient funds)
    //         console.log(result.error.message);
    //     } else {
    //         // The payment has been processed!
    //         if (result.paymentIntent.status === 'succeeded') {

    //             try {
    //                 const response = await axios.post(
    //                     Links.SERVER_API + 'usercourse',
    //                     {
    //                         "user_id": userId,
    //                         "course_id": id,
    //                         "level": courseDetails.level
    //                     },{
    //                         headers: {
    //                             Authorization: `Bearer ${token}`
    //                           }
    //                     });
    //                     console.log('coursedata',response)
    //                 if (response.data.message === "success") {
    //                     setIsLoading(false);
    //                     console.log('You got 500$!');
    //                     navigate(`/paymentSuccess/${id}`, {replace: true});
    //                 } else {
    //                     setIsLoading(false);
    //                 }
    //             } catch (error) {
    //                 console.log(error);
    //             }
    //             setIsLoading(false);
    //             console.log('You got 500$!');
    //             navigate(`/paymentalert/page/${id}`, { replace: true });
    //         }
    //     }
    };

    return (
        <Container sx={{ justifyContent: 'center', alignItems: 'center', mt: '100px' }}>
            <Grid xs={12}>
                <Box>
                    <Typography sx={{ fontSize: { xs: '25px', md: '50px', fontWeight: 700, fontFamily: 'Inter', textAlign: 'center', color: COLORS.green1 } }}>Payments</Typography>
                </Box>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={5} sx={{ mt: '30px', mb: '50px' }}>
                    <Box sx={{ width: { xs: 'auto', md: '50%' } }}>
                        <Typography sx={{
                            fontSize: {
                                xs: '20px',
                                md: '24px',
                                textAlign: { xs: 'center', md: 'left' },
                                color: COLORS.Grey5,
                                fontWeight: 400
                            }
                        }}>To start your subscription, input your card details to make payment.
                            You will be redirected to your banks authorization page . </Typography>

                        <Card
                style={{margin: 'auto', marginTop: '20px', marginBottom: 25, maxWidth: 500}} /*className={classes.root}*/>
                <CardContent /*className={classes.content}*/>
                    <TextField
                        label='Email'
                        id='outlined-email-input'
                        helperText={`Email you'll recive updates and receipts on`}
                        margin='normal'
                        variant='outlined'
                        type='email'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                    />
                    <div style={{padding: "12px 0", border: '1px solid gray', marginBottom: "10px", borderRadius: 3}}>
                        <CardInput/>
                    </div>

                </CardContent>
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={isLoading}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>
            </Card>
                    </Box>
                    <Box sx={{ width: { xs: 'auto', md: '50%' } }}>
                        <Typography sx={{ fontSize: '24px', fontWeight: 500, color: COLORS.Grey5 }}>You're paying</Typography>
                        
                            <Box sx={{ ml: '20px' }}>
                                <Typography sx={{ fontSize: { xs: '30', md: '64px' }, fontWeight: 700, fontFamily: 'Inter', color: COLORS.black, textAlign: { xs: 'center', md: 'left' } }}>${courseDetails.price}</Typography>
                                
                                    <Box sx={{ mt: '20px' }}>
                                        <Stack direction={'row'} spacing={'auto'} alignItems={'center'}>
                                            <Box>
                                                <Typography sx={{ fontSize: '26px', fontFamily: 'Inter', fontWeight: 700, color: COLORS.black }}>{courseDetails.title}</Typography>
                                                <Typography sx={{ fontSize: '20px', fontFamily: 'Inter', fontWeight: 500, color: COLORS.Grey5 }}>{courseDetails.level}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography sx={{ fontSize: '24px', fontFamily: 'Inter', fontWeight: 500, color: COLORS.black }}>${courseDetails.price}</Typography>
                                            </Box>
                                        </Stack>
                                    </Box>
                           

                                <Box sx={{ borderBottom: '0.5px solid #747474', mt: '30px' }}></Box>

                                <Stack direction={'row'} spacing={'auto'} alignItems={'center'} sx={{ mt: '40px' }}>
                                    <Box >
                                        <Typography sx={{ fontSize: '26px', fontFamily: 'Inter', fontWeight: 700, color: COLORS.black }}>Total</Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontSize: '24px', fontFamily: 'Inter', fontWeight: 500, color: COLORS.black }}>${courseDetails.price}</Typography>
                                    </Box>
                                </Stack>
                            </Box>

                      
                        <Box sx={{maxWidth:'100%', display:'flex',justifyContent:'center', alignItems:'center', mt:'40px'}}>
                            <Button sx={{
                                justifyContent:'center', 
                                alignItems:'center',
                                width:'150px',
                                height:'46px',
                                borderRadius:'32px',
                                backgroundColor:COLORS.black,
                                boxShadow:'0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                                color:COLORS.White,
                                '&:hover': {
                                    backgroundColor: COLORS.black1, 
                                    boxShadow: '0px 6px 6px 0px rgba(0, 0, 0, 0.35)'
                                }
                                }}
                                onClick={handleSubmitPay}
                                >Pay Now</Button>
                        </Box>
                    </Box>
                </Stack>
            </Grid>
        </Container>
    );
}

export default PayPage;
