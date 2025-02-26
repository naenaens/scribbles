import { useState, useEffect, useContext } from 'react'; 
import { Container, Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext'; 
import Swal from 'sweetalert2'; 
import Footer from '../components/Footer'
import Contact from '../components/Contact';

export default function Register() {

	const { user } = useContext(UserContext);
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [middleName, setMiddleName] = useState('')
	const [email, setEmail] = useState('')
	const [mobileNo, setMobileNo] = useState('')
	const [address, setAddress] = useState('')
	const [password1, setPassword1] = useState('')
	const [password2, setPassword2] = useState('')

	const [isActive, setIsActive] = useState(false);
	const [isMatched, setIsMatched] = useState(false)
	const [isMobileValid, setIsMobileValid] = useState(false);
	const [isAllowed, setIsAllowed] = useState(false)

	useEffect(() => {
		if (mobileNo.length === 11)
			{

			setIsMobileValid(true)
			if (
				password1 === password2 &&
				password1 !== '' && password2 !== '') {
				setIsMatched(true);
				if (firstName !=='' && lastName !=='' && email !=='') {
					setIsAllowed(true);
					setIsActive(true)
				} else {
					setIsAllowed(false);
					setIsActive(false)
				}

			} else {
				setIsActive(false)
				setIsMatched(false)
				setIsAllowed(false)
			}

		}
		else if (password1 !== '' && password1 === password2) {
			setIsMatched(true);

		} else {
			setIsActive(false)
			setIsMatched(false)
			setIsMobileValid(false)
			setIsAllowed(false)
		}

	},[firstName, middleName, lastName, email, password1, password2, address, mobileNo])

	const registerUser = async (eventSubmit) => {
		eventSubmit.preventDefault()

		const isRegistered = await fetch('https://immense-fortress-37269.herokuapp.com/users/register', {
			method: 'POST',
			headers: {
				'Content-Type':'application/json'
			},
			body: JSON.stringify({
				firstName: firstName,
				middleName: middleName,
				lastName: lastName,
				email: email,
				address: address,
				mobileNo: mobileNo,
				password: password1
			})
		}).then(response => response.json()).then(dataJson => {
			if (dataJson.email) {
				return true;
			} else {
				return false;
			}
		})

		if (isRegistered) {
			setFirstName('');
			setMiddleName('');
			setLastName('');
			setEmail('');
			setMobileNo('');
			setAddress('');
			setPassword1('');
			setPassword2('');
			await Swal.fire({
        		icon: 'success',
        		title: 'Registration Successful',
        		text: 'Thank you for creating an Account',
				confirmButtonColor: '#fc5467'
        	});
        	window.location.href = "/login"; 
		} else {
			Swal.fire ({
				icon: 'error',
        		title: 'Existing Email!',
        		text: 'Please use another one or log in to your account.',
				confirmButtonColor: '#bd8b91'
			});
		}
	};

	return (
		user.id 
		?
		<Navigate to="/products" replace={true} />
		:
		<div  className='reg-background'>
			{/* <Hero bannerData={data} /> */}
			
				<Container >
					{
						isAllowed ?
						<h1 className="text-center regis" style={
							{color:"#fc5467",
							paddingTop:"120px"}}>You are ready to proceed!</h1>
						: <h1 className="text-center regis" style={
							{color:"#fc5467",
							paddingTop:"120px"}}>Sign up below!</h1>
					}


					<h6 className="text-center mt-3 mb-3"
					style={
						{color:"#917377",
						fontWeight:"bold"}}>Please fill out the form below:
					</h6>


					<Form className="register-form" style={
						{maxWidth:"450px",
						// maxHeight :"700px",
						marginLeft: "auto",
						marginRight: "auto",
						marginBottom: "20px",
						textAlign: "left",
						boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
						paddingTop: "15px",
						paddingRight :"20px",
						paddingLeft: "20px",
						borderRadius: "20px",
						paddingBottom: "1px",
						backgroundColor: "#F9F3F3",
						// paddingBottom: "10px"
						}
					}
					onSubmit={e => registerUser (e)}>

						{/*First Name*/}
						<Form.Group>
							<Form.Label>First Name:</Form.Label>
							<Form.Control type="text" placeholder="Enter your first name" required value={firstName} onChange={event => {setFirstName(event.target.value)}} />
						</Form.Group>
						{/*Middle Name*/}
						<Form.Group>
							<Form.Label>Middle Name:</Form.Label>
							<Form.Control type="text" placeholder="Enter your middle name, write NA if none" required value={middleName} onChange={event => {setMiddleName(event.target.value)}}/>
						</Form.Group>
						{/*Last Name*/}
						<Form.Group>
							<Form.Label>Last Name:</Form.Label>
							<Form.Control type="text" placeholder="Enter your last name" required value={lastName} onChange={event => {setLastName(event.target.value)}}/>
						</Form.Group>
						{/*Email Address*/}
						<Form.Group>
							<Form.Label>Email:</Form.Label>
							<Form.Control type="email" placeholder="Enter your email address" required value={email} onChange={event => {setEmail(event.target.value)}}/>
						</Form.Group>
						{/*Mobile Number*/}
						<Form.Group>
							<Form.Label>Mobile Number:</Form.Label>
							<Form.Control type="number" placeholder="Type in your mobile number" required value={mobileNo} onChange={event => {setMobileNo(event.target.value)}}/>
							{
								isMobileValid ?
								<span className="mob-valid">Mobile Number is valid</span>
								:
								<span className="mob-invalid">Mobile Number should be 11 digits</span>
							}
						</Form.Group>
						{/*Home Address*/}
						<Form.Group>
							<Form.Label>Home Address:</Form.Label>
							<Form.Control type="text" placeholder="Enter your home address" required value={address} onChange={event => {setAddress(event.target.value)}}/>
						</Form.Group>
						{/*Password*/}
						<Form.Group>
							<Form.Label>Password:</Form.Label>
							<Form.Control type="Password" placeholder="Create a password" required value={password1} onChange={event => {setPassword1(event.target.value)}} />
						</Form.Group>

						{/*Confirm Password*/}
						<Form.Group>
							<Form.Label>Confirm Password:</Form.Label>
							<Form.Control type="Password" placeholder="Re-type your password to confirm." required value={password2} onChange={event => {setPassword2(event.target.value)}}/>
							{
								isMatched ?
								<span className="pass-match">Passwords match. Great job!</span>
								: <span className="pass-unmatched">Please make sure your passwords match.</span>
							}

						</Form.Group>

						{
						isActive ?
						<Button type="Submit" id="regButton" className="btn-block mb-5 mx-auto"> Register</Button>
						:
						<Button id="regButton2" className="btn-block mb-5 mx-auto" disabled> Register</Button>
						}

					</Form>
				</Container>
			
			<div>
				<Contact/>
				<Footer/>
			</div>
			
		</div>
	);
};