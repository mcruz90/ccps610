import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import {Link} from 'react-router-dom';

const Reports = () => {
  return (
    <div>
        <Container maxWidth="md">
        <Box flex={3}>
        <Grid container sx={{pt: 5, pl: 5, pr: 5, display: 'flex'}}>
            <Grid item xs={12}>
                <Typography variant="h3" sx={{color: '#7d4218'}}>Reports</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="subtitle"><Link style={{color: '#083d77', textDecoration: 'none'}} to ="/reports/stock">Check stock of basket items</Link></Typography><br />
                <Typography variant="subtitle"><Link style={{color: '#083d77', textDecoration: 'none'}} to ="/reports/sales">Check customer sales</Link></Typography>
            </Grid>
        </Grid>
        </Box>
        </Container>

    </div>
  )
}

export default Reports