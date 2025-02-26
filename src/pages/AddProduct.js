
import {Form, Button, Container} from 'react-bootstrap'
import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import {Navigate} from 'react-router-dom';
import Swal from 'sweetalert2';

export default function AddProduct () {
	const { user } = useContext(UserContext);
	const [name, setName] = useState('')	
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState('')
	const [isActive, setIsActive] = useState(false);
	let token = localStorage.getItem('accessToken')
	useEffect(() =>{
		if(name !== '' && description !== '' && price !== 0){
			setIsActive(true);
		} else{
			setIsActive(false);
		}
	},[name, description, price]);
	
	const createProduct = async (event) => {
		event.preventDefault()

		const isCreated = await fetch('https://immense-fortress-37269.herokuapp.com/products/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		}).then(response => response.json()).then(data =>{
			console.log(data)
			if(data.name){
				return true;
			} else{
				return false;
			}
		})
		if (isCreated) {
			
				await Swal.fire({
					icon: 'success',
					title: 'Successfully Added Product',
					confirmButtonColor: '#fc5467'
				})
				setName('');
				setDescription('');
				setPrice('');

				window.location.href = '/products';

		} else {
					Swal.fire({
					icon: 'error',
					title: 'Oh no! Something Went Wrong',
					confirmButtonColor: '#917377'
				});
		}
	};
	return (
		user.id && user.isAdmin
		?
		<>
			{/* <Hero bannerData={data}/> */}
			<Container>
				<h1 className="add-prod text-center" style={
						{color:"#fc5467",
						marginTop:"200px"}}>Add Product</h1>
				<Form style={
						{width:"450px",
						marginLeft: "auto",
						marginRight: "auto",
						marginBottom: "20px",
						textAlign: "left",
						boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
						paddingTop: "15px",
						paddingRight :"15px",
						paddingLeft: "15px",
						paddingBottom: "1px",
						borderRadius: "20px",
						backgroundColor: "#F9F3F3"
					}
				}
						onSubmit={e => createProduct (e)}>
				
					{/*Course Name*/}
					<Form.Group>
						<Form.Label>Product Name:</Form.Label>
						<Form.Control type="text" placeholder="Add Product name" required value={name} onChange={event => {setName(event.target.value)}}/>
					</Form.Group>

					{/*Course Description*/}
					<Form.Group>
						<Form.Label>Product Description:</Form.Label>
						<Form.Control type="text" placeholder="Add Product Description" required value={description} onChange={event => {setDescription(event.target.value)}}/>
					</Form.Group>

					{/*Price*/}
					<Form.Group>
						<Form.Label>Price:</Form.Label>
						<Form.Control type="number" placeholder="Product Price" required value={price} onChange={event => {setPrice(event.target.value)}}/>
					</Form.Group>

					{/*Submit button*/}
					{
						isActive ?
						<Button type="Submit" id="createButton" className="btn-block mb-5 mx-auto">Add Product</Button>	
						:
						<Button type="Submit" id="createButtondis" className="btn-block mb-5 mx-auto" disabled>Add Product</Button>

					}
					
				</Form>
			</Container>
			
		</>
		:
		<Navigate to="/products" replace={true} />
	);
};