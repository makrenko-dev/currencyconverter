import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import currencies from '../assets/currencies.json';
import Box from '@mui/material/Box';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import Flag from 'react-world-flags';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'animate.css';
import './Converter.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Converter() {
	const [valcur1, setValCur1] = useState('');
	const [valcur2, setValCur2] = useState('');
	const [currency1, setCurrency1] = useState(null);
	const [currency2, setCurrency2] = useState(null);
	const [exchangeRate, setExchangeRate] = useState(null);

	useEffect(()=>{
		if(currency1 && currency2 ){
			fetchExchangeData();
		}
	},[currency1,currency2])

	const fetchExchangeData = async() =>{
		try{
			const responce = await fetch(`https://api.exchangerate-api.com/v4/latest/${currency1}`)
			const data = await responce.json();
			const rate = data.rates[currency2];
			setExchangeRate(rate);
			if(valcur1 !== '' && !isNaN(valcur1)) {
				setValCur2((parseFloat(valcur1)*rate).toFixed(2));
			} 

		}catch(error){
			console.error('Помилка при отриманні курсу:', error);
		}
	};

	const handleValue1Change = (e) => {
		const val = e.target.value;
		setValCur1(val);
		if(currency1 && currency2 && exchangeRate !== null){
			if(val !== '' && !isNaN(val)){
				setValCur2((parseFloat(val)*exchangeRate).toFixed(2));
			} else{
				setValCur2('');
			}
		}
	}; 
	const handleValue2Change = (e) => {
		const val = e.target.value;
		setValCur2(val);
		if(currency1 && currency2 && exchangeRate !== null){
			if(val !== '' && !isNaN(val)){
				setValCur1((parseFloat(val) * (1 / exchangeRate)).toFixed(2));
			} else{
				setValCur1('');
			}
		}
	};
	const handleSwap =() => {
		const tempCur = currency1;
		setCurrency1(currency2);
		setCurrency2(tempCur);

		const tempVal=valcur1;
		setValCur1(valcur2);
		setValCur2(tempVal);

	};

	return(
		<div className='converter'>
			<h1 className='animate__animated animate__backInLeft'> CURRENCY CONVERTER</h1>
			<Box className='mainbox' component ="section">
			 <InputGroup >
		        <Form.Control 
		        value={valcur1}
		        onChange={handleValue1Change}
		        aria-label="Value input with currency" />
		        <DropdownButton
		          variant="primary"
		          title={currency1? (
		          	<div style={{display:'flex', alignItems:'center'}}>
			          	<Flag code={currencies.find(c=>c.label === currency1)?.flag} style={{width: '1em', height:'1em', marginRight:'0.5em'}}/>
			        	{currency1}
		        	</div>
		          	) : 'Choose currency'}
		          id="input-group-dropdown-2"
		          align="end"
		        >
		        {currencies.map((currency) =>(
		        	<Dropdown.Item
		        		key={currency.label}
		        		href='#'
		        		onClick={()=>{
		        			setCurrency1(currency.label);
		        			console.log(currency1)
		        			if(currency2 && currency.label !==currency2){
		        				fetchExchangeData();
		        			}
		        		}}
		        	>

			        	<Flag code={currency.flag} style={{width: '1em', height:'1em', marginRight:'0.5em'}}/>
			        	{currency.label}
		        	</Dropdown.Item>
		        ))}
		        </DropdownButton>
		     </InputGroup>

		      <SwapHorizIcon className='swap' onClick={handleSwap} />

		      <InputGroup >
		        <Form.Control
		        value={valcur2}
		        onChange={handleValue2Change} 
		        aria-label="Value input with currency" />
		       <DropdownButton
		          variant="primary"
		          title={currency2? (
		          	<div style={{display:'flex', alignItems:'center'}}>
			          	<Flag code={currencies.find(c=>c.label === currency2)?.flag} style={{width: '1em', height:'1em', marginRight:'0.5em'}}/>
			        	{currency2}
		        	</div>
		          	) : 'Choose currency'}
		          id="input-group-dropdown-2"
		          align="end"
		        >
		        {currencies.map((currency) =>(
		        	<Dropdown.Item
		        		key={currency.label}
		        		href='#'
		        		onClick={()=>{
		        			setCurrency2(currency.label);
		        			console.log(currency2)
		        			if(currency2 && currency.label !==currency1){
		        				fetchExchangeData();
		        			}
		        		}}
		        	>
		        	<Flag code={currency.flag} style={{width: '1em', height:'1em', marginRight:'0.5em'}}/>
		        	{currency.label}
		        	</Dropdown.Item>
		        ))}
		          
		          <Dropdown.Divider />
		          <Dropdown.Item href="#">Separated link</Dropdown.Item>
		        </DropdownButton>
		      </InputGroup>
			</Box>
		</div>
	);

}