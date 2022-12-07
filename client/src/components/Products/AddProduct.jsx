import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';


const AddProduct = () => {
  
  const [product,setProduct] = useState({
    ProductName: "",
    Description: "",
    ProductImage: "",
    Price: "",
    Active: ""
  });

  const [basketItem, setBasketItem] = useState({
    IdProduct: "",
    Price: "",
    Quantity: "",
    idBasket: "",
    optionone: "",
    optiontwo: ""
  });

  const navigate = useNavigate();

  function createForm(value) {
    return setProduct((prev) => {
      return {...prev, ...value};
    });
  }

  async function onSubmit(e) {
    e.preventDefault();


    // send new product record to db
    try {
      await axios.post("http://localhost:8800/bb_Product", product)
      await axios.post("http://localhost:8800/BB_BASKETITEM",basketItem)
    } catch (err) {
      console.log(err)
    }

    setProduct({
      ProductName: "",
      Description: "",
      ProductImage: "",
      Price: "",
      Active: ""
    });

    navigate("/products");
  }

  

  return (
    <>
    <Container maxWidth="md">
      <Box>
      <Typography variant="h4">Add a Product</Typography>

      
        <Grid sx={{dislay: 'flex'}}>
        <form onSubmit={onSubmit}>
        <FormControl fullWidth>
        <TextField sx={{pb: 2}} id="ProductName" label="Product Name" variant="outlined" value={product.ProductName} onChange={(e) => createForm( {ProductName: e.target.value})}/><br />
        <TextField sx={{pb: 2}} id="Description" label="Description" variant="outlined" value={product.Description} onChange={(e) => createForm( {Description: e.target.value})}/><br />
        <TextField sx={{pb: 2}} id="Price" label="Price" variant="outlined" value={product.Price} onChange={(e) => createForm( {Price: e.target.value})} InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }} /><br />
        <TextField sx={{pb: 2}} id="ProductImage" label="Image URL" variant="outlined" value={product.ProductImage} onChange={(e) => createForm( {ProductImage: e.target.value})}/><br />
        <TextField sx={{pb: 2}} id="Active" label="Active?" variant="outlined" value={product.Active} onChange={(e) => createForm( {Active: e.target.value})}/><br />
        <Button variant="contained" disableElevation type="submit">Submit</Button><br />
        </FormControl>
      </form>
      </Grid>
      </Box>
      </Container>
    </>
  )
}

export default AddProduct