import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Button, Container } from '@mui/material';
import {useState} from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Tax from '../Tax/Tax';


const ShoppingCart = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [basket, setBasket] = useState([])
  const [prodSale, setProdSale] = useState({})
  const [subtotal, setSubtotal] = useState()

  const location = useLocation();

  const id = location.pathname.split("/")[2];

  // fetch basket data from db
  useEffect(() => {
    const fetchAllBasketStatus = async () => {
      try{
        const res = await axios.get("http://localhost:8800/bb_basketitem")
        setBasket(res.data)
        setSubtotal(basket.reduce((subtotal, item) => subtotal + Number(item.Price)*Number(item.Quantity), 0))
        

      }catch(err) {
        console.log(err)
      }
    }
    fetchAllBasketStatus()
  }, [basket])

  // fetch product sale status
  useEffect(() => {
    const fetchProductSale = async () => {
      try{
        const res = await axios.get(`http://localhost:8800/bb_basket_vu/stockstatus`)
        setProdSale(res.data)
        setIsLoading(false)

      }catch(err) {
        console.log(err)
      }
    }
    fetchProductSale()
    
  },[id])

if (isLoading) {
  return <div className="App">Loading...</div>;
}

  return (
    <>
    <Container maxWidth="md">
    <Box flex={3}>
      <Grid container sx={{pt: 5, pl: 5, pr: 5, display: 'flex'}}>
      
        <Grid item xs={6}>
        <Typography variant="h3" sx={{color: '#7d4218'}}>Shopping Cart</Typography>
        
        </Grid>
        <Grid item xs={6} sx={{textAlign: 'right', mt: 3}}>
        <Chip label={<Typography variant="body">{prodSale[2][0].stockmessage}</Typography> } color="success"> </Chip>
        
        </Grid>
        

      <Grid item xs={12}>
         {isLoading ? <h1>Loading...</h1> : 
        <Box sx={{width: '100%'}}>
 
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Basket ID</TableCell>
                <TableCell>Product ID</TableCell>
                <TableCell>Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {basket.map((item) => (
                <TableRow
                  key={item.idStatus}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.idBasket}
                  </TableCell>
                  <TableCell>{item.idProduct}</TableCell>
                  <TableCell>$ {item.Price}</TableCell>
                  <TableCell align="right">{item.Quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableRow align="right">
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="right">
                <Typography variant="h5" sx={{mr:'10px'}}>Subtotal:</Typography>
                <Typography variant="h6" sx={{mr:'10px'}} > $ {subtotal && (subtotal).toFixed(2)}</Typography> <br />

                <Tax subtotal={subtotal}/>
              </TableCell>
            </TableRow>
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

export default ShoppingCart