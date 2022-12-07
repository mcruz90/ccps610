import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Button, Container } from '@mui/material';
import {useState} from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

const ReportStock = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [basket, setBasket] = useState([])
  const [prodSale, setProdSale] = useState({})
  const [userBasketID, setUserBasketID] = useState({
    basketid: "",
  })


  // fetch basket data from db
  useEffect(() => {
    const fetchAllBasketStatus = async () => {
      try{
        const res = await axios.get("http://localhost:8800/bb_basketfilter")
        setBasket(res.data)

      }catch(err) {
        console.log(err)
      }
    }
    fetchAllBasketStatus()
  }, [basket])


  // fetch product stock status
  useEffect(() => {
    const fetchProductSale = async () => {
      try{
        const res = await axios.get(`http://localhost:8800/bb_basketfilter/stockstatus`)
        setProdSale(res.data)
        setIsLoading(false)

      }catch(err) {
        console.log(err)
      }
    }
    fetchProductSale()
    
  },[prodSale])

  function createForm(value) {
    return setUserBasketID((prev) => {
      return {...prev, ...value};
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/bb_basketfilter/", userBasketID)
    } catch (err) {
      console.log(err)
    }

    setUserBasketID({
      basketid: "",
    });

  }


if (isLoading) {
  return <div className="App">Loading...</div>;
}

  return (
    <>
    <Container maxWidth="md">
    <Box flex={3}>
      <Grid container sx={{pt: 5, pl: 5, pr: 5, display: 'flex'}}>
      
        <Grid item xs={6}>
        <Typography variant="h3" sx={{color: '#7d4218'}}>Stock Status</Typography>
        
        </Grid>
        <Grid item xs={6} sx={{textAlign: 'right', mt: 3}}>
        <Typography variant="h6">{prodSale && prodSale[2][0].stockmessage}</Typography>
        
        </Grid>
        <Grid>
        <Typography variant="h5"> Pick basket ID to display</Typography>
            <form onSubmit={onSubmit}>
            <FormControl fullWidth>
            <TextField sx={{pb: 2}} id="basketid" label="basketid" variant="outlined" defaultValue="" onChange={(e) => createForm( {basketid: e.target.value})}/><br />
            <Button variant="contained" disableElevation type="submit">Submit</Button><br />
            </FormControl>
          </form>
        </Grid>
        

      <Grid item xs={12}>
         {basket &&
        <Box sx={{width: '100%'}}>
 
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Basket ID</TableCell>
                <TableCell>Product ID</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell align="right">Stock</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {basket.map((item) => (
                <TableRow
                  key={item.idbb_basketfilter}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.idbasket}
                  </TableCell>
                  <TableCell>{item.idproduct}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell align="right">{item.stock}</TableCell>
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

export default ReportStock