import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const CalculateTax = () => {

    const [subtotal, setSubtotal] = useState();
    const [orderstate, setOrderState] = useState([]);
    const [selectedStateTax, setSelectedStateTax] = useState();

      // get state from db
      useEffect(() => {
        const fetchProduct = async () => {
          try{
            const res = await axios.get(`http://localhost:8800/bb_tax/`)
            setOrderState(res.data)
          }catch(err) {
            console.log(err)
          }
        }
        fetchProduct()
      },[])
    
      const handleChange = (e) => {
          setSelectedStateTax(e.target.value)
      };



  return (
    <>
    <Container maxWidth="md">
      <Box>
      <Typography variant="h4">Estimate Tax</Typography>

      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">State</InputLabel>
        <Select 
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedStateTax}
          label="Select State"
          onChange={handleChange}
        >
            {orderstate.map(stateName =>(
                <MenuItem key={stateName.idState} value={stateName.TaxRate}>{stateName.State}</MenuItem>
            ))
            }
          
        </Select>
        <TextField sx={{mt: 2, pb: 2}} id="subtotal" label="Subtotal" variant="outlined" value={subtotal} onChange={(e) => setSubtotal(e.target.value)}/><br />
      </FormControl>

      Estimated Tax: $ {selectedStateTax * subtotal}
    </Box>

      </Box>
      </Container>
    </>
  )
}

export default CalculateTax