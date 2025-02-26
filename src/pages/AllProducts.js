import {Container} from 'react-bootstrap'
import ProductCard from './../components/AdminProductCard';
import UserContext from '../UserContext'
import { useState, useEffect, useContext } from 'react';
import {Navigate} from 'react-router-dom';

export default function Products () {
	const { user } = useContext(UserContext);
	const [productsCollection, setProductCollection] = useState([]);
	 let token = localStorage.getItem('accessToken');
	useEffect(() => {
		fetch('https://immense-fortress-37269.herokuapp.com/products/all', {
			headers:{
				Authorization: `Bearer ${token}`
			}
		}).then(res => res.json()).then(convertedData => {
			setProductCollection(convertedData.map(product => {
				return(
					<ProductCard key={product._id} productProp={product}/>
					)
			}))
		})
	}, [user, token, productsCollection])
	return (
		user.id && user.isAdmin
		?
		<>
			<div className="all-products text-center">
			<h1 className='pt-5 mt-5'> Active and Inactive Products </h1>
			<Container className="product-collection">
					{productsCollection}
			</Container>
			</div>
		</>
		:
		<Navigate to="/products" replace={true} />
		);
}
