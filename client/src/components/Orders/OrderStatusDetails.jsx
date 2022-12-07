import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Button, Container } from '@mui/material';
import {useState} from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';


const OrderStatusDetails = () => {
  const [order, setOrder] = useState([])

  const [basketItem, setBasketItem] = useState({
    idBasket: "",
    idStage: "",
    dtStage: "",
    shipper: "",
    ShippingNum: ""
  });

  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchOrder = async () => {
      try{
        const res = await axios.get(`http://localhost:8800/bb_basketstatus/${id}`)
        setOrder(res.data)

      }catch(err) {
        console.log(err)
      }
    }
    fetchOrder()
    
  },[id])


  function createForm(value) {
    return setBasketItem((prev) => {
      return {...prev, ...value};
    });
  }

  async function onSubmit(e) {

    e.preventDefault();
    
    
    //update info in db

    try {
      await axios.put(`http://localhost:8800/bb_basketstatus/${id}`,basketItem);
      navigate('/orderstatus');
    } catch (err) {
      console.log(err)
    }


    console.log(basketItem)

    setBasketItem({
        idbasket: "",
        idstage: "",
        dtstage: "",
        shipper: "",
        shippingnum: ""
    }
    );
    
    
}

  return (
    <>
    <Container maxWidth="md">
    <Box flex={4}>
      <Grid container sx={{pt: 5, pl: 5, pr: 5, display: 'flex'}}>
      
        <Grid item xs={12}>
        <Typography variant="h3" sx={{color: '#7d4218'}}>Order Status Details</Typography>
        </Grid>
        

      <Grid item xs={12}>
        
        <Box sx={{width: '100%', 
          display: 'flex', flexWrap: 'wrap'}}>
          

            {order.map(ord => {
              return(
                <form onSubmit={onSubmit}>
                  <Box key={ord.idBasket} sx={{ width: '75%', textAlign: 'center', p: 2, m: 2}}>

                  <FormControl>
                  <TextField sx={{pb: 2}} id="idBasket" label="idBasket" variant="outlined" defaultValue={ord.idBasket} onChange={(e) => createForm( {idBasket: Number(e.target.value)})} /><br />
                  <TextField sx={{pb: 2}} id="idStage" label="idStage" variant="outlined" defaultValue={ord.idStage} onChange={(e) => createForm( {idStage: Number(e.target.value)})} /><br />
                  <TextField sx={{pb: 2}} id="dtStage" label="dtStage" variant="outlined" defaultValue={ord.dtStage.split('T')[0]} onChange={(e) => createForm( {dtStage: (e.target.value)})} /><br />
                  <TextField sx={{pb: 2}} id="shipper" label="shipper" variant="outlined" value={ord.shipper} onChange={(e) => createForm( {shipper: (e.target.value)})} /><br />
                  <TextField sx={{pb: 2}} id="ShippingNum" label="ShippingNum" variant="outlined" value={ord.ShippingNum} onChange={(e) => createForm( {ShippingNum: (e.target.value)})} /><br />
                
                

                  <Button variant="contained" type="submit">Update Status</Button>
                  </FormControl>
                  </Box>
                  </form>)
                  
              
              }
              )
            }
            
          
          

        </Box>

        
      </Grid>

      </Grid>
      <Grid>
        
      </Grid>

      </Box>
    </Container>
    </>
  )
}

export default OrderStatusDetails