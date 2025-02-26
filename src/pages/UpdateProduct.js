import { useState, useEffect } from 'react';
import {Form, Button, Container} from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function UpdateProduct () {
	
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');

	let token = localStorage.getItem('accessToken')

	const [productInfo, setProductInfo] = useState({
		name: null,
		description: null,
		price: null
	});

	const {id} = useParams();
	useEffect(()=>{
		fetch(`https://immense-fortress-37269.herokuapp.com/products/${id}`).then(res => res.json()).then(convertedData =>{	
			setProductInfo({
				name: convertedData.name,
				description: convertedData.description,
				price: convertedData.price
			})
		});
	},[id])


	const updateProduct = async (event) => {
		event.preventDefault()

	const isUpdated = await fetch(`https://immense-fortress-37269.herokuapp.com/products/${id}`, {
			method: 'PUT',
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
				if(typeof data !== "undefined"){
				return true;
			} else {
				
				return false;
			}

		})

		if (isUpdated) {
			await Swal.fire({
				title: "Success",
				icon: "success",
				text: `Updated Successfully! Check all products to see new ${productInfo.name} details`,
				confirmButtonColor: '#fc5467'
			})
			setName("")
			setDescription("")
			setPrice(0)
			window.location.href = "/products/all"
		} else {
				Swal.fire({
					title: "Failed",
					icon: "error",
					text: "Something went wrong!"
				})
			}
		};

		const archiveProduct = (event) => {

			fetch(`https://immense-fortress-37269.herokuapp.com/products/${id}/archive/`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				}
			})
			.then(result => result.json())
			.then(result => {
	
				if(result === true){
					Swal.fire({
						title: "Success",
						icon: "success",
						text: `Product Archived Successfully!`,
						confirmButtonColor: '#fc5467'
					})
					
				} else {
	
					Swal.fire({
						title: "Something went wrong",
						icon: "error",
						text: "Please contact the administrator.",
						confirmButtonColor: '#fc5467'
					})
				}
			})
		};

		const reactivateProduct = (event) => {

			fetch(`https://immense-fortress-37269.herokuapp.com/products/${id}/reactivate/`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				}
			})
			.then(result => result.json())
			.then(result => {
	
				if(result === true){
					Swal.fire({
						title: "Success",
						icon: "success",
						text: `Product Re-activated Successfully!`,
						confirmButtonColor: '#fc5467'
					})
					
				} else {
	
					Swal.fire({
						title: "Something went wrong",
						icon: "error",
						text: "Please contact the administrator.",
						confirmButtonColor: '#fc5467'
					})
				}
			})
		};

		const deleteProduct = (event) => {

			fetch(`https://immense-fortress-37269.herokuapp.com/products/${id}/delete/`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				}
			})
			.then(result => result.json())
			.then(result => {
	
				if(result === true){
					Swal.fire({
						title: "Success",
						icon: "success",
						text: `Product Deleted Forever Successfully!`,
						confirmButtonColor: '#fc5467'
					})
					
				} else {
	
					Swal.fire({
						title: "Something went wrong",
						icon: "error",
						text: "Please contact the administrator.",
						confirmButtonColor: '#fc5467'
					})
				}
			})
		};

	
	return (
		<>

			<Container>
			<h5 className="add-prod text-center mb-4" style={
						{color:"#fc5467",
						marginTop:"100px"}}>Update Product Status</h5>

			<Button type="Submit" id="archiveButton" className="btn-block mx-auto mb-2" onClick={()=> archiveProduct()}>Archive Product</Button>	

			<Button type="Submit" id="activateButton" className="btn-block mx-auto mb-2" onClick={()=> reactivateProduct()}>Re-activate Product</Button>	

			<Button type="Submit" id="deleteButton" className="btn-block mx-auto mb-2" onClick={()=> deleteProduct()}>Delete this Product forever &#128148;</Button>	

			</Container>
			<Container>
				<h5 className="add-prod text-center" style={
						{color:"#fc5467",
						marginTop:"40px"}}>Update Product Details</h5>
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
						paddingBottom: "1px",
						borderRadius: "20px",
						backgroundColor: "#F9F3F3"
					}
				}
						onSubmit={e => updateProduct (e)}>
				
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
												
						<Button type="Submit" id="createButton" className="btn-block mb-5 mx-auto">Update Product</Button>			
					
				</Form>
			</Container>
			
		</>
	);
};