import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Link} from 'react-router-dom';


export const OrderStatus = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [basketStatus, setBasketStatus] = useState([]);

    useEffect(() => {
        const fetchAllBasketStatus = async () => {
          try{
            const res = await axios.get("http://localhost:8800/bb_ship_vu")
            setBasketStatus(res.data)
            setIsLoading(false)

          }catch(err) {
            console.log(err)
          }
        }
        fetchAllBasketStatus()
      }, [])


      console.log(basketStatus)

  return (
    <>
    <Container maxWidth="md">
    <Box flex={3}>
      <Grid container sx={{pt: 5, pl: 5, pr: 5, display: 'flex'}}>
      
        <Grid item xs={12}>
        <Typography variant="h3" sx={{color: '#7d4218'}}>Order Status</Typography>
        </Grid>
        

      <Grid item xs={12}>
         {isLoading ? <h1>Loading...</h1> : 
        <Box sx={{width: '100%'}}>
 
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ORDER ID</TableCell>
                <TableCell>Order Stage</TableCell>
                <TableCell>Last Update</TableCell>
                <TableCell align="right">Shipping Service</TableCell>
                <TableCell align="right">Tracking Number</TableCell>
                <TableCell align="right">Update Order</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {basketStatus.map((basket) => (
                <TableRow
                  key={basket.idStatus}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {basket.idbasket}
                  </TableCell>
                  <TableCell>{basket.idstage}</TableCell>
                  <TableCell>{basket.dtstage.split('T')[0]}</TableCell>
                  <TableCell align="right">{basket.shipper}</TableCell>
                  <TableCell align="right">{basket.shippingnum}</TableCell>
                  <TableCell align="right"><Link to={`${basket.idstatus}`}>Edit</Link></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        </Box>
        }
        
      </Grid>

      </Grid>
      <Grid>
        
      </Grid>

      </Box>
    </Container>
    </>
  )
}
