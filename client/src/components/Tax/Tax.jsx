import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Tax = (props) => {


    const {subtotal} = props;
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
      <Typography sx={{pb: 1}}>Estimate Tax</Typography>

      <Box>
      <FormControl sx={{width: 100}}>
        <InputLabel id="demo-simple-select-label">Select State</InputLabel>
        <Select 
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue=""
          label="Select State"
          onChange={handleChange}
          size="small"
        >
            {orderstate.map(stateName =>(
                <MenuItem size="small" key={stateName.idState} value={stateName.TaxRate}>{stateName.State}</MenuItem>
            ))
            }
          
        </Select>
        </FormControl>
        <Box sx={{p: 1}}>
            <Typography>$ {selectedStateTax && (selectedStateTax * subtotal).toFixed(2)}</Typography>
        </Box>

    </Box>

      </Box>
      </Container>
    </>
  )
}

export default Tax