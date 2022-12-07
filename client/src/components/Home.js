import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import coffeehero from '../assets/img/coffeehero.png';
import { Container } from '@mui/material';



const Home = () => {
  return (
    <div>
      <Container>
      <Box sx={{ flexGrow: 2 }}>
      <Grid container spacing={10} sx={{pl: 15, pt: 1}}>
        <Grid item xs={5}>
          
              <Typography variant="h3" sx={{color: '#7d4218', pt: 10}}>But First, Coffee!</Typography>
                <Typography variant="subtitle2" sx={{color: '#7d4218'}}>
                <p>Filter cinnamon half and half cultivar, black grounds dripper blue mountain instant seasonal instant. Sugar, saucer, skinny shop qui fair trade, seasonal brewed organic to go mocha.
                </p>
                <p>
                Cultivar, shop, half and half acerbic beans arabica grounds. Half and half ut, fair trade, grounds americano filter ristretto café au lait frappuccino.
                </p>
                </Typography>
            
        </Grid>
        <Grid item xs={7}>
          <img src={coffeehero} width="500" alt="coffee cup hero" />
        </Grid>
        </Grid>
      </Box>
      </Container>

    </div>
  )
}

export default Home