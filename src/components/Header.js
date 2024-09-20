import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import logo from '../images/logocc.png'
import './Header.css'
import EuroIcon from '@mui/icons-material/Euro';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
export default function Header() {
const [rates, setRates] = useState({ EUR: null, USD: null });
const API_KEY = '7632b74296a7fe6088e47510';

useEffect(()=>{
	const fetchExchangeData = async() =>{
		try{
			const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/UAH`);
			const data = await response.json();
	        setRates({
	          EUR: (1 / data.conversion_rates.EUR).toFixed(2),
	          USD: (1 / data.conversion_rates.USD).toFixed(2),
	        });
		}catch (error) {
        console.error('Помилка при завантаженні курсу валют:', error);
      }
	};
	fetchExchangeData();
},[]);

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar className='navbar' >
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
           <img className='logo' src={logo} alt="Logo" />
          </IconButton>
          <Typography className='rates' variant="h6" component="div" >
          <EuroIcon sx={{ mr: 1 }}/>
           {rates.EUR && <p>EUR/UAH: {rates.EUR}</p>}
          </Typography>
          <Typography className='rates' variant="h6" component="div" >
          <AttachMoneyIcon sx={{ mr: 1 }} />
        	{rates.USD && <p>USD/UAH: {rates.USD}</p>}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
