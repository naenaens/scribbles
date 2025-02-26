import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext'; 
import { Navigate, Link } from 'react-router-dom'; 

import {Form, Button, Container} from 'react-bootstrap'
import Footer from '../components/Footer'
import Contact from '../components/Contact';


import Swal from 'sweetalert2';

export default function Login () {

	const { user, setUser } = useContext(UserContext); 
	const [email, setEmail] = useState('');	
	const [password, setPassword] = useState('');

	let addressSign = email.search('@');
	let dns = email.search('.com')

	const [isActive, setIsActive] = useState(false);
	const [isValid, setIsValid] = useState(false);
	useEffect(() => {
		if (dns !== -1 && addressSign !== -1) {
			setIsValid(true)
			if (password !== '') {
				setIsActive(true);
			} else {
				setIsActive(false);
			}
		} else {
			setIsValid(false)
		}
	},[email, password, addressSign, dns])

	const loginUser = async (event) => {
		event.preventDefault();

		fetch(`https://immense-fortress-37269.herokuapp.com/users/login`, {
			method: 'POST',
			headers: {
				'Content-Type':"application/json"
			},
			body: JSON.stringify({
   				email: email,
    			password:password
			})
		}).then(res => res.json())
		.then(dataJ => {
			let token = dataJ.access;

			if (typeof token !== 'undefined') {
				
				localStorage.setItem('accessToken', token);

				fetch('https://immense-fortress-37269.herokuapp.com/users/profile', {
					headers: {
					   Authorization: `Bearer ${token}`
					}
				 })
				 .then(res => res.json())
				 .then(convertedData => {
				   if (typeof convertedData._id !== "undefined") {
					 setUser({
						id: convertedData._id, 
						isAdmin: convertedData.isAdmin
				 });

				Swal.fire ({
					icon: "success",
					title: 'Logged in successfully!',
					text: 'Thank you for logging in.',
					confirmButtonColor: '#fc5467'
				})
			 
			} else {
				setUser({
					id: null, 
					isAdmin: null
				 });
			   }
			}); 
		} else {
			Swal.fire({
				icon: 'error',
				title: 'Logged failed!',
				text: 'Please make sure credentials are accurate.',
				confirmButtonColor: '#bd8b91'
			})	
		}
	})
	
};

	return (
		user.id ?
		<Navigate to="/" replace={true}/>
		:
		<div className="login-bg">
			
			<Container className="pb-5">

				<h1 className="text-center login" style={
						{color:"#fc5467",
						paddingTop:"200px",
						paddingBottom: "10px"}}>Great to have you! :)</h1>
				<Form style={
						{maxWidth:"450px",
						marginLeft: "auto",
						marginRight: "auto",
						marginBottom: "20px",
						textAlign: "left",
						boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
						paddingTop: "15px",
						paddingRight :"15px",
						paddingLeft: "15px",
						borderRadius: "20px",
						paddingBottom: "1px",
						backgroundColor: "#F9F3F3"
					}
					} onSubmit={e => loginUser (e)}>
					{/*Email Address*/}
					<Form.Group>
						<Form.Label>Email</Form.Label>
						<Form.Control type="email" placeholder="Enter your email address" required value={email} onChange={event => {setEmail(event.target.value)}}/>

						{
							isValid ?
							<h6 className="email-valid">Email is valid!</h6>
							: <h6 className="email-invalid">Email is invalid.</h6>
						}

					</Form.Group>

					{/*Password*/}
					<Form.Group>
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Enter your password" required value={password} onChange={event => {setPassword(event.target.value)}}/>
					</Form.Group>

					{/*Submit button*/}		
					{
						isActive ?
						<Button type="Submit" id="loginButton" variant="success" className="btn-block mb-5 mx-auto"> Login</Button>
						:
						<Button type="Submit" id="login-button-dis"  className="btn-block mb-5 mx-auto" disabled> Login</Button>	

					}
									
				</Form>
				<div className='text-center'>
					<Link className="purchase-btn btn mb-4 font-weight-bold text-center" to="/register">
							No account? Click here to register!
					</Link>
				</div>
			</Container>
			<div>
				<Contact/>
				<Footer/>
			</div>
			
		</div>
	);
};