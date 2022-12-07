import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Products = () => {

  const [isLoading, setLoading] = useState(true);

  const [products, setProducts] = useState([])
  const [show, setShow] = useState(false);
  const [selectProduct, setSelectProduct] = React.useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try{
        const res = await axios.get("http://localhost:8800/bb_Product")
        setProducts(res.data)
        setLoading(false)
      }catch(err) {
        console.log(err)
      }
    }
    fetchAllProducts()
  }, [])




  const handleChange = (event) => {

    setSelectProduct(event.target.value);
    
  };


  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  
  return (
    <>
    <Container maxWidth="md">
    <Box flex={4}>
      <Grid container sx={{pt: 5, pl: 5, pr: 5, display: 'flex'}}>
      
        <Grid item xs={7}>
        <Typography variant="h3" sx={{color: '#7d4218'}}>Products</Typography>
        </Grid>
        <Grid item xs={5}>
        <Typography variant="h3" sx={{color: '#7d4218'}}>
          <Button color="secondary" variant="contained" disableElevation sx={{mr: 2}}><Link style={{color: 'white', textDecoration: 'none'}}  to="add">Add New Product</Link></Button> 
          <Button color="secondary" variant="contained" disableElevation onClick={() => setShow(prev => !prev)}>Edit Product</Button></Typography>
        </Grid>

        <Grid item xs={7}>

        </Grid>
        <Grid item xs={5}>
          {show && 
            <Box>

              <FormControl fullWidth>
                <InputLabel id="select-label">Select Product to Edit</InputLabel>
                <Select
                  labelId="select-label"
                  id="select"
                  defaultValue=""
                  label="Select Product"
                  size="small" 
                  onChange={handleChange}
                  sx={{mt: 1, mb: 1}}
                >
                  {products.map(product=>(
                    
                    <MenuItem key={product.idProduct} value={product.idProduct}> {product.ProductName}</MenuItem>
                    

                  ))}
                </Select>
                <Button color="secondary" variant="contained" disableElevation sx={{ml: 2}}><Link style={{color: 'white', textDecoration: 'none'}}  to={`update/${selectProduct}`}>Select</Link></Button> 
              </FormControl>
              
            </Box>
            }
        </Grid>
        

      <Grid item xs={12}>
        
        <Box sx={{width: '100%', 
          display: 'flex', flexWrap: 'wrap'}}>
          {products.map(product=>(
            <Box key={product.idProduct} sx={{ width: '25%', textAlign: 'center', p: 2, m: 2}}>

            <img src={require(`./Products/${product.ProductImage}`)} alt={product.ProductImage} height="100" />

            <Typography variant="subtitle2">{product.ProductName}</Typography> 
            <Typography variant="subtitle">{product.Description}</Typography> 
            <Typography variant="subtitle2">${product.Price}</Typography>
            
            <Button><Link style={{textDecoration: 'none', color: '#083d77'}} to={`${product.idProduct}`}>View Details</Link></Button>

          </Box>
          ))
            
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

export default Products