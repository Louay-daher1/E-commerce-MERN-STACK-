import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useAuth } from '../context/auth/AuthContext';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';



function Navbar() {
  const {username,token,isAuthenticated}=useAuth()
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate=useNavigate()
 
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handelloginPage=()=>{
    navigate('/login')
   }

console.log("From Navbar ",{username,token})
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <Box sx={{display:'flex',flexDirection:"row",justifyContent:"space-between",width:"100%",alignItems:"center"}}>
            <Box sx={{display:"flex",flexDirection:"row",alignItems:"center"}}>
          <AdbIcon sx={{ display: 'flex', mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily:  'monospace',
              fontWeight: 700,
            }}
          >
            Tech Hub 
          </Typography>

          </Box>
          
          <Box sx={{ flexGrow: 0 }}>
         { isAuthenticated?<>
          <Tooltip title="Open settings">
              <Stack direction="row" alignItems='center' spacing={2}>
                <Typography>{username}</Typography>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={username||''} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Stack>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
            
                <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>My Order</Typography>
                </MenuItem>
                <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                </MenuItem>
            </Menu>
         </>:(<Button variant="contained" color="success" onClick={handelloginPage}>Login</Button>

         )}
          
          </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
