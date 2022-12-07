import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Button, Container } from '@mui/material';
import {useState} from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';


const DetailsProduct = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [product, setProduct] = useState([])
  const [prodSale, setProdSale] = useState({})

  const location = useLocation();

  const id = location.pathname.split("/")[2];

  // fetch product data from db
  useEffect(() => {
    const fetchProduct = async () => {
      try{
        const res = await axios.get(`http://localhost:8800/bb_Product/${id}`)
        setProduct(res.data)

      }catch(err) {
        console.log(err)
      }
    }
    fetchProduct()
    
  },[id])

  // fetch product sale status
  useEffect(() => {
    const fetchProductSale = async () => {
      try{
        const res = await axios.get(`http://localhost:8800/bb_Product/${id}/salestatus`)
        setProdSale(res.data)
        setIsLoading(false)

      }catch(err) {
        console.log(err)
      }
    }
    fetchProductSale()
    
  },[id])


  
  const [basketItem, setBasketItem] = useState({
    IdProduct: "",
    Price: "",
    Quantity: "",
    idBasket: "",
    optionone: "",
    optiontwo: ""
  });

  function createForm(value) {
    return setBasketItem((prev) => {
      return {...prev, ...value};
    });
  }

  async function onSubmit(e) {

    e.preventDefault();

      // sends new item to be added to basket

    try {
      await axios.post("http://localhost:8800/BB_BASKETITEM",basketItem)
    } catch (err) {
      console.log(err)
    }


    console.log(basketItem)


    setBasketItem({
      IdProduct: "",
      Price: "",
      Quantity: "",
      idBasket: "",
      optionone: "",
      optiontwo: ""
    }
    );
    
    
}

if (isLoading) {
  return <div className="App">Loading...</div>;
}

  return (
    <Box sx={{ flexGrow: 2 }}>
    <Container maxWidth="md">
      <Grid container spacing={2}>
      
        <Grid item md={12}>
        <Typography variant="h3" sx={{color: '#7d4218'}}>Product Details</Typography>
        </Grid>
      
        
            {product.map(prod => {
              return(
                <Box sx={{ display: 'flex', p: 3 }}>
                  <Grid item md={7} sx={{pr: 3}}>

                  <img src={require(`./${prod.ProductImage}`)} alt={product.ProductImage} width="250" />


                    <Typography variant="h5"> {prod.ProductName}</Typography> 
                    <Typography variant="subtitle">{prod.Description}</Typography> 
                    <Typography variant="h5"> ${prod.Price}</Typography>

                    <Typography variant="h6">{Object.values(prodSale[0])}</Typography>
                  </Grid>

                  <Grid item md={5}>

                    <form onSubmit={onSubmit}>
                      <FormControl fullWidth>
                        <TextField size="small" id="IdProduct" label="IdProduct" variant="outlined" defaultValue={prod.idProduct} onChange={(e) => createForm( {IdProduct: Number(e.target.value)})} /><br />
                        <TextField size="small" id="Price" label="Price" variant="outlined" defaultValue={prod.Price} onChange={(e) => createForm( {Price: Number(e.target.value)})} /><br />
                        <TextField size="small" id="idBasket" label="idBasket" variant="outlined" value={basketItem.idBasket} onChange={(e) => createForm( {idBasket: Number(e.target.value)})} /><br />
                        <TextField size="small" id="optionone" label="Size" variant="outlined" value={basketItem.optionone} onChange={(e) => createForm( {optionone: Number(e.target.value)})} /><br />
                        <TextField size="small" id="optiontwo" label="Form" variant="outlined" value={basketItem.optiontwo} onChange={(e) => createForm( {optiontwo: Number(e.target.value)})} /><br />
                        <TextField size="small" id="Quantity" label="Quantity" variant="outlined" value={basketItem.Quantity} onChange={(e) => createForm( {Quantity: Number(e.target.value)})} /><br />
                      
                        <Button variant="contained" type="submit">Add to Cart</Button>
                      </FormControl>
                    </form>
                    </Grid>
                  </Box>)
                  
              
              }
              )
            }
        
        
      </Grid>
      <Grid>
        
      </Grid>

      
    </Container>
    </Box>
  )
}

export default DetailsProduct