import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useNavigate, useLocation } from 'react-router-dom';

const UpdateProduct = () => {

  const [isLoading, setIsLoading] = useState(true)

  const [product,setProduct] = useState({
    ProductName: "",
  });

  const [currProduct, setCurrProduct] = useState({
    ProductName: "",
  })

  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[3];

  function updateForm(value) {
    return setProduct((prev) => {
      return {...prev, ...value};
    });
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try{
        const res = await axios.get(`http://localhost:8800/BB_Product/${id}`)
        setCurrProduct(res.data)
        setIsLoading(false)

      }catch(err) {
        console.log(err)
      }
    }
    fetchProduct()
    
  },[id])

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/BB_Product/${id}`, product);
        navigate('/products');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    
    <Container maxWidth="md">

        {isLoading ? <h1>Loading...</h1> : 
          <Box>
          <Typography variant="h4">Update Product</Typography>
  
          {currProduct.map(curr => {
            return (
            <form key={curr.idProduct} onSubmit={onSubmit}>
              <Grid sx={{dislay: 'flex'}}>
              <TextField sx={{pb: 2}} id="ProductName" label="Product Name" variant="outlined" defaultValue={curr.ProductName} onChange={(e) => updateForm( {ProductName: e.target.value})}/><br />
              <Button variant="contained" disableElevation type="submit">Submit</Button><br />
              </Grid>
            </form>
          )
          })
          }
          </Box>
        }
      </Container>
  )
}

export default UpdateProduct