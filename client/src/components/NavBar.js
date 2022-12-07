import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import {Link} from 'react-router-dom';
import logo from '../assets/img/bblogo.png';

const pages = [<Link style={{color: '#7d4218', textDecoration: 'none'}} to ="/">Home</Link>, 
              <Link style={{color: '#7d4218', textDecoration: 'none'}} to ="/products">Products</Link>,
              <Link style={{color: '#7d4218', textDecoration: 'none'}} to ="/orderstatus">Orders</Link>,
              <Link style={{color: '#7d4218', textDecoration: 'none'}} to ="/reports">Reports</Link>,
              <Link style={{color: '#7d4218', textDecoration: 'none'}} to ="/shoppingcart">CART</Link>];


const NavBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
  
    return (
      <AppBar position="static" elevation={0} style={{ background: 'white' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img src={logo} width="30" alt="logo" />

            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                pl: 1,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: '#7d4218',
                textDecoration: 'none',
              }}
            >
              BREWBEAN'S
            </Typography>
  
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: '#7d4218',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1 }}>
            </Box>
  
            <Box sx={{ pr: 3, display: { xs: 'none', md: 'flex'}}}>
            {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: '#7d4218', display: 'flex', alignItems: 'right', textAlign: 'right' }}
                >
                  {page}
                </Button>
              ))}
            </Box>

           
          </Toolbar>
        </Container>
      </AppBar>
    );
  }

export default NavBar