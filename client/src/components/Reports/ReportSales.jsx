import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {useState} from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ReportSales = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [basket, setBasket] = useState([])


  // fetch basket data from db
  useEffect(() => {
    const fetchAllBasketStatus = async () => {
      try{
        const res = await axios.get("http://localhost:8800/bb_basket/showall")
        setBasket(res.data)
        setIsLoading(false)

      }catch(err) {
        console.log(err)
      }
    }
    fetchAllBasketStatus()
  }, [basket])


if (isLoading) {
  return <div className="App">Loading...</div>;
}

  return (
    <>
    <Container maxWidth="md">
    <Box flex={3}>
      <Grid container sx={{pt: 5, pl: 5, pr: 5, display: 'flex'}}>
      
        <Grid item xs={12}>
        <Typography variant="h3" sx={{color: '#7d4218'}}>Customer Total Sales Report</Typography>
        
        </Grid>
        

      <Grid item xs={12}>
         {basket &&
        <Box sx={{width: '100%'}}>
 
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Shopper ID</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Total Purchases</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {basket.map((item) => (
                <TableRow
                  key={item.idShopper}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.idShopper}
                  </TableCell>
                  <TableCell>{item.FirstName} {item.LastName}</TableCell>
                  <TableCell>$ {item.TotalPurchases}</TableCell>
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

export default ReportSales